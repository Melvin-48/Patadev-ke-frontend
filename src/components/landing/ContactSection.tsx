import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contacts" className="relative w-full py-16 lg:py-24">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={cn(
            'flex flex-col items-center text-center gap-3 mb-12 transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <div className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-primary">
            GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07152F] tracking-tight">
            Contact Our Team
          </h2>
          <p className="text-[#64748B] text-base lg:text-lg max-w-2xl">
            Have questions about escrow or need custom developer squad allocation? We are here to help.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Card (5/12) */}
          <div
            className={cn(
              'lg:col-span-5 p-8 sm:p-10 rounded-3xl text-white shadow-2xl flex flex-col justify-between transition-all duration-700 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
            style={{ background: 'linear-gradient(145deg, #07152F 0%, #1769FF 100%)' }}
          >
            <div>
              <h3 className="text-2xl font-extrabold mb-3">
                Let&apos;s Build Together
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed mb-8">
                Reach out for project consultations, enterprise developer squad allocations, or general inquiries.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200 block">
                      Email Us
                    </span>
                    <span className="text-sm font-semibold">support@patadev.ke</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200 block">
                      Call Us
                    </span>
                    <span className="text-sm font-semibold">+254 (0) 700 000 000</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200 block">
                      Location
                    </span>
                    <span className="text-sm font-semibold">Nairobi Innovation Hub, Kenya</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/15 text-xs text-blue-100">
              Response time: Usually within 2 business hours.
            </div>
          </div>

          {/* Right Form Card (7/12) */}
          <div
            className={cn(
              'lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-2xl transition-all duration-700 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
            style={{ transitionDelay: isVisible ? '150ms' : '0ms' }}
          >
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center gap-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#07152F]">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] max-w-md">
                  Thank you for reaching out. Our team has received your message and will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-100 text-xs font-bold text-[#07152F] hover:bg-slate-200 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#07152F] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Duncan Kingangi"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#07152F] mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="duncan@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#07152F] mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Consultation / Enterprise Inquiry"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#07152F] mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project requirements or questions..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all text-sm w-full sm:w-auto"
                  style={{ background: '#1769FF' }}
                >
                  <span>Send Message</span>
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
