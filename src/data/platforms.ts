export type Step = {
  num: number;
  title: string;
  desc: string;
  tag?: 'App' | 'Web' | 'App ou Web';
};

export type Platform = {
  id: string;
  name: string;
  category: 'bank' | 'crypto';
  emoji: string;
  color: string;
  gradient: string;
  bonusFilleul: string;
  bonusParrain: string;
  bonusTotal: string;
  highlight: string;
  badge: string;
  badgeColor: string;
  minDeposit: string;
  timeline: string;
  conditions: string[];
  documents: string[];
  steps: Step[];
  tips: string[];
  warning?: string;
  suspended?: boolean;
  lastChecked: string;
  sourceUrl: string;
  reliability?: 'élevée' | 'moyenne' | 'basse';
  recommended?: boolean;
  offerNote?: string;
  referralCode?: string;
  referralUrl?: string;
  logo?: string;
};

export const PLATFORMS: Platform[] = [

  /* ─── FORTUNEO ────────────────────────────────────────── */
  {
    id: 'fortuneo',
    name: 'Fortuneo',
    category: 'bank',
    emoji: '🍀',
    logo: 'https://logo.clearbit.com/fortuneo.fr',
    color: '#00c07f',
    gradient: 'linear-gradient(135deg, #007a52 0%, #00c07f 100%)',
    bonusFilleul: '80 €',
    bonusParrain: '80 €',
    bonusTotal: '160 €',
    highlight: '80 € pour le parrain et 80 € pour le filleul. Valable 01–30/04/2026.',
    badge: 'Web & App',
    badgeColor: '#00c07f',
    minDeposit: 'Variable selon produit',
    timeline: 'Prime versée dans les 3 mois suivant la validation des conditions',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.fortuneo.fr/parrainage',
    reliability: 'élevée',
    recommended: true,
    referralCode: '140641174',
    offerNote: 'Parrain : 150 € (Gold CB), 100 € (AV), 80 € (Fosfo/PEA), 30 € (CTO). Filleul : 120 € (AV, versement initial ≥ 1 000 €). Autres filleuls non précisés officiellement.',
    conditions: [
      'Ne jamais avoir souscrit aucun produit Fortuneo',
      'Parrain : minimum 300 € d\'encours global sur ses comptes Fortuneo',
      'Maximum 10 filleuls parrainés par an',
      'Être résident fiscal français, majeur',
      'Filleul Assurance-Vie : versement initial minimum 1 000 € pour débloquer les 120 €',
      'Offre confirmée du 01/04/2026 au 30/04/2026',
    ],
    documents: [
      'CNI ou passeport en cours de validité (recto-verso pour CNI)',
      'Justificatif de domicile de moins de 3 mois',
      'RIB d\'une autre banque (pour versements)',
    ],
    steps: [
      { num: 1, title: 'Choisis ton produit', desc: 'Gold CB (parrain 150 €) · Fosfo (parrain 80 €) · Assurance-Vie (parrain 100 €, filleul 120 €) · PEA (parrain 80 €) · CTO (parrain 30 €). L\'AV est le seul produit avec montant filleul confirmé.', tag: 'Web' },
      { num: 2, title: 'Obtiens le lien de parrainage', desc: 'Indispensable. Ton parrain le trouve dans son espace Fortuneo → Parrainage → Partager.', tag: 'App ou Web' },
      { num: 3, title: 'Lance l\'inscription via le lien', desc: 'La page doit afficher "Parrainage" ou un code prérempli. Ne ferme pas et ne repasse pas par le site sans le lien.', tag: 'Web' },
      { num: 4, title: 'Remplis le dossier', desc: 'Formulaire complet : état civil, adresse, revenus. Upload CNI + justificatif domicile. Signature électronique via SMS.', tag: 'Web' },
      { num: 5, title: 'Effectue ton versement', desc: 'Pour l\'AV : versement initial ≥ 1 000 € requis. Pour les comptes bancaires : vérifier les conditions spécifiques à chaque produit.', tag: 'Web' },
      { num: 6, title: 'Prime versée dans les 3 mois', desc: 'Dès validation des conditions, la prime est versée automatiquement sur ton compte Fortuneo.', tag: 'App' },
    ],
    tips: [
      'L\'Assurance-Vie est le seul produit avec un montant filleul confirmé officiellement (120 €)',
      'La Gold CB parrain rapporte 150 € — le plus élevé actuellement',
      'Vérifier les montants filleul sur fortuneo.fr avant de souscrire un produit bancaire',
      'Le versement dans les 6 jours est strict pour les comptes bancaires',
    ],
    warning: 'Les montants filleul pour les produits bancaires (hors AV) n\'étaient pas précisés officiellement lors de la dernière vérification. Confirmez sur fortuneo.fr avant de souscrire.',
  },

  /* ─── TRADE REPUBLIC ─────────────────────────────────── */
  {
    id: 'traderepublic',
    name: 'Trade Republic',
    category: 'crypto',
    emoji: '📈',
    logo: 'https://logo.clearbit.com/traderepublic.com',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)',
    bonusFilleul: '10 € en actions',
    bonusParrain: '10 €',
    bonusTotal: '20 €',
    highlight: '10 € pour le parrain et 10 € en actions pour le filleul. 4% d\'intérêt annuel sur les liquidités.',
    badge: 'App uniquement',
    badgeColor: '#6366f1',
    minDeposit: 'Aucun minimum — 1er investissement requis',
    timeline: 'Prime versée après validation du compte et 1er investissement',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://traderepublic.com/fr-fr',
    reliability: 'élevée',
    recommended: true,
    referralUrl: 'https://refnocode.trade.re/x4l2x4l4',
    offerNote: 'Parrain reçoit des espèces, filleul reçoit des actions fractionnées. Partage du lien interdit sur réseaux sociaux et forums.',
    conditions: [
      'Filleul : jamais eu de compte Trade Republic',
      'Compte validé + 1er investissement effectué (même 1 €)',
      'Parrain reçoit 10 €, filleul reçoit 10 € en actions',
      'Partage du lien uniquement en direct (SMS, email) — jamais sur réseaux sociaux',
    ],
    documents: [
      'Pièce d\'identité valide (CNI ou passeport)',
      'Vérification biométrique via l\'app',
    ],
    steps: [
      { num: 1, title: 'Obtiens le lien en direct', desc: 'Le partage sur réseaux sociaux ou forums est INTERDIT. Le parrain partage uniquement par SMS, email ou en personne.', tag: 'App' },
      { num: 2, title: 'Télécharge l\'app et crée ton compte', desc: 'Télécharge Trade Republic depuis le lien parrain. Remplis ton état civil et vérification biométrique.', tag: 'App' },
      { num: 3, title: 'Effectue ton 1er investissement', desc: 'Dépose et investis (même 1 €). Cette étape est obligatoire pour valider le parrainage.', tag: 'App' },
      { num: 4, title: 'Reçois tes actions', desc: 'Le filleul reçoit 10 € en actions fractionnées. Le parrain reçoit 10 € en espèces.', tag: 'App' },
    ],
    tips: [
      'Trade Republic offre 4% d\'intérêt annuel sur les liquidités non investies',
      'Les actions reçues peuvent être conservées ou vendues directement',
      'Excellent pour débuter en bourse : interface simple, frais 1 €/ordre',
    ],
    warning: 'Partage du lien INTERDIT sur réseaux sociaux, forums ou plateformes de parrainage. Exclusion définitive du programme en cas de non-respect.',
  },

  /* ─── REVOLUT ─────────────────────────────────────────── */
  {
    id: 'revolut',
    name: 'Revolut',
    category: 'bank',
    emoji: '⚡',
    logo: 'https://logo.clearbit.com/revolut.com',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 60%, #0ea5e9 100%)',
    bonusFilleul: 'Aucune prime',
    bonusParrain: '80 €',
    bonusTotal: '80 € parrain',
    highlight: 'Seul le parrain reçoit une prime — 80 € fixes. Le filleul ne reçoit aucune prime.',
    badge: 'App uniquement',
    badgeColor: '#7c3aed',
    minDeposit: 'Aucun dépôt minimum',
    timeline: 'Bonus parrain versé sous 30 jours après validation des conditions',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.revolut.com/fr-FR/referral/',
    reliability: 'moyenne',
    referralUrl: 'https://www.revolut.com/fr-FR/referral/?referral-code=mathistt8p%21APR1-26-AR-H1',
    offerNote: 'Le parrain reçoit 80 € fixes. Le filleul ne reçoit rien.',
    conditions: [
      'Seul le parrain reçoit une prime — montant aléatoire entre 10 € et 80 €',
      'Le filleul n\'obtient aucune prime de parrainage',
      'Filleul : télécharger l\'app via le lien du parrain, créer un compte, vérifier son identité',
      'Commander la carte physique Revolut (gratuite en Standard)',
      'Effectuer le nombre de paiements indiqué dans l\'offre',
      'Être un nouvel utilisateur Revolut (aucun compte précédent)',
    ],
    documents: [
      'Pièce d\'identité (CNI ou passeport) — photographiée dans l\'app',
      'Selfie biométrique (IA, généralement instantané)',
      'Numéro de téléphone mobile valide',
    ],
    steps: [
      { num: 1, title: 'Parrain : partage son lien depuis l\'app', desc: 'Va dans l\'app : Menu → Inviter des amis → Partager le lien. Le parrain reçoit 80 € fixes dès que les conditions sont remplies.', tag: 'App' },
      { num: 2, title: 'Partage le lien depuis l\'app', desc: 'Le filleul DOIT télécharger l\'app en cliquant sur ce lien — pas en cherchant Revolut dans le store. Sinon le parrainage ne sera pas lié.', tag: 'App' },
      { num: 3, title: 'Crée ton compte en 5 minutes', desc: 'Numéro de téléphone, code PIN, infos personnelles. Interface guidée et en français.', tag: 'App' },
      { num: 4, title: 'Vérifie ton identité (KYC)', desc: 'Photographie ta CNI/passeport puis fais un selfie. Vérification par IA en quelques minutes généralement.', tag: 'App' },
      { num: 5, title: 'Commande la carte physique', desc: 'App → Cartes → Commander une carte physique. La Standard est gratuite. Sans cette étape, pas de bonus pour le parrain.', tag: 'App' },
      { num: 6, title: 'Atteins l\'objectif de paiements', desc: 'Effectue le nombre de paiements requis (affiché dans app → Récompenses). Le parrain reçoit son bonus une fois les conditions remplies.', tag: 'App' },
    ],
    tips: [
      'La prime parrain est fixe à 80 € — l\'une des meilleures du marché',
      'Le filleul ne reçoit rien : préfère Monabanq ou Fortuneo si tu cherches un bonus filleul',
      'Revolut Standard est 100% gratuit et excellent pour les voyages (0% frais de change)',
      'La carte virtuelle est disponible immédiatement en Apple Pay / Google Pay',
    ],
    warning: 'Seul le parrain reçoit une prime (80 €). Le filleul ne reçoit AUCUNE prime.',
  },

  /* ─── BOURSOBANK ──────────────────────────────────────── */
  {
    id: 'boursorama',
    name: 'BoursoBank',
    category: 'bank',
    emoji: '🏦',
    logo: 'https://logo.clearbit.com/boursobank.com',
    color: '#00b4d8',
    gradient: 'linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)',
    bonusFilleul: '—',
    bonusParrain: '—',
    bonusTotal: 'Suspendu',
    highlight: 'Programme de parrainage totalement suspendu en avril 2026. Aucune prime disponible pour les nouvelles ouvertures.',
    badge: 'Web & App',
    badgeColor: '#64748b',
    minDeposit: 'N/A — programme suspendu',
    timeline: 'N/A',
    suspended: true,
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.boursobank.com/bon-plan/parrainage-boursobank',
    reliability: 'basse',
    conditions: [
      'Programme de parrainage SUSPENDU — BoursoBank n\'propose plus de prime pour les nouvelles ouvertures',
      'Aucune date de reprise communiquée officiellement',
      'L\'ouverture de compte BoursoBank reste possible mais sans prime de parrainage',
      'À surveiller : BoursoBank relance régulièrement des offres boostées (souvent en fin d\'année)',
    ],
    documents: [
      'Pièce d\'identité valide (CNI recto-verso ou passeport)',
      'Justificatif de domicile de moins de 3 mois',
      'RIB d\'un autre établissement',
      'Numéro de téléphone mobile français',
    ],
    steps: [
      { num: 1, title: 'Vérifie si une offre est relancée', desc: 'IMPORTANT : le programme est suspendu. Avant de t\'inscrire, vérifie sur boursobank.com si une nouvelle offre est disponible. Inscris-toi aux alertes ParrainBoost.', tag: 'Web' },
      { num: 2, title: 'Attends une offre boostée', desc: 'BoursoBank relance régulièrement ses offres (souvent 80€+ en fin d\'année ou lors de campagnes ponctuelles). L\'attente en vaut la peine.', tag: 'Web' },
    ],
    tips: [
      'Surveille les alertes ParrainBoost — BoursoBank relance ses offres plusieurs fois par an',
      'La banque reste la n°1 en France et vaut le coup à terme, même sans prime immédiate',
      'Les offres boostées atteignaient 80€ à 150€+ par le passé',
    ],
    warning: 'Programme de parrainage TOTALEMENT SUSPENDU en avril 2026. Aucune prime disponible. Source : site officiel BoursoBank.',
  },

  /* ─── HELLO BANK ──────────────────────────────────────── */
  {
    id: 'hellobank',
    name: 'Hello bank!',
    category: 'bank',
    emoji: '👋',
    logo: 'https://logo.clearbit.com/hellobank.fr',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)',
    bonusFilleul: '80 €',
    bonusParrain: 'jusqu\'à 80 €',
    bonusTotal: 'jusqu\'à 160 €',
    highlight: '80 € pour le filleul (Hello One/Duo). Parrain jusqu\'à 80 € dont 40 € bonus activité.',
    badge: 'Web & App',
    badgeColor: '#0ea5e9',
    minDeposit: 'Aucun dépôt minimum',
    timeline: 'Prime filleul créditée sous 20 jours après ouverture définitive',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.hellobank.fr/fr/votre-offre-parrainage/',
    reliability: 'élevée',
    recommended: true,
    offerNote: 'Offre actuelle : inscription avant 07/04/2026 à 15h — compte finalisé avant 30/04/2026. Nouvelle offre à surveiller après cette date.',
    conditions: [
      'Ne pas être déjà client Hello bank!',
      'Ouvrir un compte Hello One ou Hello One Duo via le lien d\'invitation du parrain',
      'Inscription filleul : avant le 07/04/2026 à 15h',
      'Finalisation du compte : avant le 30/04/2026 à 15h',
      'Parrain : 40 € fixe + 40 € bonus activité (60 opérations carte entre sept. 2025 et fév. 2026)',
      'Prime filleul créditée sous 20 jours après ouverture définitive du compte',
      'Maximum 10 parrainages validés par parrain par année civile',
    ],
    documents: [
      'Pièce d\'identité valide (CNI recto-verso ou passeport)',
      'Justificatif de domicile de moins de 3 mois',
      'Numéro de téléphone mobile français',
    ],
    steps: [
      { num: 1, title: 'Vérifie la date limite', desc: 'URGENT : l\'inscription filleul doit être faite avant le 07/04/2026 à 15h. Si tu es après cette date, une nouvelle offre sera probablement disponible — vérifier sur hellobank.fr.', tag: 'Web' },
      { num: 2, title: 'Obtiens le lien d\'invitation', desc: 'Demande le lien à ton parrain. L\'inscription doit se faire obligatoirement via ce lien.', tag: 'App ou Web' },
      { num: 3, title: 'Inscris-toi via le lien', desc: 'Clique sur le lien d\'invitation et choisis Hello One ou Hello One Duo. Remplis le formulaire complet.', tag: 'Web' },
      { num: 4, title: 'Finalise l\'ouverture', desc: 'Complete toutes les étapes (identité, signature électronique) avant le 30/04/2026 à 15h.', tag: 'Web' },
      { num: 5, title: 'Reçois tes 40 €', desc: 'La prime de 40 € est créditée sous 20 jours après l\'ouverture définitive du compte.', tag: 'App' },
    ],
    tips: [
      'Hello One est gratuit sous condition d\'1 paiement ou retrait/mois, sinon 6 €/mois',
      'Hello Prime (5 €/mois) n\'est pas éligible à l\'offre actuelle — choisir Hello One',
      'Surveille hellobank.fr après le 07/04 pour la nouvelle offre de parrainage',
      'Max 10 parrainages/an — idéal pour les parrains actifs',
    ],
    warning: 'Offre valable pour inscriptions avant le 07/04/2026 à 15h et finalisation avant le 30/04/2026. Vérifiez hellobank.fr pour la nouvelle offre après cette date.',
  },

  /* ─── OKX ─────────────────────────────────────────────── */
  {
    id: 'okx',
    name: 'OKX',
    category: 'crypto',
    emoji: '🟡',
    logo: 'https://logo.clearbit.com/okx.com',
    color: '#f0b90b',
    gradient: 'linear-gradient(135deg, #b45309 0%, #f0b90b 60%, #fde68a 100%)',
    bonusFilleul: 'jusqu\'à 200 €',
    bonusParrain: 'jusqu\'à 200 €',
    bonusTotal: 'jusqu\'à 400 €',
    highlight: 'Filleul : jusqu\'à 200 € de bonus de bienvenue selon dépôt. Parrain : commission sur les frais de trading du filleul à vie.',
    badge: 'Web & App',
    badgeColor: '#f0b90b',
    minDeposit: 'Aucun minimum',
    timeline: 'Bonus débloqués progressivement selon activité de trading',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.okx.com/fr/join',
    reliability: 'élevée',
    recommended: true,
    referralCode: '49834320',
    offerNote: 'OKX est l\'un des plus grands exchanges crypto mondiaux. Les bonus varient selon les campagnes en cours.',
    conditions: [
      'Créer un compte via le lien de parrainage',
      'Vérifier son identité (KYC niveau 1 minimum)',
      'Effectuer un dépôt ou un premier trade pour activer les bonus',
      'Bonus échelonnés selon le volume de trading',
    ],
    documents: [
      'Pièce d\'identité valide (CNI ou passeport)',
      'Selfie biométrique',
      'Adresse email et numéro de téléphone',
    ],
    steps: [
      { num: 1, title: 'Inscris-toi via le lien parrain', desc: 'Clique sur le lien de parrainage. Sans lien, le code parrain ne sera pas appliqué.', tag: 'Web' },
      { num: 2, title: 'Vérifie ton identité (KYC)', desc: 'Pièce ID + selfie biométrique. Nécessaire pour débloquer les dépôts/retraits et les bonus.', tag: 'App ou Web' },
      { num: 3, title: 'Effectue ton 1er dépôt', desc: 'Dépose des cryptos ou via virement/carte. Le montant influence le tier de bonus.', tag: 'App ou Web' },
      { num: 4, title: 'Trade et débloque les bonus', desc: 'Les bonus sont débloqués progressivement selon ton volume. Consulte Récompenses dans l\'app.', tag: 'App' },
    ],
    tips: [
      'OKX propose aussi du staking et des produits financiers DeFi',
      'L\'app mobile est très complète : spot, futures, options, Web3',
      'Les frais sont parmi les plus bas du marché (0.08% maker / 0.1% taker)',
    ],
    warning: 'Les cryptomonnaies sont des actifs très volatils. N\'investis que ce que tu peux te permettre de perdre. 18+ uniquement.',
  },

];

export const BANKS = PLATFORMS.filter(p => p.category === 'bank');
export const CRYPTO = PLATFORMS.filter(p => p.category === 'crypto');
