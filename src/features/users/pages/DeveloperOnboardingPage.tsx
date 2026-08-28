import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Code2, ArrowRight, ArrowLeft, Check, Plus, Loader2, DollarSign, Globe, Link2, Trash2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { usersService } from '../services/users.service';

const POPULAR_SKILLS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 
  'TailwindCSS', 'GraphQL', 'Docker', 'AWS', 'Next.js', 
  'Vue.js', 'MongoDB'
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
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('Intermediate');
  
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');
  
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>([]);
  
  const [hourlyRate, setHourlyRate] = useState<number>(2500);
  const [availability, setAvailability] = useState('Full-time');
  const [services, setServices] = useState('');

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const handleAddCustomSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && customSkill.trim()) {
      e.preventDefault();
      if (!selectedSkills.includes(customSkill.trim())) {
        setSelectedSkills(prev => [...prev, customSkill.trim()]);
      }
      setCustomSkill('');
    }
  };

  const addPortfolioProject = () => {
    setPortfolio([...portfolio, { id: Date.now().toString(), name: '', description: '', url: '', repo: '' }]);
  };

  const updatePortfolio = (id: string, field: keyof PortfolioProject, value: string) => {
    setPortfolio(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const removePortfolio = (id: string) => {
    setPortfolio(prev => prev.filter(p => p.id !== id));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await usersService.updateDeveloperProfile({
        headline,
        bio,
        skills: selectedSkills,
        techStack: selectedSkills,
        hourlyRate,
        experienceYears: experience === 'Beginner' ? 1 : experience === 'Intermediate' ? 3 : 5,
        portfolio: portfolio.map(p => ({
          title: p.name,
          description: p.description,
          link: p.url,
          repo: p.repo,
        })),
        availability,
        servicesOffered: services.split(',').map(s => s.trim()).filter(Boolean),
      });
      navigate('/developer/dashboard');
    } catch (err) {
      console.error('Developer onboarding error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <header className="w-full border-b border-slate-200 py-4 px-6 bg-white flex items-center justify-center sm:justify-start shrink-0">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm">
            <Code2 size={16} strokeWidth={2.5} />
          </span>
          <span className="font-extrabold text-base text-[#0F172A] tracking-tight leading-none">
            PataDev<span className="text-[#2563EB]"> Ke</span>
          </span>
        </Link>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-5 py-12 flex flex-col">
        {/* Progress Indicator */}
        <div className="mb-10 w-full flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-200 -z-10" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 bg-[#F8FAFC] px-2">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                  step === i ? 'bg-[#2563EB] text-white ring-4 ring-blue-100' :
                  step > i ? 'bg-[#1D4ED8] text-white' : 'bg-white border-2 border-slate-200 text-slate-400'
                )}
              >
                {step > i ? <Check size={14} strokeWidth={3} /> : i}
              </div>
              <span className="hidden sm:block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {i === 1 ? 'Profile' : i === 2 ? 'Skills' : i === 3 ? 'Portfolio' : i === 4 ? 'Prefs' : 'Review'}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10 flex-1 transition-all duration-300">
          {/* STEP 1: Basic Profile */}
          {step === 1 && (
            <div className="animate-[fade-up_0.3s_ease-out_both]">
              <h2 className="text-2xl font-extrabold text-[#0F172A] mb-2">Basic Profile</h2>
              <p className="text-sm text-slate-500 mb-8">Let businesses know who you are and what you do.</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Professional Title</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Full Stack Developer"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Experience Level</label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  >
                    <option value="Beginner">Beginner (0-2 years)</option>
                    <option value="Intermediate">Intermediate (3-5 years)</option>
                    <option value="Advanced">Advanced (5+ years)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Short Bio</label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Briefly describe your background, expertise, and what you love building..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Skills */}
          {step === 2 && (
            <div className="animate-[fade-up_0.3s_ease-out_both]">
              <h2 className="text-2xl font-extrabold text-[#0F172A] mb-2">Skills & Tech Stack</h2>
              <p className="text-sm text-slate-500 mb-8">Select or add the technologies you excel at.</p>
              
              <div className="mb-6">
                <label className="block text-xs font-bold text-[#0F172A] mb-3">Popular Skills</label>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SKILLS.map(skill => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={cn(
                          'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all',
                          isSelected ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        )}
                      >
                        {isSelected ? <Check size={14} strokeWidth={3} /> : <Plus size={14} />}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Add Custom Skill</label>
                <input
                  type="text"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyDown={handleAddCustomSkill}
                  placeholder="Type skill and press Enter"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
                {selectedSkills.filter(s => !POPULAR_SKILLS.includes(s)).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedSkills.filter(s => !POPULAR_SKILLS.includes(s)).map(skill => (
                      <div key={skill} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-[#2563EB] text-white">
                        {skill}
                        <button onClick={() => toggleSkill(skill)} className="hover:text-blue-200"><Plus size={14} className="rotate-45" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Portfolio */}
          {step === 3 && (
            <div className="animate-[fade-up_0.3s_ease-out_both]">
              <h2 className="text-2xl font-extrabold text-[#0F172A] mb-2">Portfolio</h2>
              <p className="text-sm text-slate-500 mb-8">Showcase projects you're proud of.</p>
              
              <div className="space-y-6 mb-6">
                {portfolio.map((proj, index) => (
                  <div key={proj.id} className="p-5 border border-slate-200 rounded-2xl relative bg-slate-50">
                    <button onClick={() => removePortfolio(proj.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                    <h3 className="text-sm font-bold text-[#0F172A] mb-4">Project {index + 1}</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Project Name</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => updatePortfolio(proj.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#2563EB] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => updatePortfolio(proj.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#2563EB] outline-none resize-none"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Live URL (optional)</label>
                          <div className="relative">
                            <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="url"
                              value={proj.url}
                              onChange={(e) => updatePortfolio(proj.id, 'url', e.target.value)}
                              className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#2563EB] outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Repository URL (optional)</label>
                          <div className="relative">
                            <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="url"
                              value={proj.repo}
                              onChange={(e) => updatePortfolio(proj.id, 'repo', e.target.value)}
                              className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#2563EB] outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addPortfolioProject}
                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-sm font-bold text-slate-500 flex items-center justify-center gap-2 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
              >
                <Plus size={18} />
                Add a Project
              </button>
            </div>
          )}

          {/* STEP 4: Preferences */}
          {step === 4 && (
            <div className="animate-[fade-up_0.3s_ease-out_both]">
              <h2 className="text-2xl font-extrabold text-[#0F172A] mb-2">Work Preferences</h2>
              <p className="text-sm text-slate-500 mb-8">Set expectations for clients.</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Services Offered (comma separated)</label>
                  <input
                    type="text"
                    value={services}
                    onChange={(e) => setServices(e.target.value)}
                    placeholder="e.g. UI/UX Design, Frontend Development, API Integration"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Availability</label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  >
                    <option value="Full-time">Full-time (40+ hrs/wk)</option>
                    <option value="Part-time">Part-time (20-40 hrs/wk)</option>
                    <option value="As needed">As needed (open to discussion)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Expected Hourly Rate (KES)</label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Review */}
          {step === 5 && (
            <div className="animate-[fade-up_0.3s_ease-out_both]">
              <h2 className="text-2xl font-extrabold text-[#0F172A] mb-2">Review Profile</h2>
              <p className="text-sm text-slate-500 mb-8">Make sure everything looks good before submitting.</p>
              
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Profile</h3>
                  <p className="text-sm font-bold text-[#0F172A]">{headline || 'Not provided'}</p>
                  <p className="text-xs text-slate-500 mt-1">{experience} Experience</p>
                  <p className="text-sm text-slate-700 mt-3 whitespace-pre-wrap">{bio || 'No bio provided'}</p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.length > 0 ? selectedSkills.map(s => (
                      <span key={s} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-700">{s}</span>
                    )) : <p className="text-sm text-slate-500">No skills added</p>}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Preferences</h3>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500">Rate</p>
                      <p className="text-sm font-bold text-[#0F172A]">KES {hourlyRate}/hr</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500">Availability</p>
                      <p className="text-sm font-bold text-[#0F172A]">{availability}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={step === 1 || isLoading}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all",
              step === 1 ? "opacity-0 pointer-events-none" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]"
            )}
          >
            <ArrowLeft size={16} /> Back
          </button>

          {step < 5 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-md transition-all"
            >
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-md transition-all"
            >
              {isLoading ? (
                <><Loader2 size={16} className="animate-spin" /> Submitting...</>
              ) : (
                <><Check size={16} /> Complete Profile</>
              )}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
