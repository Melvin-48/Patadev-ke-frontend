import { Star, Quote } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const TESTIMONIALS = [
  {
    name: 'David Mwangi',
    role: 'Founder, RetailPay Kenya',
    initials: 'DM',
    color: 'bg-primary/10 text-primary',
    text: 'PataDev helped us find a talented full-stack engineer who built our POS integration in 6 weeks. The milestone payment system gave us complete peace of mind.',
    rating: 5,
  },
  {
    name: 'Amina Omondi',
    role: 'Senior React & Node Developer',
    initials: 'AO',
    color: 'bg-emerald-100 text-emerald-700',
    text: 'As a developer in Nairobi, finding quality business clients used to be tough. PataDev connected me directly with companies that value good software.',
    rating: 5,
  },
  {
    name: 'Brian Kipchumba',
    role: 'CTO, AgriTech Solutions',
    initials: 'BK',
    color: 'bg-violet-100 text-violet-700',
    text: 'We posted our mobile app brief and had three solid proposals within 24 hours. The direct messaging and milestone tracking made execution seamless.',
    rating: 5,
  },
];

export default function TrustIndicator() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div
          className="text-center mb-14 transition-all duration-500"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Social Proof</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07152F] tracking-tight">
            What people are saying
          </h2>
          <p className="text-slate-500 mt-3 max-w-md mx-auto text-sm">
            Trusted by founders, business owners, and developers across Kenya.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 flex flex-col justify-between"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, index) => (
                    <Star key={index} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <Quote size={20} className="text-primary/20 mb-2" />
                <p className="text-sm text-slate-600 leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`w-10 h-10 rounded-xl ${t.color} font-extrabold text-xs flex items-center justify-center flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <h3 className="font-bold text-[#07152F] text-sm leading-tight">{t.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
