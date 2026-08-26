import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Building2, Globe, Link as LinkIcon, MapPin, Phone, ArrowRight, Loader2 } from 'lucide-react';
import { usersService } from '../services/users.service';

export default function ClientOnboardingPage() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('Nairobi, Kenya');
  const [phone, setPhone] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Calculate profile completion percentage based on filled fields
  const fields = [companyName, industry, website, location, phone, businessDescription];
  const filledFieldsCount = fields.filter(f => f.trim().length > 0).length;
  const completionPercentage = Math.round((filledFieldsCount / fields.length) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await usersService.updateClientProfile({
        companyName,
        industry,
        website,
        location,
        phone,
        businessDescription,
      });
      navigate('/client/dashboard');
    } catch (err) {
      console.error('Client onboarding error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/client/dashboard');
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
      {/* Background Blobs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(23,105,255,0.07) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[640px] flex flex-col items-center py-6">
        
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

        {/* Form Container */}
        <div className="w-full bg-white/90 backdrop-blur-xl shadow-2xl shadow-slate-200/60 rounded-3xl p-8 sm:p-10 border border-slate-200/60 transition-all">
          
          {/* Header & Step Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                Step 1 of 1
              </span>
              
              {/* Profile Completion Indicator */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
                <span>Profile completion</span>
                <span className="font-bold text-[#07152F]">{completionPercentage}%</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${Math.max(15, completionPercentage)}%` }}
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07152F] tracking-tight text-center">
              Tell us about your business
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] font-medium mt-1.5 text-center leading-relaxed max-w-md mx-auto">
              Complete your profile so developers can better understand who they&apos;re working with.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Grid 2-col for Company & Industry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="companyName" className="block text-xs font-bold text-[#07152F] mb-1">
                  Business / Company Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building2 size={16} />
                  </div>
                  <input
                    id="companyName"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Kenya Ltd"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-[#07152F] placeholder-slate-400 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="industry" className="block text-xs font-bold text-[#07152F] mb-1">
                  Industry
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Globe size={16} />
                  </div>
                  <input
                    id="industry"
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Fintech / E-commerce"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-[#07152F] placeholder-slate-400 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Website & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="website" className="block text-xs font-bold text-[#07152F] mb-1">
                  Company Website
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <LinkIcon size={16} />
                  </div>
                  <input
                    id="website"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://company.ke"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-[#07152F] placeholder-slate-400 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-xs font-bold text-[#07152F] mb-1">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MapPin size={16} />
                  </div>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Nairobi, Kenya"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-[#07152F] placeholder-slate-400 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-[#07152F] mb-1">
                Contact Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone size={16} />
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+254 700 000000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-[#07152F] placeholder-slate-400 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Business Description */}
            <div>
              <label htmlFor="businessDescription" className="block text-xs font-bold text-[#07152F] mb-1">
                Business Description
              </label>
              <textarea
                id="businessDescription"
                rows={3}
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                placeholder="Briefly describe what your business does and the software projects you plan to build..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm font-medium text-[#07152F] placeholder-slate-400 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
              />
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
