import { Mail, Phone, MessageSquare } from 'lucide-react';
import { SectionLabel, GradientText } from './Services';

export function Contact() {
  return (
    <section id="contact" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <SectionLabel>Contact</SectionLabel>
        <h2 className="section-title">Parlons de votre <GradientText>projet</GradientText></h2>
        <p className="section-sub mx-auto">
          Une question, une idée, un projet ? Contactez-nous directement — réponse garantie sous 48h.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-14">
          <a href="mailto:mathis.chatillon@edu.ece.fr"
            className="flex items-center gap-4 px-7 py-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-sky-500/30 hover:bg-sky-500/[0.04] transition-all group w-full sm:w-auto">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)' }}>
              <Mail size={20} className="text-sky-400" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-600 mb-0.5">Email</p>
              <p className="text-white text-sm font-semibold group-hover:text-sky-400 transition-colors">
                mathis.chatillon@edu.ece.fr
              </p>
            </div>
          </a>

          <a href="tel:+33782522597"
            className="flex items-center gap-4 px-7 py-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-indigo-500/30 hover:bg-indigo-500/[0.04] transition-all group w-full sm:w-auto">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <Phone size={20} className="text-indigo-400" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-600 mb-0.5">Téléphone</p>
              <p className="text-white text-sm font-semibold group-hover:text-indigo-400 transition-colors">
                07 82 52 25 97
              </p>
            </div>
          </a>

          <div className="flex items-center gap-4 px-7 py-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] w-full sm:w-auto">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}>
              <MessageSquare size={20} className="text-purple-400" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-600 mb-0.5">Réponse</p>
              <p className="text-white text-sm font-semibold">Sous 48h en semaine</p>
            </div>
          </div>
        </div>

        <div className="mt-10 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-sky-500/15 bg-sky-500/[0.04] text-sky-400 text-xs font-medium">
          Premier échange gratuit et sans engagement
        </div>
      </div>
    </section>
  );
}
