import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Mail, MessageSquare, User, Phone, Loader2, AlertCircle } from 'lucide-react';
import { SectionLabel, GradientText } from './Services';

// ─── EmailJS config ────────────────────────────────────────────────────────
// 1. Créer un compte gratuit sur https://www.emailjs.com
// 2. Ajouter un service email (Gmail, Outlook)  → copier le Service ID
// 3. Créer un template avec les variables : {{from_name}}, {{from_email}},
//    {{phone}}, {{project_type}}, {{budget}}, {{message}}
//    Definir l'adresse de destination : mathis.chatillon@edu.ece.fr
// 4. Recuperer la Public Key dans Account > API Keys
// 5. Renseigner les 3 valeurs dans un fichier .env :
//    VITE_EMAILJS_SERVICE=service_xxxxxxx
//    VITE_EMAILJS_TEMPLATE=template_xxxxxxx
//    VITE_EMAILJS_KEY=xxxxxxxxxxxxxxxxxxxxxx
// ───────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE  || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE || 'YOUR_TEMPLATE_ID';
const EMAILJS_KEY      = import.meta.env.VITE_EMAILJS_KEY      || 'YOUR_PUBLIC_KEY';

const BUDGETS = ['< 500', '500 - 1 000', '1 000 - 2 000', '2 000+', 'Je ne sais pas encore'];
const TYPES   = ['Site vitrine Essentiel', 'Site vitrine Pro', 'Projet sur-mesure', 'Refonte de site existant', 'Autre'];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', budget: '', message: '' });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name:    form.name,
          reply_to:     form.email,
          phone:        form.phone   || 'Non renseigne',
          project_type: form.type    || 'Non precise',
          budget:       form.budget  || 'Non precise',
          message:      form.message,
          to_email:     'mathis.chatillon@edu.ece.fr',
        },
        EMAILJS_KEY,
      );
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Contact</SectionLabel>
        <h2 className="section-title">Parlons de votre <GradientText>projet</GradientText></h2>
        <p className="section-sub">Reponse sous 48h garantie. Premier echange gratuit et sans engagement.</p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-14">
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-4">
            {([
              { icon: Mail,          title: 'Email',     val: 'mathis.chatillon@edu.ece.fr', href: 'mailto:mathis.chatillon@edu.ece.fr', color: '#0ea5e9' },
              { icon: Phone,         title: 'Telephone', val: '07 82 52 25 97',              href: 'tel:+33782522597',                   color: '#6366f1' },
              { icon: MessageSquare, title: 'Reponse',   val: 'Sous 48h en semaine',         href: null as string | null,               color: '#a855f7' },
            ] as const).map(item => {
              const Icon = item.icon;
              const card = (
                <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-0.5">{item.title}</p>
                    <p className="text-white text-sm font-medium break-all">{item.val}</p>
                  </div>
                </div>
              );
              return item.href
                ? <a key={item.title} href={item.href}>{card}</a>
                : <div key={item.title}>{card}</div>;
            })}

            <div className="p-5 rounded-2xl border border-sky-500/15 bg-sky-500/[0.04]">
              <p className="text-sky-400 text-sm font-semibold mb-1">Sans engagement</p>
              <p className="text-slate-500 text-xs leading-relaxed">Notre premier echange est totalement gratuit. On analyse votre projet ensemble avant toute decision.</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {status === 'sent' ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04]">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'linear-gradient(135deg, #10b981, #0ea5e9)', boxShadow: '0 8px 32px rgba(16,185,129,0.3)' }}>
                  <Send size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Message envoye !</h3>
                <p className="text-slate-400 text-sm max-w-xs">Votre demande a bien ete transmise. On vous repond dans les 48h. Merci de votre confiance.</p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', type: '', budget: '', message: '' }); }}
                  className="mt-6 text-xs text-slate-500 hover:text-slate-300 underline underline-offset-2 transition-colors">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] space-y-4">
                {status === 'error' && (
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/[0.06] text-red-400 text-sm">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>Erreur lors de l'envoi. Ecrivez-nous directement a <strong>mathis.chatillon@edu.ece.fr</strong>.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field icon={<User size={14} />} label="Nom / Societe *" type="text"
                    value={form.name} onChange={set('name')} required placeholder="Jean Dupont" />
                  <Field icon={<Mail size={14} />} label="Email *" type="email"
                    value={form.email} onChange={set('email')} required placeholder="jean@entreprise.fr" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field icon={<Phone size={14} />} label="Telephone" type="tel"
                    value={form.phone} onChange={set('phone')} placeholder="06 00 00 00 00" />
                  <SelectField label="Type de projet" value={form.type} onChange={set('type')} options={TYPES} />
                </div>

                <SelectField label="Budget envisage" value={form.budget} onChange={set('budget')} options={BUDGETS} />

                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">Message *</label>
                  <textarea
                    value={form.message} onChange={set('message')} required rows={5}
                    placeholder="Decrivez votre projet : activite, objectifs, delai souhaite..."
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-sky-500/40 focus:bg-white/[0.06] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', boxShadow: '0 4px 20px rgba(14,165,233,0.25)' }}>
                  {status === 'sending'
                    ? <><Loader2 size={16} className="animate-spin" /> Envoi en cours...</>
                    : <><Send size={15} /> Envoyer ma demande</>}
                </button>

                <p className="text-center text-slate-700 text-xs">
                  En soumettant ce formulaire, vous acceptez d'etre recontacte par Webyra.
                </p>
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
        <input
          type={type} value={value} onChange={onChange} required={required} placeholder={placeholder}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-sky-500/40 focus:bg-white/[0.06] transition-all"
        />
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[];
}) {
  return (
    <div>
      <label className="block text-xs text-slate-500 mb-1.5">{label}</label>
      <select
        value={value} onChange={onChange}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-sky-500/40 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer">
        <option value="">Selectionner...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
