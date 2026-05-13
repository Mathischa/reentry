import { useState } from 'react';
import { Bell, CheckCircle } from 'lucide-react';

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
    <section id="contact" className="py-28 px-5 sm:px-8" style={{ borderTop: '1px solid rgba(212,168,67,0.06)' }}>
      <div className="max-w-xl mx-auto text-center">

        <div className="section-label"><Bell size={11} /> Alertes offres</div>
        <h2 className="section-title">Sois prévenu en premier</h2>
        <p className="section-sub mx-auto mb-10">
          Les offres de parrainage changent souvent — parfois du simple au double en quelques jours.
          Je t'alerterai dès qu'un bonus est boosté ou qu'une nouvelle plateforme rejoint la liste.
        </p>

        {!submitted ? (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto mb-4">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ton@email.fr"
                required
                className="flex-1 px-5 py-3.5 text-sm text-[#f5ede0] placeholder-[#4a3f32] focus:outline-none transition-all"
                style={{
                  borderRadius: 8,
                  background: 'rgba(255,240,200,0.04)',
                  border: '1px solid rgba(212,168,67,0.12)',
                }}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(212,168,67,0.3)'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(212,168,67,0.12)'}
              />
              <button
                type="submit"
                className="px-6 py-3.5 text-sm font-semibold text-[#0e0b08] transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
                style={{ borderRadius: 8, background: 'linear-gradient(120deg,#f0b54a,#d4893a)', boxShadow: '0 4px 20px rgba(212,168,67,0.25)' }}
              >
                M'alerter
              </button>
            </form>
            <p className="text-[10px] text-[#4a3f32] tracking-wide">
              Pas de spam · Désabonnement en 1 clic · 0 vente de données
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 py-10">
            <div className="w-14 h-14 flex items-center justify-center" style={{ borderRadius: 14, background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.2)' }}>
              <CheckCircle size={26} style={{ color: '#d4a843' }} />
            </div>
            <p className="font-bold text-[#f5ede0] text-lg" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>C'est noté.</p>
            <p className="text-[#7a6a55] text-sm">Tu recevras une alerte dès qu'une offre change.</p>
          </div>
        )}

      </div>
    </section>
  );
}
