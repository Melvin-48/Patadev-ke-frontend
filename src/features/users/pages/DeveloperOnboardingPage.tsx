import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, DollarSign, Globe, Link2, Plus, Check, ArrowRight, Loader2 } from 'lucide-react';
import { usersService } from '../services/users.service';

const POPULAR_SKILLS = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'PostgreSQL',
  'TailwindCSS',
  'GraphQL',
  'Docker',
  'AWS',
  'Next.js',
  'Vue.js',
  'MongoDB',
];

export default function DeveloperOnboardingPage() {
  const navigate = useNavigate();

  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['React', 'TypeScript', 'Node.js']);
  const [hourlyRate, setHourlyRate] = useState<number>(2500);
  const [experienceYears, setExperienceYears] = useState<number>(3);
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLink2Url] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill],
    );
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await usersService.updateDeveloperProfile({
        headline,
        bio,
        skills: selectedSkills,
        techStack: selectedSkills,
        hourlyRate,
        experienceYears,
        githubUrl,
        linkedinUrl,
        websiteUrl,
      });
      navigate('/developer/dashboard');
    } catch (err) {
      console.error('Developer onboarding error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/developer/dashboard');
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#FAFCFF] overflow-hidden font-sans"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 20%, rgba(23, 105, 255, 0.06) 0%, transparent 60%),
          radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.04) 0%, transparent 50%)
        `,
      }}
    >
      {/* Background Glow Blobs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(23,105,255,0.07) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[720px] flex flex-col items-center py-6">
        
        {/* Branding Logo: </> PataDev Ke */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group mb-6 transition-transform hover:scale-105"
          aria-label="PataDev Ke Home"
        >
          <span className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200 shadow-xs">
            <Code2 size={20} strokeWidth={2.5} />
          </span>
          <span className="font-semibold text-2xl text-[#07152F] tracking-tight">
            PataDev <span className="text-primary">Ke</span>
          </span>
        </Link>

        {/* Form Card */}
        <div className="w-full bg-white/90 backdrop-blur-xl shadow-2xl shadow-slate-200/60 rounded-3xl p-8 sm:p-10 border border-slate-200/60 transition-all">
          
          {/* Header */}
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
              Developer Profile
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07152F] tracking-tight">
              Showcase your expertise
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] font-medium mt-1.5 leading-relaxed max-w-md mx-auto">
              Build your developer profile and help businesses discover what you can do.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Professional Headline */}
            <div>
              <label htmlFor="headline" className="block text-xs font-bold text-[#07152F] mb-1">
                Professional Headline
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Code2 size={16} />
                </div>
                <input
                  id="headline"
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. Senior Full-Stack Developer | React, Node.js & PostgreSQL"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-[#07152F] placeholder-slate-400 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Rate & Experience Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="hourlyRate" className="block text-xs font-bold text-[#07152F] mb-1">
                  Hourly Rate (KSh)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <DollarSign size={16} />
                  </div>
                  <input
                    id="hourlyRate"
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    placeholder="2500"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-[#07152F] focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="experienceYears" className="block text-xs font-bold text-[#07152F] mb-1">
                  Years of Experience
                </label>
                <input
                  id="experienceYears"
                  type="number"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  placeholder="3"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-[#07152F] focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Bio / About */}
            <div>
              <label htmlFor="bio" className="block text-xs font-bold text-[#07152F] mb-1">
                Bio / Summary
              </label>
              <textarea
                id="bio"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share a brief overview of your technical background, major achievements, and project preferences..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-[#07152F] placeholder-slate-400 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
              />
            </div>

            {/* Skills & Tech Stack Chips */}
            <div>
              <label className="block text-xs font-bold text-[#07152F] mb-2">
                Skills & Tech Stack
              </label>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {POPULAR_SKILLS.map(skill => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                      }`}
                    >
                      {isSelected ? <Check size={12} strokeWidth={3} /> : <Plus size={12} />}
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Skill */}
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyDown={handleAddCustomSkill}
                placeholder="Type custom skill and press Enter..."
                className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-[#07152F] placeholder-slate-400 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>

            {/* Portfolio Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label htmlFor="githubUrl" className="block text-[11px] font-bold text-[#07152F] mb-1">
                  GitHub Profile
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Globe size={15} />
                  </div>
                  <input
                    id="githubUrl"
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-[#07152F] placeholder-slate-400 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="linkedinUrl" className="block text-[11px] font-bold text-[#07152F] mb-1">
                  LinkedIn Profile
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Link2 size={15} />
                  </div>
                  <input
                    id="linkedinUrl"
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLink2Url(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-[#07152F] placeholder-slate-400 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="websiteUrl" className="block text-[11px] font-bold text-[#07152F] mb-1">
                  Portfolio / Website
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Globe size={15} />
                  </div>
                  <input
                    id="websiteUrl"
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://portfolio.dev"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-[#07152F] placeholder-slate-400 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={handleSkip}
                className="w-1/3 py-3 px-4 rounded-full border border-slate-200 font-bold text-slate-600 hover:text-[#07152F] hover:bg-slate-50 transition-all text-xs text-center"
              >
                Skip for now
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="w-2/3 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold text-white shadow-lg shadow-primary/25 bg-[#1769FF] hover:bg-blue-600 transition-all text-xs"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Profile</span>
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}
