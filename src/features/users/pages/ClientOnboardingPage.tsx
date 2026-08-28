import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, ArrowRight, ArrowLeft, Check, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { usersService } from '../services/users.service';

const PROJECT_TYPES = [
  'Website', 'Mobile App', 'E-commerce Platform', 'POS System', 
  'Business Management System', 'School Management System', 
  'Healthcare System', 'Logistics Platform', 'AI Solution', 
  'Data Platform', 'API / Backend', 'Custom Software', 'Other'
];

const HELP_INTENTS = [
  'I have a clear project specification',
  'I have an idea and need technical guidance',
  'I need a developer to improve an existing system',
  'I need ongoing development support',
  'I need a team to build a complete product'
];

export default function ClientOnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [projectInterests, setProjectInterests] = useState<string[]>([]);
  
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  
  const [helpIntent, setHelpIntent] = useState('');
  
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [complexity, setComplexity] = useState('');

  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const toggleArrayItem = (item: string, state: string[], setter: (v: string[]) => void) => {
    setter(state.includes(item) ? state.filter(i => i !== item) : [...state, item]);
  };

  const isStepValid = () => {
    if (step === 1) return projectInterests.length > 0;
    if (step === 2) return companyName.trim() !== '' && industry.trim() !== '' && description.trim() !== '';
    if (step === 3) return helpIntent !== '';
    if (step === 4) return true; // optional preferences
    return true;
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await usersService.updateClientProfile({
        companyName,
        industry,
        businessDescription: description,
        // The API might not accept project interests/help intents directly yet,
        // but we collect them for standard PataDev project matching structure.
        website: '', 
        location: '',
        phone: '',
      });
      setStep(5);
    } catch (err) {
      console.error('Client onboarding error:', err);
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
        {step < 5 && (
          <div className="text-sm font-bold text-slate-400">
            Step {step} of 4
          </div>
        )}
      </header>

      {/* Progress Bar (Subtle) */}
      {step < 5 && (
        <div className="w-full h-1 bg-slate-100">
          <div 
            className="h-full bg-[#2563EB] transition-all duration-300 ease-out" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      )}

      <main className="flex-1 w-full max-w-3xl mx-auto px-5 py-10 sm:py-16 flex flex-col">
        <div className="flex-1">
          {/* STEP 1: What to build */}
          {step === 1 && (
            <div className="animate-[fade-up_0.4s_ease-out_both]">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">What are you looking to build?</h1>
              <p className="text-slate-500 mb-10 text-lg">Select all that apply to help us match you with the right expertise.</p>
              
              <div className="flex flex-wrap gap-3">
                {PROJECT_TYPES.map(type => {
                  const isSelected = projectInterests.includes(type);
                  return (
                    <button
                      key={type}
                      onClick={() => toggleArrayItem(type, projectInterests, setProjectInterests)}
                      className={cn(
                        'px-5 py-3 rounded-full border-2 text-[15px] font-bold transition-all duration-200 outline-none focus:ring-4 focus:ring-blue-100',
                        isSelected 
                          ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' 
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      )}
                    >
                      {isSelected && <Check size={16} className="inline mr-2 -ml-1" strokeWidth={3} />}
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Business Info */}
          {step === 2 && (
            <div className="animate-[fade-up_0.4s_ease-out_both]">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">Tell us about your business</h1>
              <p className="text-slate-500 mb-10 text-lg">Provide a few details so developers understand your context.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] mb-2">Business / Organization Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Kenya Ltd"
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 text-base font-medium focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] mb-2">Business Type <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Fintech, Healthcare, E-commerce"
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 text-base font-medium focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] mb-2">Short Business Description <span className="text-red-500">*</span></label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What does your business do and what are your main goals?"
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 text-base font-medium focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Help Intent */}
          {step === 3 && (
            <div className="animate-[fade-up_0.4s_ease-out_both]">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">What kind of help do you need?</h1>
              <p className="text-slate-500 mb-10 text-lg">Select the option that best describes your current situation.</p>
              
              <div className="grid gap-4">
                {HELP_INTENTS.map(intent => (
                  <button
                    key={intent}
                    onClick={() => setHelpIntent(intent)}
                    className={cn(
                      'flex items-center text-left p-5 rounded-2xl border-2 transition-all outline-none focus:ring-4 focus:ring-blue-100',
                      helpIntent === intent 
                        ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' 
                        : 'border-slate-200 bg-white hover:border-blue-200 text-[#0F172A] hover:bg-slate-50'
                    )}
                  >
                    <div className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 shrink-0 transition-all',
                      helpIntent === intent ? 'border-[#2563EB] bg-[#2563EB]' : 'border-slate-300'
                    )}>
                      {helpIntent === intent && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="font-bold text-lg">{intent}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Preferences */}
          {step === 4 && (
            <div className="animate-[fade-up_0.4s_ease-out_both]">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">What are your typical project preferences?</h1>
              <p className="text-slate-500 mb-10 text-lg">Optional details to help align expectations.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] mb-2">Budget Range (Optional)</label>
                  <div className="relative">
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 text-base font-medium focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none bg-white"
                    >
                      <option value="" disabled>Select budget range</option>
                      <option value="Flexible">Flexible</option>
                      <option value="Less than 50,000 KES">Less than 50,000 KES</option>
                      <option value="50,000 - 150,000 KES">50,000 - 150,000 KES</option>
                      <option value="150,000 - 500,000 KES">150,000 - 500,000 KES</option>
                      <option value="500,000+ KES">500,000+ KES</option>
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] mb-2">Expected Timeline (Optional)</label>
                  <div className="relative">
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 text-base font-medium focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none bg-white"
                    >
                      <option value="" disabled>Select expected timeline</option>
                      <option value="ASAP">As soon as possible</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="Ongoing / Retainer">Ongoing / Retainer</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0F172A] mb-2">Project Complexity (Optional)</label>
                  <div className="relative">
                    <select
                      value={complexity}
                      onChange={(e) => setComplexity(e.target.value)}
                      className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 text-base font-medium focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none bg-white"
                    >
                      <option value="" disabled>Select complexity</option>
                      <option value="Simple MVP / Prototype">Simple MVP / Prototype</option>
                      <option value="Standard Application">Standard Application</option>
                      <option value="Complex / Enterprise System">Complex / Enterprise System</option>
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Completion */}
          {step === 5 && (
            <div className="py-20 flex flex-col items-center justify-center text-center animate-[fade-up_0.5s_ease-out_both]">
              <div className="w-24 h-24 bg-blue-50 text-[#2563EB] rounded-full flex items-center justify-center mb-8 shadow-inner">
                <CheckCircle2 size={48} strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">Your account is ready.</h2>
              <p className="text-slate-500 text-lg mb-12 max-w-md">
                You're ready to find developers, post projects, and start building your product.
              </p>
              <button
                onClick={() => navigate('/client/dashboard')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-12 py-4 rounded-full bg-[#2563EB] text-white font-bold text-[16px] hover:bg-[#1D4ED8] transition-all shadow-md focus:ring-4 focus:ring-blue-200 outline-none"
              >
                Go to Client Dashboard
              </button>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        {step < 5 && (
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

            {step < 4 ? (
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
                {isLoading ? 'Saving...' : 'Finish Setup'}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
