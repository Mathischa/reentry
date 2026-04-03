export type Step = {
  num: number;
  title: string;
  desc: string;
  tag?: 'App' | 'Web' | 'App ou Web';
};

export type Platform = {
  id: string;
  name: string;
  category: 'bank' | 'betting';
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
};

export const PLATFORMS: Platform[] = [

  /* ─── BOURSOBANK ──────────────────────────────────────── */
  {
    id: 'boursorama',
    name: 'BoursoBank',
    category: 'bank',
    emoji: '🏦',
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
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)',
    bonusFilleul: '40 €',
    bonusParrain: 'jusqu\'à 80 €',
    bonusTotal: 'jusqu\'à 120 €',
    highlight: '40 € pour le filleul (Hello One/Duo). Parrain jusqu\'à 80 € dont 40 € bonus activité. Inscription filleul avant le 07/04/2026 à 15h.',
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




  /* ─── FORTUNEO ────────────────────────────────────────── */
  {
    id: 'fortuneo',
    name: 'Fortuneo',
    category: 'bank',
    emoji: '🍀',
    color: '#00c07f',
    gradient: 'linear-gradient(135deg, #007a52 0%, #00c07f 100%)',
    bonusFilleul: '120 € (Assurance-Vie)',
    bonusParrain: '30 € – 150 €',
    bonusTotal: 'jusqu\'à 270 €',
    highlight: 'Parrain : 150 € (Gold), 100 € (AV), 80 € (Fosfo/PEA), 30 € (CTO). Filleul : 120 € confirmé pour l\'Assurance-Vie. Valable 01–30/04/2026.',
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

  /* ─── REVOLUT ─────────────────────────────────────────── */
  {
    id: 'revolut',
    name: 'Revolut',
    category: 'bank',
    emoji: '⚡',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 60%, #0ea5e9 100%)',
    bonusFilleul: 'Aucune prime',
    bonusParrain: '10 € – 80 € (aléatoire)',
    bonusTotal: '10 € – 80 € parrain',
    highlight: 'Seul le parrain reçoit une prime — entre 10 € et 80 € attribuée de façon aléatoire. Le filleul ne reçoit aucune prime.',
    badge: 'App uniquement',
    badgeColor: '#7c3aed',
    minDeposit: 'Aucun dépôt minimum',
    timeline: 'Bonus parrain versé sous 30 jours après validation des conditions',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.revolut.com/fr-FR/referral/',
    reliability: 'moyenne',
    referralUrl: 'https://www.revolut.com/fr-FR/referral/?referral-code=mathistt8p%21APR1-26-AR-H1',
    offerNote: 'La prime parrain est attribuée de façon aléatoire (10 €–80 €), sans garantie de montant. Le filleul ne reçoit rien.',
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
      { num: 1, title: 'Parrain : vérifie le bonus dans l\'app', desc: 'Avant de partager, le parrain vérifie le montant dans l\'app : Menu → Inviter des amis → Voir le bonus. Le montant est aléatoire et change selon les campagnes.', tag: 'App' },
      { num: 2, title: 'Partage le lien depuis l\'app', desc: 'Le filleul DOIT télécharger l\'app en cliquant sur ce lien — pas en cherchant Revolut dans le store. Sinon le parrainage ne sera pas lié.', tag: 'App' },
      { num: 3, title: 'Crée ton compte en 5 minutes', desc: 'Numéro de téléphone, code PIN, infos personnelles. Interface guidée et en français.', tag: 'App' },
      { num: 4, title: 'Vérifie ton identité (KYC)', desc: 'Photographie ta CNI/passeport puis fais un selfie. Vérification par IA en quelques minutes généralement.', tag: 'App' },
      { num: 5, title: 'Commande la carte physique', desc: 'App → Cartes → Commander une carte physique. La Standard est gratuite. Sans cette étape, pas de bonus pour le parrain.', tag: 'App' },
      { num: 6, title: 'Atteins l\'objectif de paiements', desc: 'Effectue le nombre de paiements requis (affiché dans app → Récompenses). Le parrain reçoit son bonus une fois les conditions remplies.', tag: 'App' },
    ],
    tips: [
      'La prime parrain varie aléatoirement — vérifier le montant avant de partager',
      'Le filleul ne reçoit rien : préfère Monabanq ou Fortuneo si tu cherches un bonus filleul',
      'Revolut Standard est 100% gratuit et excellent pour les voyages (0% frais de change)',
      'La carte virtuelle est disponible immédiatement en Apple Pay / Google Pay',
    ],
    warning: 'La prime parrain est attribuée de façon ALÉATOIRE entre 10 € et 80 €, sans garantie de montant. Le filleul ne reçoit AUCUNE prime.',
  },

  /* ─── BETCLIC ─────────────────────────────────────────── */
  {
    id: 'betclic',
    name: 'Betclic',
    category: 'betting',
    emoji: '⚽',
    color: '#e8001c',
    gradient: 'linear-gradient(135deg, #9b0000 0%, #e8001c 60%, #ff4444 100%)',
    bonusFilleul: '40 € en freebets',
    bonusParrain: '40 € en freebets',
    bonusTotal: '80 € en freebets',
    highlight: '40 € en freebets pour le parrain et 40 € pour le filleul. Max 5 filleuls/an soit 200 € de freebets maximum pour le parrain.',
    badge: 'Web & App',
    badgeColor: '#e8001c',
    minDeposit: 'Dépôt minimum 10 €',
    timeline: 'Freebets crédités après validation du compte et 1er dépôt',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.betclic.fr/content/spo_par',
    reliability: 'élevée',
    recommended: true,
    referralCode: 'MATCWAL7',
    offerNote: 'Freebets valables 6 mois, uniquement paris sportifs (non utilisables poker ou hippique). Max 5 filleuls/an = 200 € max pour le parrain.',
    conditions: [
      'Filleul : saisir le code parrainage à l\'inscription',
      'Valider son compte dans les 60 jours (pièce d\'identité + justificatif)',
      'Effectuer un 1er dépôt minimum de 10 €',
      'Freebets valables 6 mois, uniquement sur paris sportifs',
      'Limite parrain : 5 filleuls par an soit max 200 € de freebets',
      'Si le filleul n\'a pas validé son compte ou n\'a pas déposé → parrainage non validé',
    ],
    documents: [
      'Pièce d\'identité valide (CNI ou passeport)',
      'Justificatif de domicile de moins de 3 mois',
      'RIB à ton nom (obligatoire pour retirer les gains)',
    ],
    steps: [
      { num: 1, title: 'Parrain partage son code', desc: 'App Betclic → Menu → Parrainage → Copier mon lien/code.', tag: 'App ou Web' },
      { num: 2, title: 'Inscription avec le code', desc: 'Saisis le code parrainage lors de l\'inscription. La case doit être visible sur le formulaire.', tag: 'App ou Web' },
      { num: 3, title: 'Vérification d\'identité KYC', desc: 'Upload pièce ID + justificatif domicile. Obligatoire sous 60 jours pour débloquer le bonus.', tag: 'Web' },
      { num: 4, title: 'Premier dépôt (min 10 €)', desc: 'Dépose minimum 10 €. Le bonus de parrainage est déclenché après ce dépôt.', tag: 'App ou Web' },
      { num: 5, title: 'Reçois tes 40 € freebets', desc: 'Tes 40 € en freebets sont crédités automatiquement. Valables 6 mois, sur paris sportifs uniquement.', tag: 'App' },
      { num: 6, title: 'Parrain reçoit 40 € freebets', desc: 'Dès validation du compte filleul et dépôt effectué, le parrain reçoit ses 40 € en freebets.', tag: 'App' },
      { num: 7, title: 'Utilise tes freebets intelligemment', desc: 'Cumul possible avec le bonus bienvenue : code BCGOAL → 1er pari perdant remboursé jusqu\'à 100 € en cash.', tag: 'App ou Web' },
    ],
    tips: [
      'Le code BCGOAL pour la bienvenue est cumulable avec le code parrainage',
      'Parie sur des cotes ≥ 1.70 pour optimiser tes freebets',
      'Vérifie ton identité dès l\'inscription pour ne pas bloquer le bonus',
      'Les freebets expirent après 6 mois — utilise-les avant',
    ],
    warning: 'Les paris sportifs peuvent créer de l\'addiction. Joue de manière responsable. Interdit aux mineurs. 18+ uniquement.',
  },

  /* ─── WINAMAX ─────────────────────────────────────────── */
  {
    id: 'winamax',
    name: 'Winamax',
    category: 'betting',
    emoji: '🃏',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #78350f 0%, #d97706 60%, #f59e0b 100%)',
    bonusFilleul: '10 € bonus + 10 € freebets',
    bonusParrain: '10 € bonus + 10 € freebets',
    bonusTotal: '20 € bonus + 20 € freebets',
    highlight: '10 € bonus + 10 € freebets pour chacun. Bonus progressifs parrain jusqu\'à 150 € supplémentaires (statuts Noob→GOAT). Max 5 parrainages/mois.',
    badge: 'Web & App',
    badgeColor: '#d97706',
    minDeposit: 'Dépôt minimum 10 €',
    timeline: 'Bonus déblocables après vérification KYC et 1er dépôt',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.winamax.fr/parrainage',
    reliability: 'élevée',
    recommended: true,
    referralCode: 'MAT5QL',
    offerNote: 'Bonus progressifs parrain : Noob → Rookie → Star → King → Légende → GOAT — jusqu\'à 150 € additionnels selon nombre de filleuls validés. Max 5/mois.',
    conditions: [
      'Filleul : créer un compte, vérifier identité, effectuer dépôt minimum 10 €',
      'Parrain : compte vérifié avec au moins 1 dépôt effectué',
      'Maximum 5 parrainages validés par mois calendaire',
      'Les bonus doivent être misés avant retrait',
      'Être majeur (18 ans) — vérification KYC obligatoire',
    ],
    documents: [
      'Pièce d\'identité (CNI ou passeport)',
      'Justificatif de domicile de moins de 3 mois',
      'RIB à ton nom (pour les retraits)',
    ],
    steps: [
      { num: 1, title: 'Parrain partage son code', desc: 'App Winamax → Mon compte → Parrainage → Partager mon code.', tag: 'App ou Web' },
      { num: 2, title: 'Inscription avec le code', desc: 'Saisis le code parrainage à l\'inscription. Impossible de l\'ajouter après.', tag: 'App ou Web' },
      { num: 3, title: 'Vérification d\'identité', desc: 'Upload CNI + justificatif domicile. Vérification sous 24-72h.', tag: 'Web' },
      { num: 4, title: 'Premier dépôt (min 10 €)', desc: 'Dépose minimum 10 € pour débloquer l\'offre de parrainage.', tag: 'App ou Web' },
      { num: 5, title: 'Récupère tes bonus', desc: 'Mon compte → Parrainage → Récupérer. Tu obtiens 10 € bonus + 10 € freebets.', tag: 'App ou Web' },
      { num: 6, title: 'Cumul bienvenue', desc: 'Cumulable avec le bonus bienvenue : 1er pari perdant remboursé jusqu\'à 100 € en cash.', tag: 'App ou Web' },
      { num: 7, title: 'Bonus progressifs parrain', desc: 'Plus tu parraines, plus ton statut monte : Noob → Rookie → Star → King → Légende → GOAT. Jusqu\'à 150 € supplémentaires.', tag: 'App' },
    ],
    tips: [
      'Les bonus progressifs récompensent les parrains actifs — jusqu\'à 150 € de bonus en plus',
      'Limite de 5 parrainages/mois : planifie tes parrainages sur plusieurs mois',
      'Cumulable avec l\'offre bienvenue (1er pari remboursé jusqu\'à 100 €)',
      'Les freebets expirent — note la date de validité dans Mon compte',
    ],
    warning: 'Les jeux d\'argent comportent des risques. Joue avec des montants que tu peux te permettre de perdre. 18+ uniquement.',
  },

  /* ─── PARIONS SPORT FDJ ───────────────────────────────── */
  {
    id: 'pariossport',
    name: 'Parions Sport (FDJ)',
    category: 'betting',
    emoji: '🎯',
    color: '#1d4ed8',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #3b82f6 100%)',
    bonusFilleul: '1er dépôt doublé (max 30 €)',
    bonusParrain: '30 € en crédits',
    bonusTotal: '60 €',
    highlight: 'Parrain : 30 € en crédits de jeu. Filleul : 1er dépôt doublé jusqu\'à 30 €. Offre boostée valable jusqu\'au 06/04/2026.',
    badge: 'Web & App',
    badgeColor: '#1d4ed8',
    minDeposit: 'Dépôt minimum 20 €',
    timeline: 'Crédits accordés après validation compte et 1er dépôt',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://enligne.parionssport.fdj.fr',
    reliability: 'élevée',
    offerNote: 'Offre boostée 30 € valable du 24/03 au 06/04/2026. Filleul exclu s\'il a parié en argent réel dans les 24 derniers mois. Même structure qu\'Unibet (groupe FDJ).',
    conditions: [
      'Inscription via lien parrainage obligatoire',
      'Filleul : validation du compte sous 30 jours',
      'Dépôt minimum 20 € pour déclencher l\'offre',
      'Filleul exclu s\'il a parié en argent réel sur Parions Sport dans les 24 derniers mois',
      'Maximum 5 filleuls par année civile',
      'Offre boostée à 30 € valable jusqu\'au 06/04/2026 — vérifier montant après cette date',
    ],
    documents: [
      'Pièce d\'identité valide (CNI ou passeport)',
      'Justificatif de domicile',
      'RIB pour les retraits',
    ],
    steps: [
      { num: 1, title: 'Vérifie l\'offre en cours', desc: 'L\'offre boostée à 30 € expire le 06/04/2026. Vérifier le montant sur parionssport.fdj.fr après cette date.', tag: 'Web' },
      { num: 2, title: 'Obtiens le lien parrainage', desc: 'Demande le lien à ton parrain. Inscription obligatoirement via ce lien.', tag: 'Web' },
      { num: 3, title: 'Crée ton compte', desc: 'Inscription et vérification KYC sous 30 jours.', tag: 'App ou Web' },
      { num: 4, title: 'Premier dépôt (min 20 €)', desc: 'Dépose minimum 20 €. Ton dépôt est doublé jusqu\'à 30 € en crédits.', tag: 'App ou Web' },
      { num: 5, title: 'Cumul bienvenue', desc: 'Cumulable avec l\'offre de bienvenue Parions Sport.', tag: 'App ou Web' },
    ],
    tips: [
      'Offre boostée expire le 06/04/2026 — vérifier après cette date',
      'Parions Sport fait partie du groupe FDJ, même structure qu\'Unibet',
      'Le filleul exclu s\'il a joué dans les 24 derniers mois — bien vérifier avant de s\'inscrire',
    ],
    warning: 'Offre boostée jusqu\'au 06/04/2026. Les crédits de jeu ne sont pas retirables. 18+ uniquement.',
  },

  /* ─── UNIBET ───────────────────────────────────────────── */
  {
    id: 'unibet',
    name: 'Unibet',
    category: 'betting',
    emoji: '🎰',
    color: '#e60000',
    gradient: 'linear-gradient(135deg, #8b0000 0%, #e60000 60%, #ff4444 100%)',
    bonusFilleul: '1er dépôt doublé (max 30 €)',
    bonusParrain: '30 € en crédits',
    bonusTotal: '60 €',
    highlight: 'Parrain : 30 € en crédits de jeu. Filleul : 1er dépôt doublé jusqu\'à 30 €. Offre boostée valable jusqu\'au 06/04/2026.',
    badge: 'Web & App',
    badgeColor: '#e60000',
    minDeposit: 'Dépôt minimum conseillé : 20 €',
    timeline: 'Crédits accordés après validation compte et 1er dépôt',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.unibet.fr/paris-sportifs/parrainage',
    reliability: 'élevée',
    recommended: true,
    referralUrl: 'https://www.unibet.fr/inscription/?campaign=240326&parrain=0778F4D99E1DAE61',
    offerNote: 'Offre boostée 30 € valable du 24/03 au 06/04/2026. Après cette date, vérifier le montant sur unibet.fr.',
    conditions: [
      'Filleul doit passer par le lien parrainage du parrain',
      'Compte vérifié dans les 60 jours',
      'Offre boostée à 30 € valable jusqu\'au 06/04/2026 à 23h59',
      'Maximum 5 filleuls par année civile',
      'Les crédits de jeu doivent être misés avant retrait',
      'Être majeur (18 ans) — vérification obligatoire',
    ],
    documents: [
      'Pièce d\'identité valide',
      'Justificatif de domicile',
      'RIB pour les retraits',
    ],
    steps: [
      { num: 1, title: 'Vérifie l\'offre en cours', desc: 'L\'offre boostée à 30 € expire le 06/04/2026. Vérifier le montant sur unibet.fr après cette date.', tag: 'Web' },
      { num: 2, title: 'Parrain génère son lien', desc: 'Mon compte → Parrainage → Générer un lien unique.', tag: 'Web' },
      { num: 3, title: 'Filleul crée un compte', desc: 'Clique sur le lien et crée un compte. Le parrainage doit être reconnu dès le départ.', tag: 'App ou Web' },
      { num: 4, title: 'Vérification identité (60 jours)', desc: 'Upload pièce ID + justificatif domicile. Vérification dans les 60 jours.', tag: 'Web' },
      { num: 5, title: '1er dépôt + bonus doublement', desc: 'Si tu déposes 20 €, tu reçois 20 € supplémentaires (jusqu\'à 30 € max).', tag: 'Web' },
      { num: 6, title: 'Parrain reçoit 30 € crédits', desc: 'Dès validation du filleul et dépôt effectué, le parrain reçoit 30 € en crédits.', tag: 'Web' },
      { num: 7, title: 'Cumul bienvenue', desc: 'Cumulable avec l\'offre bienvenue Unibet. Code UNIGOAL : 10 € sans dépôt.', tag: 'Web' },
    ],
    tips: [
      'L\'offre boostée à 30 € expire le 06/04/2026 — vérifier après',
      'Code UNIGOAL : 10 € sans dépôt cumulable avec le parrainage',
      'Max 5 filleuls/an — planifie tes parrainages',
      'Les crédits doivent être misés avant tout retrait',
    ],
    warning: 'Offre boostée jusqu\'au 06/04/2026 à 23h59. 18+ uniquement. Jeu responsable.',
  },

  /* ─── PMU SPORT ────────────────────────────────────────── */
  {
    id: 'pmu',
    name: 'PMU Sport',
    category: 'betting',
    emoji: '🐎',
    color: '#15803d',
    gradient: 'linear-gradient(135deg, #14532d 0%, #15803d 60%, #22c55e 100%)',
    bonusFilleul: '5 € cash',
    bonusParrain: '10 € cash',
    bonusTotal: '15 € cash',
    highlight: '100% cash — seul bookmaker avec versement intégral en argent réel. Compte crédité le jour de la création obligatoirement.',
    badge: 'Web & App',
    badgeColor: '#15803d',
    minDeposit: '5 € minimum — le jour de la création du compte',
    timeline: 'Bonus crédités sous 10 jours ouvrés après validation',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.pmu.fr/turf/static/offre-parrainage/',
    reliability: 'élevée',
    offerNote: 'SEUL bookmaker 100% cash. Max 5 filleuls/mois pour le parrain (max 50 €/mois). Le compte doit être crédité le jour même de sa création.',
    conditions: [
      'Filleul : créer et confirmer son compte PMU',
      'Créditer son compte le jour même de la création (pas le lendemain)',
      'Dépôt minimum : 5 €',
      'Parrain : max 5 filleuls par mois calendaire (max 50 €/mois)',
      'Filleul valide son compte sous 30 jours (pièces justificatives + code d\'activation)',
      'Cumulable avec bonus bienvenue : 1er pari perdant remboursé jusqu\'à 100 € en cash',
    ],
    documents: [
      'Pièce d\'identité valide (CNI ou passeport)',
      'Justificatif de domicile de moins de 3 mois',
      'RIB à ton nom',
    ],
    steps: [
      { num: 1, title: 'Obtiens le code parrainage', desc: 'Demande le code à ton parrain. Il se trouve dans Mon compte PMU → Parrainage.', tag: 'Web' },
      { num: 2, title: 'Crée ton compte PMU', desc: 'Inscris-toi sur pmu.fr avec le code parrainage. Remplis toutes les informations.', tag: 'Web' },
      { num: 3, title: 'CRUCIAL : crédite le jour même', desc: 'Tu DOIS créditer ton compte le jour même de sa création. Tout dépôt le lendemain = parrainage annulé. Dépose minimum 5 €.', tag: 'Web' },
      { num: 4, title: 'Valide ton identité sous 30 jours', desc: 'Upload pièce ID + justificatif domicile + code d\'activation. Vérification dans les 30 jours.', tag: 'Web' },
      { num: 5, title: 'Reçois 5 € cash', desc: 'Les 5 € sont crédités en argent réel sous 10 jours ouvrés. Retirables directement.', tag: 'App' },
      { num: 6, title: 'Cumul bonus bienvenue', desc: 'Cumulable avec le bonus bienvenue PMU : 1er pari perdant remboursé jusqu\'à 100 € en cash.', tag: 'App ou Web' },
    ],
    tips: [
      'SEUL bookmaker 100% cash — avantage majeur par rapport aux freebets',
      'Crédite absolument le jour J — ne remets pas au lendemain',
      'Parrain : 5 filleuls max/mois soit 50 € max en cash mensuel',
      'Le cash PMU est directement retirable sans condition de mise',
    ],
    warning: 'Le compte DOIT être crédité le jour même de sa création. Tout dépôt le lendemain entraîne l\'annulation du parrainage.',
  },

  /* ─── BETSSON ──────────────────────────────────────────── */
  {
    id: 'betsson',
    name: 'Betsson',
    category: 'betting',
    emoji: '🎱',
    color: '#ff6b00',
    gradient: 'linear-gradient(135deg, #cc5200 0%, #ff6b00 60%, #ffaa44 100%)',
    bonusFilleul: '10 € en freebets',
    bonusParrain: '10 € en freebets',
    bonusTotal: '20 € en freebets',
    highlight: '10 € en freebets pour chacun. Pas de pari obligatoire pour débloquer le bonus — un dépôt suffit.',
    badge: 'Web & App',
    badgeColor: '#ff6b00',
    minDeposit: 'Dépôt minimum 10 €',
    timeline: 'Freebets crédités après vérification et 1er dépôt',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.betsson.fr/promotions',
    reliability: 'élevée',
    recommended: true,
    offerNote: 'Pas de pari obligatoire pour débloquer le bonus — un simple dépôt suffit. Code VERIF10 : 10 € sans dépôt à l\'inscription.',
    conditions: [
      'Compte vérifié (identité + adresse) pour parrain et filleul',
      'Filleul : dépôt minimum 10 € (pas de pari obligatoire pour débloquer)',
      'Filleul doit passer par le lien de parrainage',
      'Freebets doivent être utilisés en paris avant retrait',
      'Être majeur (18 ans) — KYC obligatoire',
    ],
    documents: [
      'Pièce d\'identité (CNI, passeport)',
      'Justificatif de domicile',
    ],
    steps: [
      { num: 1, title: 'Parrain génère le lien', desc: 'Mon compte → Parrainage → Partager mon code unique.', tag: 'App ou Web' },
      { num: 2, title: 'Filleul s\'inscrit via le lien', desc: 'Crée un compte en cliquant sur le lien. Le parrainage est reconnu automatiquement.', tag: 'App ou Web' },
      { num: 3, title: 'Vérification du compte', desc: 'Upload pièce ID + justificatif domicile. Vérification en 24-48h chez Betsson.', tag: 'Web' },
      { num: 4, title: 'Premier dépôt (min 10 €)', desc: 'Dépose minimum 10 €. Pas besoin de parier — le dépôt seul débloque le bonus.', tag: 'App ou Web' },
      { num: 5, title: 'Reçois 10 € freebets', desc: 'Tes freebets sont crédités après le dépôt et la vérification.', tag: 'App ou Web' },
      { num: 6, title: 'Cumul bienvenue', desc: 'Cumulable avec le bonus bienvenue : 1er pari remboursé jusqu\'à 100 € + code VERIF10 pour 10 € sans dépôt.', tag: 'App ou Web' },
    ],
    tips: [
      'Avantage clé : pas de pari obligatoire pour débloquer le bonus parrainage',
      'Code VERIF10 : 10 € sans dépôt, cumulable avec le parrainage',
      'Vérification rapide chez Betsson — généralement 24-48h',
      'Betsson est réputé pour ses retraits faciles',
    ],
    warning: 'Les jeux d\'argent comportent des risques. Joue de manière responsable. 18+ uniquement.',
  },

  /* ─── FEELINGBET ───────────────────────────────────────── */
  {
    id: 'feelingbet',
    name: 'Feelingbet',
    category: 'betting',
    emoji: '💚',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #15803d 0%, #22c55e 100%)',
    bonusFilleul: 'Variable',
    bonusParrain: 'Variable',
    bonusTotal: 'Variable',
    highlight: 'Montants variables selon les conditions en vigueur sur le site Feelingbet. Vérifier avant toute inscription.',
    badge: 'Web & App',
    badgeColor: '#22c55e',
    minDeposit: 'Variable selon conditions',
    timeline: 'Variable selon conditions en vigueur',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.feelingbet.fr',
    reliability: 'moyenne',
    offerNote: 'Montants non précisés publiquement — à vérifier sur le site officiel Feelingbet avant inscription.',
    conditions: [
      'Conditions et montants variables selon les offres en vigueur sur le site',
      'Bookmaker agréé ANJ',
      'KYC obligatoire (pièce d\'identité + justificatif domicile + RIB)',
      'Vérifier impérativement les conditions officielles avant de s\'inscrire',
    ],
    documents: [
      'Pièce d\'identité valide (CNI ou passeport)',
      'Justificatif de domicile de moins de 3 mois',
      'RIB à ton nom',
    ],
    steps: [
      { num: 1, title: 'Vérifie les conditions sur le site', desc: 'Consulte feelingbet.fr pour les montants exacts et conditions actuels. Les offres changent régulièrement.', tag: 'Web' },
      { num: 2, title: 'Obtiens le lien parrainage', desc: 'Demande le lien ou code à ton parrain.', tag: 'Web' },
      { num: 3, title: 'Inscris-toi via le lien', desc: 'Crée ton compte en cliquant sur le lien parrainage.', tag: 'Web' },
      { num: 4, title: 'Valide ton identité', desc: 'KYC obligatoire : pièce ID + justificatif domicile.', tag: 'Web' },
    ],
    tips: [
      'Vérifier toujours les montants sur feelingbet.fr avant de s\'inscrire',
      'Feelingbet est agréé ANJ — partenaire fiable',
    ],
    warning: 'Montants variables non confirmés. Toujours vérifier les conditions sur le site officiel avant inscription. 18+ uniquement.',
  },

];

export const BANKS = PLATFORMS.filter(p => p.category === 'bank');
export const BETTING = PLATFORMS.filter(p => p.category === 'betting');
