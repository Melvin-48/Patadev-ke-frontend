import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Code2, ArrowRight, ArrowLeft, Check, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { usersService } from '../services/users.service';

const PROJECT_INTERESTS = [
  'Website', 'Mobile App', 'POS System', 'E-commerce', 
  'Business Management System', 'AI Solution', 'API/Backend', 'Other'
];

export default function ClientOnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const [budgetRange, setBudgetRange] = useState('Flexible');
  const [timeline, setTimeline] = useState('Within 1-3 months');

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await usersService.updateClientProfile({
        companyName,
        industry,
        businessDescription,
        // Assuming the backend has fields or we just save what we can. 
        // Based on previous code:
        website: '', 
        location: '',
        phone: '',
      });
      // Move to success step
      setStep(5);
    } catch (err) {
      console.error('Client onboarding error:', err);
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
        {step < 5 && (
          <div className="mb-10 w-full flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-200 -z-10" />
            {[1, 2, 3, 4].map((i) => (
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
                  {i === 1 ? 'Business' : i === 2 ? 'Projects' : i === 3 ? 'Prefs' : 'Review'}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10 flex-1 transition-all duration-300">
          {/* STEP 1: Business Info */}
          {step === 1 && (
            <div className="animate-[fade-up_0.3s_ease-out_both]">
              <h2 className="text-2xl font-extrabold text-[#0F172A] mb-2">Business Information</h2>
              <p className="text-sm text-slate-500 mb-8">Tell us about your company or project.</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Business / Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Kenya Ltd"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Business Type / Industry</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. E-commerce, Healthcare, Retail"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Short Description</label>
                  <textarea
                    rows={4}
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    placeholder="What does your business do? What are your goals?"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Project Interests */}
          {step === 2 && (
            <div className="animate-[fade-up_0.3s_ease-out_both]">
              <h2 className="text-2xl font-extrabold text-[#0F172A] mb-2">Project Interests</h2>
              <p className="text-sm text-slate-500 mb-8">What are you looking to build?</p>
              
              <div className="grid grid-cols-2 gap-3">
                {PROJECT_INTERESTS.map(interest => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={cn(
                        'flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left font-semibold text-sm',
                        isSelected 
                          ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' 
                          : 'border-slate-100 bg-white hover:border-blue-200 text-[#0F172A]'
                      )}
                    >
                      <div className={cn(
                        'w-5 h-5 rounded flex items-center justify-center shrink-0 border',
                        isSelected ? 'bg-[#2563EB] border-[#2563EB] text-white' : 'border-slate-300'
                      )}>
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Preferences */}
          {step === 3 && (
            <div className="animate-[fade-up_0.3s_ease-out_both]">
              <h2 className="text-2xl font-extrabold text-[#0F172A] mb-2">Project Preferences</h2>
              <p className="text-sm text-slate-500 mb-8">Help us match you with the right developers.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Budget Range</label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  >
                    <option value="Flexible">Flexible</option>
                    <option value="Less than 50,000 KES">Less than 50,000 KES</option>
                    <option value="50,000 - 150,000 KES">50,000 - 150,000 KES</option>
                    <option value="150,000 - 500,000 KES">150,000 - 500,000 KES</option>
                    <option value="500,000+ KES">500,000+ KES</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Preferred Timeline</label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  >
                    <option value="ASAP">As soon as possible</option>
                    <option value="Within 1-3 months">Within 1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Review */}
          {step === 4 && (
            <div className="animate-[fade-up_0.3s_ease-out_both]">
              <h2 className="text-2xl font-extrabold text-[#0F172A] mb-2">Review Details</h2>
              <p className="text-sm text-slate-500 mb-8">Ensure your information is correct before finishing.</p>
              
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Business Information</h3>
                  <p className="text-sm font-bold text-[#0F172A]">{companyName || 'Not provided'}</p>
                  <p className="text-xs text-slate-500 mt-1">{industry || 'Industry not specified'}</p>
                  <p className="text-sm text-slate-700 mt-3 whitespace-pre-wrap">{businessDescription || 'No description provided'}</p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Project Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedInterests.length > 0 ? selectedInterests.map(i => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-700">{i}</span>
                    )) : <p className="text-sm text-slate-500">None selected</p>}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Preferences</h3>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500">Budget</p>
                      <p className="text-sm font-bold text-[#0F172A]">{budgetRange}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500">Timeline</p>
                      <p className="text-sm font-bold text-[#0F172A]">{timeline}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Success */}
          {step === 5 && (
            <div className="py-10 flex flex-col items-center justify-center text-center animate-[fade-up_0.5s_ease-out_both]">
              <div className="w-20 h-20 bg-blue-50 text-[#2563EB] rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-extrabold text-[#0F172A] mb-3">You're all set!</h2>
              <p className="text-slate-500 mb-10 max-w-sm">
                Your PataDev Ke account is ready. You can now start posting projects and connecting with developers.
              </p>
              <button
                onClick={() => navigate('/client/dashboard')}
                className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#2563EB] text-white font-bold text-[15px] hover:bg-[#1D4ED8] transition-all shadow-md"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>

        {/* Bottom Navigation (Hidden on Step 5) */}
        {step < 5 && (
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

            {step < 4 ? (
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
                  <><Loader2 size={16} className="animate-spin" /> Saving...</>
                ) : (
                  <><Check size={16} /> Complete Profile</>
                )}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
