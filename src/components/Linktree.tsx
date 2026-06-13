import { useState } from 'react';
import { Copy, Check, ExternalLink, ChevronDown } from 'lucide-react';
import { PLATFORMS } from '../data/platforms';
import fortuneoLogo from '../img/fortuneo.png';
import okxLogo from '../img/okx.png';
import robinhoodLogo from '../img/robinhood.png';
import hellobankLogo from '../img/hellobank.png';

const TIKTOK_URL = 'https://www.tiktok.com/@parrainboost';

const LOCAL_LOGOS: Record<string, string> = {
  fortuneo: fortuneoLogo,
  okx: okxLogo,
  robinhood: robinhoodLogo,
  hellobank: hellobankLogo,
};

type ConditionDetail = { prime: string; delai: string; items: string[] };

const CONDITIONS: Record<string, ConditionDetail> = {
  hellobank: {
    prime: '80 €',
    delai: '2-3 semaines',
    items: [
      'Ne pas être déjà client Hello bank!',
      'Ouvrir un Hello One via le lien parrain',
      'Ils t\'envoient 10 € → faire 10 paiements avec',
      'Aucun dépôt minimum',
      'Max 10 parrainages par an',
    ],
  },
  fortuneo: {
    prime: '80 €',
    delai: '7-10 jours',
    items: [
      'Ne jamais avoir souscrit à Fortuneo',
      'Prendre la carte Fosfo',
      'Résidents fiscaux français uniquement',
      'Max 10 filleuls par an',
    ],
  },
  robinhood: {
    prime: '50 € en crypto',
    delai: 'Instantané',
    items: [
      "S'inscrire via le lien parrain obligatoirement",
      'Dépôt minimum 50 €',
      'Prime versée en cryptomonnaie',
    ],
  },
  okx: {
    prime: "jusqu'à 300 €",
    delai: 'Après validation de la tâche',
    items: [
      'Créer un compte via le lien ou code parrain',
      'Vérification KYC requise',
      'Laisser le dépôt pendant 30 jours',
      'Dépôt minimum 2 000 €',
    ],
  },
};

const SHOWN_IDS = ['hellobank', 'fortuneo', 'robinhood', 'okx'];
const platforms = PLATFORMS.filter(p => SHOWN_IDS.includes(p.id))
  .sort((a, b) => SHOWN_IDS.indexOf(a.id) - SHOWN_IDS.indexOf(b.id));

export function Linktree() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-5 pt-12 pb-16">

      {/* Avatar */}
      <div
        className="w-24 h-24 rounded-full mb-4 flex items-center justify-center text-3xl font-bold overflow-hidden"
        style={{ border: '2px solid #d4a843', background: '#fef9ec' }}
      >
        <span style={{ color: '#d4a843' }}>M</span>
      </div>

      <h1 className="text-gray-900 font-bold text-xl mb-2">Mathis.gooddeals</h1>
      <p className="text-gray-400 text-xs text-center mb-8 max-w-xs">
        mes parrainages disponibles
      </p>

      {/* TikTok pill */}
      <a
        href={TIKTOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 transition-opacity hover:opacity-70"
        style={{ background: '#111', color: '#fff' }}
      >
        <TikTokIcon />
        Suis-moi sur TikTok
      </a>

      {/* Link list */}
      <div className="w-full max-w-sm space-y-3">
        {platforms.map(p => <LinkCard key={p.id} platform={p} />)}
      </div>

      {/* Green live dot — bottom right */}
      <div className="fixed bottom-5 right-5 flex items-center gap-2">
        <span className="text-[10px] text-gray-400 font-medium">En ligne</span>
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
      </div>
    </div>
  );
}

function LinkCard({ platform: p }: { platform: typeof PLATFORMS[number] }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    if (!p.referralCode) return;
    navigator.clipboard.writeText(p.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const href = p.contactUrl ?? p.referralUrl ?? p.sourceUrl;
  const logo = LOCAL_LOGOS[p.id];
  const cond = CONDITIONS[p.id];

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: '#e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
    >
      {/* Main row — clickable link */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 w-full px-4 py-4 bg-white transition-colors hover:bg-gray-50"
      >
        {/* Logo */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{ background: p.id === 'okx' ? '#000' : `${p.color}14` }}
        >
          {logo ? (
            <img src={logo} alt={p.name} className="w-8 h-8 rounded object-contain" />
          ) : (
            <span className="text-2xl">{p.emoji}</span>
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 text-left">
          <p className="text-gray-900 font-semibold text-sm leading-tight">{p.name}</p>
          <p className="text-xs mt-0.5 font-medium" style={{ color: p.color }}>
            {p.contactUrl ? 'Contacte-moi pour le lien' : `Gagne ${p.bonusFilleul}`}
          </p>
        </div>

        {/* Action */}
        {p.referralCode ? (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold flex-shrink-0 transition-all"
            style={{
              background: copied ? '#fef3c7' : `${p.color}14`,
              color: copied ? '#92400e' : p.color,
              border: `1px solid ${copied ? '#fcd34d' : `${p.color}30`}`,
            }}
          >
            {copied ? <><Check size={11} /> Copié</> : <><Copy size={11} /> {p.referralCode}</>}
          </button>
        ) : (
          <ExternalLink size={15} style={{ color: p.color, opacity: 0.5, flexShrink: 0 }} />
        )}
      </a>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium text-gray-400 transition-colors hover:bg-gray-50"
        style={{ borderTop: '1px solid #f3f4f6' }}
      >
        <span>{open ? 'Masquer les conditions' : 'Voir les conditions'}</span>
        <ChevronDown
          size={14}
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}
        />
      </button>

      {/* Expanded conditions */}
      {open && cond && (
        <div className="px-4 pb-4 pt-3 space-y-3" style={{ borderTop: `1px solid ${p.color}18`, background: `${p.color}05` }}>
          {/* Prime + délai */}
          <div className="flex gap-3">
            <div className="flex-1 rounded-xl px-3 py-2.5 text-center" style={{ background: `${p.color}12` }}>
              <p className="text-[9px] text-gray-400 uppercase tracking-wide mb-0.5">Prime filleul</p>
              <p className="font-bold text-sm" style={{ color: p.color }}>{cond.prime}</p>
            </div>
            <div className="flex-1 rounded-xl px-3 py-2.5 text-center" style={{ background: '#f9fafb' }}>
              <p className="text-[9px] text-gray-400 uppercase tracking-wide mb-0.5">Délai</p>
              <p className="font-bold text-sm text-gray-700">{cond.delai}</p>
            </div>
          </div>

          {/* Condition items */}
          <ul className="space-y-1.5">
            {cond.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color, opacity: 0.7, marginTop: 4 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function TikTokIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.28 8.28 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z" />
    </svg>
  );
}
