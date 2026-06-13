import { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { PLATFORMS } from '../data/platforms';
import fortuneoLogo from '../img/fortuneo.png';
import okxLogo from '../img/okx.png';
import robinhoodLogo from '../img/robinhood.png';
import hellobankLogo from '../img/hellobank.png';

const TIKTOK_URL = 'https://www.tiktok.com/@parrainboost';

const TICKERS: Record<string, string> = {
  hellobank:  '💰 Prime filleul : 80 €  ·  Aucun dépôt minimum  ·  Ouvrir un Hello One via le lien parrain  ·  Prime créditée sous 20 jours  ·  Max 10 parrainages/an  ·  Ne pas être déjà client Hello bank!',
  fortuneo:   '💰 Prime filleul : 80 €  ·  Dépôt minimum 300 €  ·  Ne jamais avoir souscrit à Fortuneo  ·  Prime versée dans les 3 mois  ·  Max 10 filleuls/an  ·  Résidents fiscaux français uniquement',
  robinhood:  '💰 Prime filleul : 50 € en crypto  ·  Dépôt minimum 50 €  ·  S\'inscrire via le lien parrain obligatoirement  ·  Prime versée après dépôt  ·  Excellent ROI : 50 € déposés → 50 € offerts',
  okx:        '💰 Prime filleul : jusqu\'à 300 €  ·  Vérification KYC requise  ·  Accomplir la tâche assignée par OKX  ·  Code parrain : 49834320  ·  Dépôt minimum 2 000 €  ·  Paiement SEPA, Apple Pay, Visa, Mastercard',
};

const LOCAL_LOGOS: Record<string, string> = {
  fortuneo: fortuneoLogo,
  okx: okxLogo,
  robinhood: robinhoodLogo,
  hellobank: hellobankLogo,
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
        {platforms.map(p => <LinkCard key={p.id} platform={p} ticker={TICKERS[p.id] ?? ''} />)}
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

function LinkCard({ platform: p, ticker }: { platform: typeof PLATFORMS[number]; ticker: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    if (!p.referralCode) return;
    navigator.clipboard.writeText(p.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const href = p.contactUrl ?? p.referralUrl ?? p.sourceUrl;
  const logo = LOCAL_LOGOS[p.id];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center gap-4 w-full px-4 pt-4 pb-9 rounded-2xl border transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
      style={{
        background: '#fff',
        borderColor: '#e5e7eb',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
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
        <p className="text-xs mt-0.5 truncate font-medium" style={{ color: p.color }}>
          {p.contactUrl
            ? 'Contacte-moi pour le lien'
            : `Gagne ${p.bonusFilleul}`}
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

      {/* Ticker — full width, below the row */}
      <div
        className="absolute bottom-0 inset-x-0 overflow-hidden"
        style={{ borderTop: `1px solid ${p.color}18`, borderRadius: '0 0 16px 16px', background: `${p.color}06` }}
      >
        <div className="animate-marquee py-1.5 px-0">
          {[ticker, ticker].map((t, i) => (
            <span key={i} className="text-[10px] font-medium whitespace-nowrap px-6" style={{ color: p.color, opacity: 0.75 }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

function TikTokIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.28 8.28 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z" />
    </svg>
  );
}
