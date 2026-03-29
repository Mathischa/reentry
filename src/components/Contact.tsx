import { useState } from 'react';
import { Send, Mail, MessageSquare, User, Phone } from 'lucide-react';
import { SectionLabel, GradientText } from './Services';

const BUDGETS = ['< 500€', '500 – 1 000€', '1 000 – 2 000€', '2 000€+', 'Je ne sais pas encore'];
const TYPES = ['Site vitrine Essentiel', 'Site vitrine Pro', 'Projet sur-mesure', 'Refonte de site existant', 'Autre'];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', budget: '', message: '' });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Contact</SectionLabel>
        <h2 className="section-title">Parlons de votre <GradientText>projet</GradientText></h2>
        <p className="section-sub">Réponse sous 48h garantie. Premier échange gratuit et sans engagement.</p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-14">
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, title: 'Email', val: 'mathis.chatillon@edu.ece.fr', color: '#0ea5e9' },
              { icon: Phone, title: 'Téléphone', val: '07 82 52 25 97', color: '#6366f1' },
              { icon: MessageSquare, title: 'Réponse', val: 'Sous 48h en semaine', color: '#a855f7' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-0.5">{item.title}</p>
                    <p className="text-white text-sm font-medium">{item.val}</p>
                  </div>
                </div>
              );
            })}

            {/* Trust badge */}
            <div className="p-5 rounded-2xl border border-sky-500/15 bg-sky-500/[0.04] mt-2">
              <p className="text-sky-400 text-sm font-semibold mb-1">Sans engagement</p>
              <p className="text-slate-500 text-xs leading-relaxed">Notre premier échange est totalement gratuit. On analyse votre projet ensemble avant toute décision.</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04]">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'linear-gradient(135deg, #10b981, #0ea5e9)' }}>
                  <Send size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Message envoyé !</h3>
                <p className="text-slate-400 text-sm">On reviendra vers vous dans les 48h. Merci de votre confiance.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field icon={<User size={15} />} label="Nom / Société" type="text" value={form.name} onChange={set('name')} required placeholder="Jean Dupont" />
                  <Field icon={<Mail size={15} />} label="Email" type="email" value={form.email} onChange={set('email')} required placeholder="jean@société.fr" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectField label="Type de projet" value={form.type} onChange={set('type')} options={TYPES} />
                  <SelectField label="Budget envisagé" value={form.budget} onChange={set('budget')} options={BUDGETS} />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Message</label>
                  <textarea
                    value={form.message} onChange={set('message')} required rows={4}
                    placeholder="Décrivez votre projet en quelques lignes..."
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all"
                  />
                </div>
                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.01] active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', boxShadow: '0 4px 20px rgba(14,165,233,0.25)' }}>
                  Envoyer mon projet <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ icon, label, type, value, onChange, required, placeholder }: {
  icon: React.ReactNode; label: string; type: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-slate-500 mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">{icon}</span>
        <input type={type} value={value} onChange={onChange} required={required} placeholder={placeholder}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all" />
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[];
}) {
  return (
    <div>
      <label className="block text-xs text-slate-500 mb-1.5">{label}</label>
      <select value={value} onChange={onChange}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all appearance-none">
        <option value="">Sélectionner...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
