import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, ArrowRight, ArrowLeft, Check, Search, X, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useAuth } from '../../../contexts/AuthContext';
import { usersService } from '../services/users.service';

const SPECIALIZATIONS = [
  'Full-Stack Development', 'Frontend Development', 'Backend Development', 'Mobile Development',
  'Desktop Development', 'DevOps & Cloud', 'Data Science', 'Artificial Intelligence',
  'Machine Learning', 'Data Engineering', 'Cybersecurity', 'QA & Testing', 'UI Engineering', 'Other'
];

const TECHNOLOGY_CATEGORIES = [
  { name: 'Programming Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Kotlin', 'Swift', 'Dart', 'R', 'SQL', 'Scala', 'Bash'] },
  { name: 'Frontend', items: ['React', 'Next.js', 'Vue', 'Nuxt', 'Angular', 'Svelte', 'SvelteKit', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap'] },
  { name: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'Django', 'Django REST Framework', 'FastAPI', 'Flask', 'Spring Boot', 'Laravel', 'ASP.NET', 'Ruby on Rails', 'Gin', 'Fiber'] },
  { name: 'Mobile', items: ['React Native', 'Flutter', 'Android', 'Jetpack Compose', 'SwiftUI', 'iOS'] },
  { name: 'Databases', items: ['PostgreSQL', 'MySQL', 'Microsoft SQL Server', 'MongoDB', 'Redis', 'SQLite', 'MariaDB', 'Firebase', 'Supabase', 'DynamoDB', 'Cassandra'] },
  { name: 'AI / ML', items: ['TensorFlow', 'PyTorch', 'scikit-learn', 'Keras', 'Hugging Face', 'LangChain', 'OpenAI APIs', 'Computer Vision', 'Natural Language Processing', 'Generative AI', 'RAG', 'LLM Development'] },
  { name: 'Data', items: ['Pandas', 'NumPy', 'Jupyter', 'Apache Spark', 'Airflow', 'Databricks', 'Power BI', 'Tableau'] },
  { name: 'Cloud / DevOps', items: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Jenkins', 'CI/CD', 'Linux', 'Nginx'] },
  { name: 'Testing', items: ['Jest', 'Cypress', 'Playwright', 'Selenium', 'PyTest', 'JUnit'] },
  { name: 'Tools / Collaboration', items: ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'Postman', 'Figma', 'Jira'] }
];

const EXPERIENCES = [
  { level: 'Beginner', desc: 'Building projects and developing your professional experience.' },
  { level: 'Intermediate', desc: 'Comfortable independently building and delivering projects.' },
  { level: 'Advanced', desc: 'Experienced in complex projects and production systems.' },
  { level: 'Expert', desc: 'Highly experienced in designing and delivering complex solutions.' }
];

const SERVICES = [
  'Web Applications', 'Mobile Applications', 'E-commerce Platforms', 'Business Management Systems',
  'POS Systems', 'APIs & Integrations', 'AI Applications', 'Machine Learning Solutions', 'Data Analytics',
  'Cloud Infrastructure', 'DevOps', 'Database Systems', 'Automation', 'UI Implementation', 'Software Testing', 'Cybersecurity'
];

interface PortfolioProject {
  id: string;
  name: string;
  description: string;
  url: string;
  repo: string;
}

export default function DeveloperOnboardingPage() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techSearch, setTechSearch] = useState('');
  const [experience, setExperience] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>([]);
  
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [availability, setAvailability] = useState('Available now');

  const nextStep = () => setStep((s) => Math.min(s + 1, 7));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // Toggle helpers
  const toggleArrayItem = (item: string, state: string[], setter: (v: string[]) => void) => {
    setter(state.includes(item) ? state.filter(i => i !== item) : [...state, item]);
  };

  const filteredCategories = useMemo(() => {
    if (!techSearch.trim()) return TECHNOLOGY_CATEGORIES;
    const lowerSearch = techSearch.toLowerCase();
    return TECHNOLOGY_CATEGORIES.map(cat => ({
      ...cat,
      items: cat.items.filter(item => item.toLowerCase().includes(lowerSearch))
    })).filter(cat => cat.items.length > 0);
  }, [techSearch]);

  const addPortfolioProject = () => {
    setPortfolio([...portfolio, { id: Date.now().toString(), name: '', description: '', url: '', repo: '' }]);
  };

  const updatePortfolio = (id: string, field: keyof PortfolioProject, value: string) => {
    setPortfolio(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const removePortfolio = (id: string) => {
    setPortfolio(prev => prev.filter(p => p.id !== id));
  };

  const isStepValid = () => {
    if (step === 1) return specializations.length > 0;
    if (step === 2) return technologies.length > 0;
    if (step === 3) return experience !== '';
    if (step === 4) return services.length > 0;
    if (step === 5) return true; // Portfolio is optional, but if added they should fill name (validated visually)
    if (step === 6) return title.trim() !== '' && bio.trim() !== '';
    return true;
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await usersService.createDeveloperProfile({
        displayName: title,
        headline: title,
        bio,
        skills: [...specializations, ...services],
        techStack: technologies,
        hourlyRate: 0,
        experienceYears: experience === 'Beginner' ? 1 : experience === 'Intermediate' ? 3 : experience === 'Advanced' ? 5 : 8,
        portfolio: portfolio.filter(p => p.name).map(p => ({
          title: p.name,
          description: p.description,
          link: p.url,
          repo: p.repo,
        })),
        availability,
        servicesOffered: services,
      }).catch(() => {});
      updateUser({
        name: title,
        role: 'DEVELOPER',
        onboarded: true,
      });
      setStep(7);
    } catch (err) {
      console.error('Developer onboarding error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Minimal Header */}
      <header className="w-full border-b border-slate-100 py-4 px-6 flex items-center justify-between bg-white shrink-0 z-10 sticky top-0">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm">
            <Code2 size={16} strokeWidth={2.5} />
          </span>
          <span className="font-extrabold text-base text-[#0F172A] tracking-tight leading-none">
            PataDev<span className="text-[#2563EB]"> Ke</span>
          </span>
        </Link>
        {step < 7 && (
          <div className="text-sm font-bold text-slate-400">
            Step {step} of 6
          </div>
        )}
      </header>

      {/* Progress Bar (Subtle) */}
      {step < 7 && (
        <div className="w-full h-1 bg-slate-100">
          <div 
            className="h-full bg-[#2563EB] transition-all duration-300 ease-out" 
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      )}

      <main className="flex-1 w-full max-w-3xl mx-auto px-5 py-10 sm:py-16 flex flex-col">
        <div className="flex-1">
          {/* STEP 1: Specialization */}
          {step === 1 && (
            <div className="animate-[fade-up_0.4s_ease-out_both]">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">What type of developer are you?</h1>
              <p className="text-slate-500 mb-10 text-lg">Select your primary areas of expertise. You can choose more than one.</p>
              
              <div className="flex flex-wrap gap-3">
                {SPECIALIZATIONS.map(spec => {
                  const isSelected = specializations.includes(spec);
                  return (
                    <button
                      key={spec}
                      onClick={() => toggleArrayItem(spec, specializations, setSpecializations)}
                      className={cn(
                        'px-5 py-3 rounded-full border-2 text-[15px] font-bold transition-all duration-200 outline-none focus:ring-4 focus:ring-blue-100',
                        isSelected 
                          ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' 
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      )}
                    >
                      {spec}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Technologies */}
          {step === 2 && (
            <div className="animate-[fade-up_0.4s_ease-out_both]">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">What technologies do you work with?</h1>
              <p className="text-slate-500 mb-8 text-lg">Select the languages, frameworks, databases, cloud platforms, and tools you use.</p>
              
              {technologies.length > 0 && (
                <div className="mb-8 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Selected ({technologies.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map(tech => (
                      <span key={tech} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-[#0F172A] shadow-sm">
                        {tech}
                        <button onClick={() => toggleArrayItem(tech, technologies, setTechnologies)} className="text-slate-400 hover:text-red-500 transition-colors">
                          <X size={14} strokeWidth={3} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="relative mb-8">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search technologies..."
                  value={techSearch}
                  onChange={e => setTechSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border-2 border-slate-200 text-base font-medium focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <div className="space-y-8 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredCategories.map(cat => (
                  <div key={cat.name}>
                    <h3 className="text-sm font-bold text-slate-800 mb-3">{cat.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map(tech => {
                        const isSelected = technologies.includes(tech);
                        return (
                          <button
                            key={tech}
                            onClick={() => toggleArrayItem(tech, technologies, setTechnologies)}
                            className={cn(
                              'px-4 py-2 rounded-lg border transition-all text-sm font-bold outline-none',
                              isSelected 
                                ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-md' 
                                : 'bg-white border-slate-200 text-slate-600 hover:border-[#2563EB] hover:text-[#2563EB]'
                            )}
                          >
                            {isSelected && <Check size={14} className="inline mr-1.5 -ml-1" strokeWidth={3} />}
                            {tech}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Experience */}
          {step === 3 && (
            <div className="animate-[fade-up_0.4s_ease-out_both]">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">How experienced are you?</h1>
              <p className="text-slate-500 mb-10 text-lg">This helps us match you with projects that fit your skill level.</p>
              
              <div className="grid gap-4">
                {EXPERIENCES.map(exp => (
                  <button
                    key={exp.level}
                    onClick={() => setExperience(exp.level)}
                    className={cn(
                      'flex flex-col text-left p-5 rounded-2xl border-2 transition-all outline-none focus:ring-4 focus:ring-blue-100',
                      experience === exp.level 
                        ? 'border-[#2563EB] bg-blue-50 shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50'
                    )}
                  >
                    <span className={cn("font-bold text-lg mb-1", experience === exp.level ? 'text-[#2563EB]' : 'text-[#0F172A]')}>
                      {exp.level}
                    </span>
                    <span className="text-slate-500 text-sm">{exp.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Services */}
          {step === 4 && (
            <div className="animate-[fade-up_0.4s_ease-out_both]">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">What can you help businesses build?</h1>
              <p className="text-slate-500 mb-10 text-lg">Select the services and solutions you offer to clients.</p>
              
              <div className="flex flex-wrap gap-3">
                {SERVICES.map(srv => {
                  const isSelected = services.includes(srv);
                  return (
                    <button
                      key={srv}
                      onClick={() => toggleArrayItem(srv, services, setServices)}
                      className={cn(
                        'px-5 py-3 rounded-full border-2 text-[15px] font-bold transition-all outline-none focus:ring-4 focus:ring-blue-100',
                        isSelected 
                          ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' 
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      )}
                    >
                      {isSelected && <Check size={16} className="inline mr-2 -ml-1" strokeWidth={3} />}
                      {srv}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Portfolio */}
          {step === 5 && (
            <div className="animate-[fade-up_0.4s_ease-out_both]">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">Showcase your work</h1>
              <p className="text-slate-500 mb-10 text-lg">Add projects that demonstrate your skills and help businesses understand what you can build.</p>
              
              <div className="space-y-6 mb-8">
                {portfolio.map((proj, index) => (
                  <div key={proj.id} className="p-6 border-2 border-slate-200 rounded-2xl relative bg-white shadow-sm">
                    <button onClick={() => removePortfolio(proj.id)} className="absolute top-5 right-5 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                    <h3 className="text-sm font-bold text-slate-800 mb-5">Project {index + 1}</h3>
                    
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Project Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => updatePortfolio(proj.id, 'name', e.target.value)}
                          placeholder="e.g. E-commerce Dashboard"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Description</label>
                        <textarea
                          rows={3}
                          value={proj.description}
                          onChange={(e) => updatePortfolio(proj.id, 'description', e.target.value)}
                          placeholder="What did you build and what problems did it solve?"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none placeholder:text-slate-400"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Live URL</label>
                          <input
                            type="url"
                            value={proj.url}
                            onChange={(e) => updatePortfolio(proj.id, 'url', e.target.value)}
                            placeholder="https://..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Repository URL</label>
                          <input
                            type="url"
                            value={proj.repo}
                            onChange={(e) => updatePortfolio(proj.id, 'repo', e.target.value)}
                            placeholder="https://github.com/..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addPortfolioProject}
                className="w-full py-5 border-2 border-dashed border-slate-300 rounded-2xl text-base font-bold text-slate-500 flex items-center justify-center gap-2 hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50 transition-all outline-none focus:ring-4 focus:ring-blue-100"
              >
                <Plus size={20} />
                Add a Project
              </button>
            </div>
          )}

          {/* STEP 6: Profile Info */}
          {step === 6 && (
            <div className="animate-[fade-up_0.4s_ease-out_both]">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">Developer Profile</h1>
              <p className="text-slate-500 mb-10 text-lg">Finalize your profile details for clients to see.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] mb-2">Professional Title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Full Stack Software Engineer"
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 text-base font-medium focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] mb-2">Short Bio <span className="text-red-500">*</span></label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="e.g. I build scalable web applications and APIs for growing businesses..."
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 text-base font-medium focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] mb-2">Availability</label>
                  <div className="relative">
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 text-base font-medium focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none bg-white"
                    >
                      <option value="Available now">Available now</option>
                      <option value="Available this week">Available this week</option>
                      <option value="Limited availability">Limited availability</option>
                      <option value="Not currently available">Not currently available</option>
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Completion */}
          {step === 7 && (
            <div className="py-20 flex flex-col items-center justify-center text-center animate-[fade-up_0.5s_ease-out_both]">
              <div className="w-24 h-24 bg-blue-50 text-[#2563EB] rounded-full flex items-center justify-center mb-8 shadow-inner">
                <CheckCircle2 size={48} strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">Your developer profile is ready.</h2>
              <p className="text-slate-500 text-lg mb-12 max-w-md">
                You're ready to discover projects that match your skills and start building with businesses.
              </p>
              <button
                onClick={() => navigate('/developer/dashboard')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-12 py-4 rounded-full bg-[#2563EB] text-white font-bold text-[16px] hover:bg-[#1D4ED8] transition-all shadow-md focus:ring-4 focus:ring-blue-200 outline-none"
              >
                Go to Developer Dashboard
              </button>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        {step < 7 && (
          <div className="mt-10 flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              onClick={prevStep}
              className={cn(
                "flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-[15px] transition-all outline-none focus:ring-4 focus:ring-slate-200",
                step === 1 ? "opacity-0 pointer-events-none" : "bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
              )}
            >
              <ArrowLeft size={18} strokeWidth={2.5} /> Back
            </button>

            {step < 6 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-[15px] transition-all outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-md hover:shadow-lg"
              >
                Continue <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid() || isLoading}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-[15px] transition-all outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-md hover:shadow-lg"
              >
                {isLoading ? 'Saving...' : 'Complete Profile'}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
