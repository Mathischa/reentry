import { PLATFORMS } from '../data/platforms';
import { Check, Smartphone, Monitor, ExternalLink, AlertCircle } from 'lucide-react';

export function Pricing() {
  return (
    <section id="comparatif" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border border-violet-500/30 bg-violet-500/10 text-violet-400">
            📊 Comparatif complet
          </div>
          <h2 className="section-title">Tableau comparatif des parrainages</h2>
          <p className="section-sub mx-auto">Toutes les offres côte à côte pour choisir les plus rentables selon ta situation.</p>
          <div className="inline-flex items-center gap-2 mt-4 px-3 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-400/80 text-xs">
            <AlertCircle size={12} />
            Données vérifiées sur les sites officiels · Avril 2026 · Les montants peuvent changer à tout moment
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto rounded-3xl border border-white/[0.06]">
          <table className="w-full">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Plateforme</th>
                <th className="text-center px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Catégorie</th>
                <th className="text-center px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tu reçois</th>
                <th className="text-center px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Parrain reçoit</th>
                <th className="text-center px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total cumulable</th>
                <th className="text-center px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Dépôt min.</th>
                <th className="text-center px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Accès</th>
                <th className="text-center px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tuto</th>
              </tr>
            </thead>
            <tbody>
              {PLATFORMS.map((p, i) => (
                <tr
                  key={p.id}
                  className="transition-colors hover:bg-white/[0.02]"
                  style={{ borderBottom: i < PLATFORMS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                        style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
                        {p.emoji}
                      </div>
                      <span className="font-semibold text-white text-sm">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{ background: p.category === 'bank' ? '#0ea5e915' : '#f59e0b15',
                               color: p.category === 'bank' ? '#38bdf8' : '#fbbf24' }}>
                      {p.category === 'bank' ? '🏦 Banque' : '🎯 Paris'}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="font-black text-base" style={{ color: p.color }}>{p.bonusFilleul}</span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="font-semibold text-slate-300 text-sm">{p.bonusParrain}</span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="font-black text-base text-emerald-400">{p.bonusTotal}</span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    {p.minDeposit === 'Aucun dépôt minimum' || p.minDeposit === 'Aucun dépôt minimum obligatoire'
                      ? <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-medium"><Check size={12} /> Aucun</span>
                      : <span className="text-slate-400 text-xs">{p.minDeposit}</span>}
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                      {p.badge === 'App uniquement' ? <Smartphone size={11} /> : <Monitor size={11} />}
                      {p.badge}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <a href={`#tuto-${p.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all hover:opacity-90"
                        style={{ background: p.gradient, color: 'white' }}>
                        Tuto →
                      </a>
                      <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-[10px] text-slate-600 hover:text-slate-400 transition-colors">
                        <ExternalLink size={9} /> Source officielle
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {PLATFORMS.map(p => (
            <div key={p.id} className="rounded-2xl border p-5" style={{ borderColor: `${p.color}20`, background: `${p.color}05` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
                  {p.emoji}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.category === 'bank' ? '🏦 Banque' : '🎯 Paris'}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 rounded-xl" style={{ background: `${p.color}10` }}>
                  <p className="text-[9px] text-slate-500 mb-0.5">Tu reçois</p>
                  <p className="font-black text-sm" style={{ color: p.color }}>{p.bonusFilleul}</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-white/[0.03]">
                  <p className="text-[9px] text-slate-500 mb-0.5">Parrain</p>
                  <p className="font-bold text-xs text-slate-300">{p.bonusParrain}</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-emerald-500/10">
                  <p className="text-[9px] text-slate-500 mb-0.5">Total</p>
                  <p className="font-black text-sm text-emerald-400">{p.bonusTotal}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  {p.badge === 'App uniquement' ? <Smartphone size={10} /> : <Monitor size={10} />}
                  {p.badge}
                </span>
                <a href={`#tuto-${p.id}`}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl"
                  style={{ background: p.gradient, color: 'white' }}>
                  Tutoriel →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Summary highlight */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <SummaryCard
            emoji="🏆"
            title="Meilleur bonus total"
            value="Winamax"
            sub="20€ parrainage + 350€ bienvenue cumulables"
            color="#d97706"
          />
          <SummaryCard
            emoji="💚"
            title="Meilleure banque active"
            value="Fortuneo"
            sub="80€ à 160€ selon la carte choisie"
            color="#00c07f"
          />
          <SummaryCard
            emoji="⚡"
            title="Le plus rapide"
            value="Revolut"
            sub="5 min, 100% app, bonus immédiat"
            color="#7c3aed"
          />
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ emoji, title, value, sub, color }: { emoji: string; title: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-2xl p-5 border text-center" style={{ borderColor: `${color}25`, background: `${color}08` }}>
      <div className="text-3xl mb-2">{emoji}</div>
      <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">{title}</p>
      <p className="font-black text-lg text-white mb-1">{value}</p>
      <p className="text-xs" style={{ color }}>{sub}</p>
    </div>
  );
}
