import { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/utils';

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
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
        
        {/* Left-aligned Section Header (Matching Reference Design) */}
        <div
          className={cn(
            'flex flex-col items-start text-left mb-12 transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
            Contact us
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#07152F] tracking-tight mb-3">
            Get in Touch with Our Team
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg max-w-3xl leading-relaxed">
            We&apos;re here to answer your questions, discuss your project, and help you find the best solutions for your software needs. Reach out to us, and let&apos;s start building something great together.
          </p>
        </div>

        {/* 2-Column Grid (Left Form Card 7/12, Right Direct Contact & Map 5/12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Form Card (7/12) */}
          <div
            className={cn(
              'lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-xl transition-all duration-700 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
          >
            <h3 className="text-2xl font-extrabold text-[#07152F] mb-6">
              Let&apos;s Talk About Your Project
            </h3>

            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center gap-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-2xl font-bold text-[#07152F]">
                  Message Sent Successfully!
                </h4>
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
                <div>
                  <label className="block text-xs font-bold text-[#07152F] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs sm:text-sm text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#07152F] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="We'll get back to you here"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs sm:text-sm text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#07152F] mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Let us know who you represent"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs sm:text-sm text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#07152F] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs sm:text-sm text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#07152F] mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project requirements..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs sm:text-sm text-[#07152F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white transition-all resize-none"
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

          {/* Right Direct Approach Info & Map Visual (5/12) */}
          <div
            className={cn(
              'lg:col-span-5 flex flex-col justify-between h-full transition-all duration-700 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            )}
            style={{ transitionDelay: isVisible ? '120ms' : '0ms' }}
          >
            <div>
              <h3 className="text-2xl font-extrabold text-[#07152F] mb-6">
                Prefer a Direct Approach?
              </h3>

              <div className="space-y-5 mb-8">
                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <span className="text-sm font-bold text-[#07152F]">
                    +254 (0) 700 000 000
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <span className="text-sm font-bold text-[#07152F]">
                    contact@patadev.ke
                  </span>
                </div>

                {/* Working Hours */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <span className="text-sm font-bold text-[#07152F]">
                    Monday to Friday, 9 AM – 6 PM (EAT)
                  </span>
                </div>
              </div>
            </div>

            {/* Location Map Visual Card */}
            <div className="rounded-3xl border border-white bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden h-64 relative flex flex-col justify-end p-6 group">
              {/* Decorative Subtle Map Mesh Background */}
              <div
                className="absolute inset-0 opacity-40 mix-blend-multiply bg-cover bg-center"
                style={{
                  backgroundImage: `radial-gradient(#1769FF 0.75px, transparent 0.75px)`,
                  backgroundSize: '16px 16px',
                }}
              />

              <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    HQ Location
                  </div>
                  <div className="text-sm font-extrabold text-[#07152F]">
                    Nairobi Tech Innovation Hub, Kenya
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
