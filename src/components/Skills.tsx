import { SectionLabel, GradientText } from './Services';

// ─── Tech data ──────────────────────────────────────────────────────────────

const ROW1 = [
  { name: 'React',         abbr: 'Re',  bg: '#0d2137', color: '#61DAFB' },
  { name: 'TypeScript',    abbr: 'TS',  bg: '#0c1e3d', color: '#3178C6' },
  { name: 'Next.js',       abbr: 'N↗', bg: '#111111', color: '#ffffff' },
  { name: 'Tailwind CSS',  abbr: 'TW', bg: '#062a30', color: '#06B6D4' },
  { name: 'JavaScript',    abbr: 'JS',  bg: '#2b2700', color: '#F7DF1E' },
  { name: 'HTML5',         abbr: '</>', bg: '#2d1000', color: '#E34F26' },
  { name: 'CSS3',          abbr: '#',   bg: '#071b30', color: '#1572B6' },
  { name: 'Figma',         abbr: 'Fi',  bg: '#220e1f', color: '#A259FF' },
  { name: 'Framer Motion', abbr: 'FM', bg: '#0a0a25', color: '#7B61FF' },
  { name: 'GSAP',          abbr: 'GS', bg: '#162100', color: '#88CE02' },
];

const ROW2 = [
  { name: 'Node.js',       abbr: 'Nd', bg: '#0a1f0a', color: '#339933' },
  { name: 'Vite',          abbr: '⚡', bg: '#0d0d25', color: '#646CFF' },
  { name: 'Git',           abbr: 'Gt', bg: '#2d0f0a', color: '#F05032' },
  { name: 'Vercel',        abbr: '▲',  bg: '#111111', color: '#ffffff' },
  { name: 'SEO',           abbr: '↑',  bg: '#062b1f', color: '#10B981' },
  { name: 'Analytics',     abbr: 'GA', bg: '#2d1400', color: '#F97316' },
  { name: 'WordPress',     abbr: 'Wp', bg: '#051525', color: '#21759B' },
  { name: 'Performance',   abbr: '⚡', bg: '#052235', color: '#0EA5E9' },
  { name: 'Responsive',    abbr: '⊡',  bg: '#130d2e', color: '#8B5CF6' },
  { name: 'Lighthouse',    abbr: '◉',  bg: '#2d2600', color: '#F4B400' },
];

// ─── Skill pill ─────────────────────────────────────────────────────────────

function Pill({ name, abbr, bg, color }: { name: string; abbr: string; bg: string; color: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border flex-shrink-0 select-none"
      style={{ background: 'rgba(255,255,255,0.02)', borderColor: `${color}22` }}>
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0"
        style={{ background: bg, color, border: `1px solid ${color}40` }}>
        {abbr}
      </div>
      <span className="text-slate-300 text-sm font-medium whitespace-nowrap">{name}</span>
    </div>
  );
}

// ─── Marquee row ────────────────────────────────────────────────────────────

function Marquee({ items, reverse = false }: { items: typeof ROW1; reverse?: boolean }) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden">
      {/* Fade masks left / right */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #07080f, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #07080f, transparent)' }} />

      <div
        className="flex gap-3"
        style={{
          animation: `${reverse ? 'marquee-right' : 'marquee-left'} ${items.length * 2.8}s linear infinite`,
          width: 'max-content',
        }}
      >
        {doubled.map((item, i) => (
          <Pill key={`${item.name}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
}

// ─── Stats row ──────────────────────────────────────────────────────────────

const STATS = [
  { n: '10+', label: 'Technologies maîtrisées' },
  { n: '100%', label: 'Code sur-mesure' },
  { n: '90+', label: 'Score Lighthouse moyen' },
  { n: 'A+', label: 'Note de sécurité SSL' },
];

// ─── Section ────────────────────────────────────────────────────────────────

export function Skills() {
  return (
    <section id="stack" className="py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-14">
        <SectionLabel>Stack technique</SectionLabel>
        <h2 className="section-title">Nos <GradientText>technologies</GradientText></h2>
        <p className="section-sub">
          Nous utilisons les outils les plus modernes du marché pour livrer des sites
          rapides, accessibles et maintenables sur le long terme.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 mt-10">
          {STATS.map(s => (
            <div key={s.label} className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <span className="text-2xl font-black"
                style={{ background: 'linear-gradient(135deg,#00c2ff,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {s.n}
              </span>
              <span className="text-slate-500 text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee rows */}
      <div className="space-y-3">
        <Marquee items={ROW1} />
        <Marquee items={ROW2} reverse />
      </div>

      {/* Categories legend */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mt-12 flex flex-wrap gap-6">
        {[
          { label: 'Design & UI', color: '#A259FF' },
          { label: 'Frontend',    color: '#61DAFB' },
          { label: 'Performance', color: '#0EA5E9' },
          { label: 'SEO & Analytics', color: '#10B981' },
          { label: 'Tooling & DevOps', color: '#F05032' },
        ].map(cat => (
          <div key={cat.label} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
            <span className="text-slate-600 text-xs">{cat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
