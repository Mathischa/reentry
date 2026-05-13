import { TrendingUp, Users, ShieldCheck, Star } from 'lucide-react';

export function SocialProof() {
  return (
    <section className="py-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-around gap-2 px-2 py-4 rounded-2xl border border-white/[0.05] bg-white/[0.02]">
          <Stat icon={<Users size={14} />} value="100+" label="parrainages" color="#10b981" />
          <div className="w-px h-7 bg-white/[0.07]" />
          <Stat icon={<TrendingUp size={14} />} value="470 €" label="max cumulable" color="#0ea5e9" />
          <div className="w-px h-7 bg-white/[0.07]" />
          <Stat icon={<ShieldCheck size={14} />} value="100%" label="vérifiés" color="#6366f1" />
          <div className="w-px h-7 bg-white/[0.07]" />
          <Stat icon={<Star size={14} />} value="5" label="plateformes actives" color="#f0b90b" />
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <div className="flex items-center gap-1" style={{ color }}>
        {icon}
        <span className="font-black text-white text-sm">{value}</span>
      </div>
      <span className="text-slate-500 text-[10px] leading-tight">{label}</span>
    </div>
  );
}
