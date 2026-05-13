import { PLATFORMS } from '../data/platforms';
import { ExternalLink, TrendingUp, Zap, Shield } from 'lucide-react';
import { PlatformLogo } from './PlatformLogo';

export function Pricing() {
  return (
    <section id="comparatif" className="py-28 px-5 sm:px-8" style={{ borderTop: '1px solid rgba(212,168,67,0.06)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label">📊 Comparatif</div>
          <h2 className="section-title">Toutes les offres côte à côte</h2>
          <p className="section-sub mx-auto">Choisissez les plus rentables selon votre situation — données vérifiées Avril 2026.</p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden" style={{ borderRadius: 14, border: '1px solid rgba(212,168,67,0.1)', background: 'rgba(255,240,200,0.018)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(212,168,67,0.1)' }}>
                {['Plateforme', 'Tu reçois', 'Parrain', 'Total', 'Dépôt min.', ''].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#4a3f32', background: 'rgba(212,168,67,0.04)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLATFORMS.map((p, i) => (
                <tr
                  key={p.id}
                  className="group transition-colors"
                  style={{
                    borderBottom: i < PLATFORMS.length - 1 ? '1px solid rgba(212,168,67,0.06)' : 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(212,168,67,0.03)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  {/* Plateforme */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <PlatformLogo id={p.id} logo={p.logo} emoji={p.emoji} name={p.name} color={p.color} size={34} className="flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#f5ede0] text-sm">{p.name}</span>
                          {p.recommended && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5" style={{ borderRadius: 4, background: 'rgba(212,168,67,0.12)', color: '#d4a843', border: '1px solid rgba(212,168,67,0.2)' }}>
                              ★ Top
                            </span>
                          )}
                        </div>
                        {p.reliability && (
                          <span className="text-[10px]" style={{ color: p.reliability === 'élevée' ? '#5a9a6a' : '#9a7a4a' }}>
                            {p.reliability === 'élevée' ? '● Fiable' : '● Moyenne'}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Tu reçois */}
                  <td className="px-6 py-5">
                    <span className="font-black text-base" style={{ color: p.color }}>{p.bonusFilleul}</span>
                  </td>

                  {/* Parrain */}
                  <td className="px-6 py-5">
                    <span className="font-semibold text-sm text-[#7a6a55]">{p.bonusParrain}</span>
                  </td>

                  {/* Total */}
                  <td className="px-6 py-5">
                    <span className="font-black text-base" style={{ color: '#d4a843' }}>{p.bonusTotal}</span>
                  </td>

                  {/* Dépôt min */}
                  <td className="px-6 py-5">
                    <span className="text-xs text-[#5a4d3e]">{p.minDeposit}</span>
                  </td>

                  {/* Source */}
                  <td className="px-6 py-5 text-right">
                    <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-medium text-[#4a3f32] hover:text-[#d4a843] transition-colors">
                      <ExternalLink size={10} /> Officielle
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {PLATFORMS.map(p => (
            <div key={p.id} className="p-5 overflow-hidden" style={{ borderRadius: 12, border: `1px solid ${p.color}18`, background: 'rgba(255,240,200,0.02)' }}>
              <div className="flex items-center gap-3 mb-4">
                <PlatformLogo id={p.id} logo={p.logo} emoji={p.emoji} name={p.name} color={p.color} size={38} className="flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-[#f5ede0] text-sm truncate">{p.name}</p>
                    {p.recommended && <span className="text-[9px] font-bold px-1.5 py-0.5 flex-shrink-0" style={{ borderRadius: 4, background: 'rgba(212,168,67,0.12)', color: '#d4a843' }}>★ Top</span>}
                  </div>
                  <p className="text-xs text-[#5a4d3e]">{p.minDeposit}</p>
                </div>
                <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-[#4a3f32] hover:text-[#d4a843] transition-colors">
                  <ExternalLink size={13} />
                </a>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center py-2.5 px-2" style={{ borderRadius: 8, background: `${p.color}0d` }}>
                  <p className="text-[9px] text-[#5a4d3e] mb-1 uppercase tracking-wider">Tu reçois</p>
                  <p className="font-black text-base leading-none" style={{ color: p.color }}>{p.bonusFilleul}</p>
                </div>
                <div className="text-center py-2.5 px-2" style={{ borderRadius: 8, background: 'rgba(255,255,255,0.025)' }}>
                  <p className="text-[9px] text-[#5a4d3e] mb-1 uppercase tracking-wider">Parrain</p>
                  <p className="font-bold text-sm leading-none text-[#7a6a55]">{p.bonusParrain}</p>
                </div>
                <div className="text-center py-2.5 px-2" style={{ borderRadius: 8, background: 'rgba(212,168,67,0.06)' }}>
                  <p className="text-[9px] text-[#5a4d3e] mb-1 uppercase tracking-wider">Total</p>
                  <p className="font-black text-base leading-none" style={{ color: '#d4a843' }}>{p.bonusTotal}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary highlights */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Highlight icon={<TrendingUp size={15} />} label="Meilleur bonus total" name="OKX" detail="jusqu'à 300€ filleul + 80€ parrain" color="#f0b90b" />
          <Highlight icon={<Shield size={15} />} label="Banque la plus fiable" name="Fortuneo" detail="80€ filleul · 80€ parrain · code 14133207" color="#00c07f" />
          <Highlight icon={<Zap size={15} />} label="Le plus rapide" name="Revolut" detail="5 min, 100% app, bonus immédiat" color="#7c3aed" />
        </div>

      </div>
    </section>
  );
}

function Highlight({ icon, label, name, detail, color }: { icon: React.ReactNode; label: string; name: string; detail: string; color: string }) {
  return (
    <div className="p-5 flex items-start gap-4" style={{ borderRadius: 12, border: '1px solid rgba(212,168,67,0.1)', background: 'rgba(255,240,200,0.018)' }}>
      <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center" style={{ borderRadius: 8, background: `${color}15`, color }}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-[#5a4d3e] uppercase tracking-widest font-medium mb-1">{label}</p>
        <p className="font-bold text-[#f5ede0] text-base leading-tight mb-0.5">{name}</p>
        <p className="text-xs text-[#7a6a55] leading-snug">{detail}</p>
      </div>
    </div>
  );
}
