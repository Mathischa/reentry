import { ExternalLink } from 'lucide-react';
import { SectionLabel, GradientText } from './Services';

const PROJECTS = [
  { title: 'LuxHabitat', cat: 'Site Vitrine', tags: ['React', 'Figma', 'SEO'], color1: '#0ea5e9', color2: '#6366f1', desc: 'Agence immobilière de prestige' },
  { title: 'FoodLoop', cat: 'E-commerce', tags: ['Shopify', 'UX', 'Analytics'], color1: '#10b981', color2: '#0ea5e9', desc: 'Épicerie fine en ligne' },
  { title: 'FlowDesk', cat: 'Application Web', tags: ['React', 'Node.js', 'PostgreSQL'], color1: '#6366f1', color2: '#a855f7', desc: 'SaaS de gestion de tickets' },
  { title: 'BeautyLab', cat: 'E-commerce', tags: ['WooCommerce', 'PHP', 'SEO'], color1: '#f43f5e', color2: '#f97316', desc: 'Cosmétiques naturels' },
  { title: 'MétéoPro', cat: 'Application Web', tags: ['Next.js', 'API', 'Maps'], color1: '#f59e0b', color2: '#10b981', desc: 'Outil météo pour professionnels' },
  { title: 'Studio Nord', cat: 'Site Vitrine', tags: ['Figma', 'GSAP', 'SEO'], color1: '#a855f7', color2: '#f43f5e', desc: 'Studio de design graphique' },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Portfolio</SectionLabel>
        <h2 className="section-title">Nos <GradientText>réalisations</GradientText></h2>
        <p className="section-sub">Des projets livrés avec soin, pour des clients de tous secteurs.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {PROJECTS.map(p => (
            <div key={p.title} className="group relative rounded-2xl overflow-hidden border border-white/[0.06] cursor-pointer hover:border-white/[0.12] transition-all duration-300 hover:scale-[1.02]">
              {/* Preview */}
              <div className="h-44 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${p.color1}15, ${p.color2}10)` }}>
                {/* Fake UI elements */}
                <div className="absolute inset-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-1.5 p-3 border-b border-white/[0.04]">
                    {['#f43f5e', '#f59e0b', '#10b981'].map(c => <div key={c} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />)}
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="h-2 rounded-full w-3/4" style={{ background: `${p.color1}40` }} />
                    <div className="h-2 rounded-full w-1/2" style={{ background: `${p.color2}30` }} />
                    <div className="h-2 rounded-full w-2/3" style={{ background: `${p.color1}20` }} />
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: `linear-gradient(135deg, ${p.color1}cc, ${p.color2}bb)` }}>
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <ExternalLink size={16} /> Voir le projet
                  </div>
                </div>
              </div>
              {/* Info */}
              <div className="p-4 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-white font-bold">{p.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${p.color1}20`, color: p.color1 }}>{p.cat}</span>
                </div>
                <p className="text-slate-600 text-xs mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-600 border border-white/[0.05]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
