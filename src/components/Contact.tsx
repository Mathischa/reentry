import { useState } from 'react';
import { Bell, CheckCircle, TrendingUp, Zap } from 'lucide-react';

export function Contact() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section id="newsletter" className="py-24 px-5 sm:px-8" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <Bell size={12} /> Alertes bonus
        </div>

        <h2 className="section-title mb-4">Sois le premier informé des nouvelles offres</h2>
        <p className="section-sub mx-auto mb-10">
          Les montants de parrainage changent souvent. Inscris-toi pour recevoir une alerte dès qu'une offre est boostée ou qu'un nouveau parrainage est disponible.
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: <Bell size={16} />, title: 'Alertes immédiates', desc: 'Dès qu\'une offre change ou est boostée', color: '#10b981' },
            { icon: <TrendingUp size={16} />, title: 'Offres exclusives', desc: 'Bonus boostés réservés aux inscrits', color: '#0ea5e9' },
            { icon: <Zap size={16} />, title: 'Tutos mis à jour', desc: 'Guides actualisés en temps réel', color: '#6366f1' },
          ].map((b, i) => (
            <div key={i} className="rounded-2xl p-4 border border-white/[0.06] bg-white/[0.02]">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${b.color}15`, color: b.color }}>
                {b.icon}
              </div>
              <p className="text-white font-semibold text-sm mb-1">{b.title}</p>
              <p className="text-slate-500 text-xs">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ton@email.fr"
              required
              className="flex-1 px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.06] transition-all text-sm"
            />
            <button
              type="submit"
              className="px-6 py-4 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg,#10b981,#0ea5e9)', boxShadow: '0 8px 24px rgba(16,185,129,0.25)' }}
            >
              M'alerter →
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-3 py-8">
            <CheckCircle size={40} className="text-emerald-400" />
            <p className="text-white font-bold text-lg">C'est noté !</p>
            <p className="text-slate-400 text-sm">Tu recevras une alerte dès qu'une offre intéressante arrive.</p>
          </div>
        )}

        <p className="text-slate-600 text-xs mt-4">
          Pas de spam. Désabonnement en 1 clic. 0 vente de données.
        </p>
      </div>
    </section>
  );
}
