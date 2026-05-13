import { TrendingUp, Users, ShieldCheck, Star } from 'lucide-react';

export function SocialProof() {
  return (
    <section className="pt-4 pb-2 px-5">
      <div className="max-w-6xl mx-auto">
        <div
          className="flex items-center justify-around gap-2 px-4 py-3.5"
          style={{
            borderRadius: 10,
            border: '1px solid rgba(212,168,67,0.1)',
            background: 'rgba(255,240,200,0.018)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          <Stat icon={<Users size={13} />} value="100+" label="parrainages" color="#d4a843" />
          <div className="w-px h-6 bg-white/[0.06]" />
          <Stat icon={<TrendingUp size={13} />} value="510 €" label="max cumulable" color="#d4a843" />
          <div className="w-px h-6 bg-white/[0.06]" />
          <Stat icon={<ShieldCheck size={13} />} value="100%" label="vérifiés" color="#d4a843" />
          <div className="w-px h-6 bg-white/[0.06]" />
          <Stat icon={<Star size={13} />} value="6" label="plateformes" color="#d4a843" />
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 text-center">
      <div className="flex items-center gap-1" style={{ color }}>
        {icon}
        <span className="font-black text-[#f5ede0] text-sm">{value}</span>
      </div>
      <span className="text-[9px] uppercase tracking-wider font-medium" style={{ color: '#4a3f32' }}>{label}</span>
    </div>
  );
}
