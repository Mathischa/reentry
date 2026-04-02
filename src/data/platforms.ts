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
  suspended?: boolean;   // programme suspendu ou offre inexistante
  lastChecked: string;   // date de vérification sur le site officiel
  sourceUrl: string;     // lien source officiel
  reliability?: 'élevée' | 'moyenne' | 'basse';  // niveau de fiabilité de l'offre
  recommended?: boolean;  // badge recommandé sur les meilleures offres
  offerNote?: string;     // note pour expliquer des nuances (ex: offre spéciale vs standard)
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
    bonusFilleul: '10 €',
    bonusParrain: 'Variable (selon encours)',
    bonusTotal: '~20 €',
    highlight: 'Programme de parrainage actuellement suspendu pour les nouvelles ouvertures. Offre de base uniquement.',
    badge: 'Web & App',
    badgeColor: '#f59e0b',
    minDeposit: '300 € de 1er versement requis',
    timeline: 'Prime versée dans les 7 jours suivant le premier versement (au plus tard 2 mois)',
    suspended: true,
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.boursobank.com/aide-en-ligne/bons-plans-parrainage/parrainage/question/quel-est-le-montant-de-la-prime-parrainage-26885',
    conditions: [
      'BoursoBank ne propose plus actuellement d\'offre de parrainage promotionnelle pour les nouvelles ouvertures de compte',
      'L\'offre de base (10€ filleul) reste disponible mais nécessite un 1er versement minimum de 300€',
      'Ce versement doit être effectué pendant l\'ouverture ou dans les 7 jours suivants',
      'Ne pas avoir déjà eu un compte BoursoBank',
      'Le parrain doit avoir un compte actif — le montant de sa prime dépend de ses encours totaux',
      'Maximum 20 primes parrainage sur 12 mois glissants pour le parrain',
    ],
    documents: [
      'Pièce d\'identité valide (CNI recto-verso ou passeport)',
      'Justificatif de domicile de moins de 3 mois',
      'RIB d\'un autre établissement (pour le 1er versement de 300€)',
      'Numéro de téléphone mobile français',
    ],
    steps: [
      { num: 1, title: 'Vérifie si une offre est active', desc: 'IMPORTANT : BoursoBank a suspendu ses offres de parrainage boostées. Avant de t\'inscrire, vérifie sur le site officiel si une nouvelle offre est disponible. L\'offre de base (10€) reste active mais peu intéressante.', tag: 'Web' },
      { num: 2, title: 'Récupère le lien de parrainage', desc: 'Si tu veux quand même ouvrir un compte, demande le lien à ton parrain via l\'app BoursoBank → Menu → Parrainage → Partager mon lien', tag: 'App ou Web' },
      { num: 3, title: 'Ouvre le compte via le lien', desc: 'Clique sur le lien de parrainage et remplis le formulaire complet (état civil, adresse, situation pro). Uploads de CNI + justificatif domicile', tag: 'Web' },
      { num: 4, title: 'Valide ton identité', desc: 'BoursoBank peut demander une vérification vidéo ou par courrier. Réponds rapidement pour accélérer l\'ouverture.', tag: 'App ou Web' },
      { num: 5, title: 'Effectue ton 1er versement de 300€', desc: 'Vire 300€ minimum depuis une autre banque. Ce virement est OBLIGATOIRE pour déclencher le bonus de 10€. Fais-le dans les 7 jours suivant l\'ouverture.', tag: 'Web' },
      { num: 6, title: 'Reçois et active ta carte', desc: 'La carte arrive sous 5 à 10 jours. Active-la dans l\'app → Carte → Activer ma carte.', tag: 'App' },
      { num: 7, title: 'Attends la prime', desc: 'Les 10€ sont crédités dans les 7 jours suivant le versement (au plus tard dans les 2 mois). Montant décevant comparé aux anciennes offres à 80€+.', tag: 'App' },
    ],
    tips: [
      'Abonne-toi aux alertes ParrainBoost — BoursoBank relance régulièrement des offres boostées (souvent en fin d\'année)',
      'L\'offre actuelle à 10€ est peu attractive — attends une offre boostée avant d\'ouvrir',
      'La carte Welcomer est entièrement gratuite sans condition de revenus',
      'BoursoBank reste la banque en ligne n°1 en France et vaut le coup d\'ouvrir pour ses services, même sans parrainage boosté',
    ],
    warning: 'Programme de parrainage boosté SUSPENDU en avril 2026. L\'offre de base (10€) reste disponible avec un dépôt de 300€ obligatoire. Vérifie le site officiel avant de t\'inscrire.',
  },

  /* ─── FORTUNEO ────────────────────────────────────────── */
  {
    id: 'fortuneo',
    name: 'Fortuneo Banque',
    category: 'bank',
    emoji: '💚',
    color: '#00c07f',
    gradient: 'linear-gradient(135deg, #007a52 0%, #00c07f 100%)',
    bonusFilleul: '80 € à 160 €',
    bonusParrain: 'Variable (selon offre)',
    bonusTotal: 'jusqu\'à 320 €',
    highlight: '160€ avec la Gold CB — 80€ avec la Fosfo. Dépôt de 300€ requis dans les 6 jours.',
    badge: 'Web & App',
    badgeColor: '#00c07f',
    minDeposit: '300 € dans les 6 jours suivant l\'ouverture',
    timeline: 'Prime versée dans les 3 mois suivant la validation des conditions',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.fortuneo.fr/parrainage',
    conditions: [
      'Ne jamais avoir eu de compte ou contrat Fortuneo',
      'Ouvrir un compte bancaire via le lien de parrainage',
      'Effectuer un versement initial de 300€ dans les 6 jours suivant l\'ouverture',
      'La prime varie : 160€ pour Gold CB Mastercard, 80€ pour Fosfo Mastercard',
      'Le parrain doit avoir minimum 300€ d\'encours global sur ses comptes Fortuneo',
      'Maximum 10 filleuls parrainés par an pour le parrain',
      'Être résident fiscal français, majeur',
    ],
    documents: [
      'CNI ou passeport en cours de validité (recto-verso pour CNI)',
      'Justificatif de domicile de moins de 3 mois',
      'Dernier avis d\'imposition (peut être demandé pour vérification revenus)',
      'RIB d\'une autre banque (pour le versement initial de 300€)',
    ],
    steps: [
      { num: 1, title: 'Choisis ta carte : Gold (160€) ou Fosfo (80€)', desc: 'La Gold CB Mastercard rapporte 160€ mais est gratuite seulement si tes revenus sont domiciliés ou si tu fais 5+ paiements/mois (sinon 6,99€/mois). La Fosfo est entièrement gratuite sans conditions.', tag: 'App ou Web' },
      { num: 2, title: 'Obtiens le lien de parrainage', desc: 'Le lien est INDISPENSABLE. Sans lui, zéro prime. Ton parrain le trouve dans son app Fortuneo → Parrainage → Partager, ou sur son espace web.', tag: 'App ou Web' },
      { num: 3, title: 'Lance l\'inscription via le lien', desc: 'Clique sur le lien. La page d\'accueil doit afficher "Parrainage" ou un code prérempli. Ne ferme pas la page et ne repasse pas par le site sans le lien.', tag: 'Web' },
      { num: 4, title: 'Remplis le dossier complet', desc: 'Formulaire : état civil, adresse, revenus, situation professionnelle. Uploader CNI + justificatif domicile. Environ 15 minutes. Signe électroniquement via SMS.', tag: 'Web' },
      { num: 5, title: 'Effectue le versement de 300€', desc: 'CRUCIAL : vire 300€ minimum depuis une autre banque dans les 6 JOURS suivant l\'ouverture. Sans ce virement, pas de prime. Configure un virement dès l\'ouverture du compte.', tag: 'Web' },
      { num: 6, title: 'Reçois et active ta carte', desc: 'La carte arrive sous 7 à 15 jours. Active-la dans l\'app Fortuneo → Mes cartes → Activer. Fais un paiement dès que possible.', tag: 'App' },
      { num: 7, title: 'Prime créditée dans les 3 mois', desc: 'Dès validation des conditions, la prime (80€ ou 160€) est versée automatiquement sur ton compte Fortuneo.', tag: 'App' },
    ],
    tips: [
      'La Gold CB offre 160€ — prends-la si tu peux domicilier tes revenus (sinon 6,99€/mois, ce qui efface l\'avantage en quelques mois)',
      'La Fosfo (80€) est totalement gratuite et sans conditions de revenus — idéale si tu veux juste le bonus',
      'Le versement de 300€ dans les 6 jours est strict — programme un virement immédiat après l\'ouverture',
      'Fortuneo propose aussi des parrainages bourse : 80€ pour un PEA avec 1000€ de versement, 30€ pour un compte-titres',
      'Surveille les offres boostées Fortuneo (souvent en janvier/septembre) qui peuvent monter à 200€+',
    ],
    warning: 'La carte Gold CB est gratuite uniquement avec revenus domiciliés OU 5 paiements/mois. Sinon : 6,99€/mois de frais. Vérifie ta situation avant de la choisir.',
  },

  /* ─── REVOLUT ─────────────────────────────────────────── */
  {
    id: 'revolut',
    name: 'Revolut',
    category: 'bank',
    emoji: '⚡',
    color: '#191c24',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 60%, #0ea5e9 100%)',
    bonusFilleul: 'Variable (voir app)',
    bonusParrain: 'Variable (voir app)',
    bonusTotal: 'Variable',
    highlight: 'Bonus affiché directement dans l\'app au moment du partage — varie selon les campagnes en cours.',
    badge: 'App uniquement',
    badgeColor: '#7c3aed',
    minDeposit: 'Aucun dépôt minimum',
    timeline: 'Bonus versé sous 30 jours après validation des conditions',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.revolut.com/fr-FR/referral/',
    conditions: [
      'Télécharger l\'app Revolut via le lien de parrainage (pas en cherchant sur le store)',
      'Créer un compte et vérifier son identité (KYC in-app)',
      'Commander la carte physique Revolut (gratuite en Standard)',
      'Effectuer le nombre de paiements indiqué dans l\'offre (généralement 3 à 5 dans les 30 jours)',
      'Être un nouvel utilisateur Revolut (aucun compte précédent)',
      'Le montant exact du bonus est affiché dans l\'app de ton parrain au moment du partage',
    ],
    documents: [
      'Pièce d\'identité (CNI ou passeport) — photographiée directement dans l\'app',
      'Selfie pour vérification biométrique (IA, généralement instantané)',
      'Numéro de téléphone mobile valide',
    ],
    steps: [
      { num: 1, title: 'Parrain : vérifie le bonus dans l\'app', desc: 'Avant de partager, le parrain doit vérifier le montant du bonus dans l\'app : Menu → Inviter des amis → Voir le bonus. Le montant change selon les campagnes.', tag: 'App' },
      { num: 2, title: 'Partage le lien depuis l\'app', desc: 'Le parrain partage le lien depuis son app. Le filleul DOIT télécharger l\'app en cliquant sur ce lien — pas en cherchant Revolut dans le store. Sinon le parrainage ne sera pas lié.', tag: 'App' },
      { num: 3, title: 'Crée ton compte en 5 minutes', desc: 'Saisis ton numéro de téléphone, crée un code PIN, entre tes infos personnelles. L\'interface est très guidée et en français.', tag: 'App' },
      { num: 4, title: 'Vérifie ton identité (KYC instantané)', desc: 'Photographie ta CNI/passeport, puis fais un selfie. La vérification par IA est généralement validée en quelques minutes. Sinon, compte 24-48h.', tag: 'App' },
      { num: 5, title: 'Commande la carte physique', desc: 'Va dans l\'app → Cartes → Commander une carte physique. La carte Standard est gratuite (livraison 7-14 jours). SANS cette étape, pas de bonus.', tag: 'App' },
      { num: 6, title: 'Utilise la carte virtuelle immédiatement', desc: 'La carte virtuelle est disponible dès l\'inscription. Ajoute-la à Apple Pay / Google Pay pour commencer tes paiements sans attendre la carte physique.', tag: 'App' },
      { num: 7, title: 'Atteins l\'objectif de paiements', desc: 'Effectue le nombre de paiements requis (affiché dans l\'app → Récompenses). Le bonus apparaît dans Profil → Récompenses une fois les conditions remplies.', tag: 'App' },
    ],
    tips: [
      'Le bonus Revolut est très variable — il peut aller de 15€ à 50€+ selon les campagnes. Vérifie toujours avant de partager.',
      'La carte virtuelle est disponible immédiatement : utilise-la en Apple Pay / Google Pay pour tes achats en attendant la carte physique',
      'Revolut Standard est 100% gratuit — pas besoin de prendre un abonnement payant pour le bonus',
      'Excellent pour les voyages : 0% de frais de change jusqu\'à 1 000€/mois en Standard',
      'Le programme de parrainage Revolut évolue très souvent — abonne-toi aux alertes ParrainBoost',
    ],
    warning: 'Le montant du bonus Revolut n\'est pas publié officiellement et varie selon les campagnes en cours. Vérifie toujours le montant dans l\'app de ton parrain AVANT de t\'inscrire.',
  },

  /* ─── BETCLIC ─────────────────────────────────────────── */
  {
    id: 'betclic',
    name: 'Betclic',
    category: 'betting',
    emoji: '⚽',
    color: '#e8001c',
    gradient: 'linear-gradient(135deg, #9b0000 0%, #e8001c 60%, #ff4444 100%)',
    bonusFilleul: '40 € freebet',
    bonusParrain: '40 € freebet',
    bonusTotal: '80 €',
    highlight: '40€ en freebet pour le filleul et 40€ en freebet pour le parrain après 1er pari.',
    badge: 'Web & App',
    badgeColor: '#e8001c',
    minDeposit: 'Dépôt minimum 5€',
    timeline: 'Remboursement sous 72h si 1er pari perdant. Prime parrain sous 7 jours.',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.betclic.fr/parrainage',
    reliability: 'moyenne',
    offerNote: '40€ freebets en offre spéciale; 10€ en offre standard hors promotion',
    conditions: [
      'Les deux (parrain et filleul) doivent être inscrits sur Betclic Sport',
      'Créer un compte filleul via le lien de parrainage',
      'Effectuer un premier dépôt (minimum 5€)',
      'Placer un premier pari sportif (minimum 5€)',
      'Être majeur (18 ans minimum) — vérification d\'identité obligatoire',
      'Ne jamais avoir eu de compte Betclic',
      'Le parrain reçoit 40€ en freebets dès activité du filleul',
    ],
    documents: [
      'Pièce d\'identité valide (CNI ou passeport)',
      'Justificatif de domicile de moins de 3 mois',
      'RIB à ton nom (obligatoire pour retirer les gains)',
      'Parfois : selfie avec pièce d\'identité pour validation KYC',
    ],
    steps: [
      { num: 1, title: 'Parrain partage son lien', desc: 'Dans l\'app Betclic → Menu → Parrainage → Copier mon lien. Ou via le web : Mon compte → Parrainage. La case parrainage est également saisissable à l\'inscription.', tag: 'App ou Web' },
      { num: 2, title: 'Inscription filleul via le lien', desc: 'Clique sur le lien, puis "Créer un compte". Remplis : nom, prénom, date de naissance, email, adresse. La case parrainage doit être pré-remplie — vérifie-le.', tag: 'App ou Web' },
      { num: 3, title: 'Vérification d\'identité (KYC)', desc: 'Envoie ta pièce d\'identité + justificatif domicile dès l\'inscription. La vérification peut prendre 24-72h. Sans ça : impossible de retirer.', tag: 'App ou Web' },
      { num: 4, title: 'Premier dépôt (min 5€)', desc: 'Dépôt minimum 5€. Méthodes disponibles : carte bancaire (instantané), PayPal, virement. La carte bancaire est la plus rapide.', tag: 'App ou Web' },
      { num: 5, title: 'Place ton 1er pari', desc: 'Choisis un événement sportif et mise minimum 5€. Pour maximiser le remboursement potentiel, mise jusqu\'à 100€ sur une cote ≥ 1.70 (condition souvent requise).', tag: 'App ou Web' },
      { num: 6, title: 'Reçois tes 40€ freebets', desc: 'Tu reçois 40€ en freebets directement après validation de ta 1re activité (pari placé). Les freebets ont une condition de mise avant retrait — lis bien les CGU.', tag: 'App' },
      { num: 7, title: 'Prime parrain (40€ freebets)', desc: 'Ton parrain reçoit 40€ en freebets (pas des euros directs) une fois que ton pari a été validé.', tag: 'App' },
    ],
    tips: [
      'Parie sur une cote ≥ 1.70 pour mieux utiliser tes freebets',
      'Vérifie ton identité dès l\'inscription — ça peut prendre 24-48h et tu ne peux pas retirer sans ça',
      'Les freebets doivent être utilisés dans les 7 jours en général',
      'Le parrain reçoit 40€ en freebets — il doit aussi les miser avant retrait',
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
    bonusFilleul: '40 € en Freebets',
    bonusParrain: '40 € en Freebets',
    bonusTotal: '80 € en Freebets',
    highlight: '40€ en Freebets pour le filleul et 40€ en Freebets (parrain) — offre stable et fiable.',
    badge: 'Web & App',
    badgeColor: '#d97706',
    minDeposit: 'Dépôt minimum 10€',
    timeline: 'Bonus récupérable après vérification KYC et 1er dépôt. Freebets valides 7 jours.',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.winamax.fr/parrainage',
    reliability: 'élevée',
    recommended: true,
    conditions: [
      'Filleul : créer un compte, vérifier identité, effectuer dépôt minimum 10€',
      'Parrain : compte vérifié avec au moins 1 dépôt effectué',
      'Bonus parrainage : 40€ freebets pour chacun après conditions remplies',
      'Freebets valides 7 jours — doivent être joués avant retrait (mise requise)',
      'Être majeur (18 ans) — vérification KYC obligatoire',
    ],
    documents: [
      'Pièce d\'identité (CNI ou passeport)',
      'Justificatif de domicile de moins de 3 mois',
      'RIB à ton nom (pour les retraits)',
    ],
    steps: [
      { num: 1, title: 'Parrain partage son code', desc: 'App Winamax → Mon compte → Parrainage → Partager mon code. Le filleul utilise ce code lors de l\'inscription.', tag: 'App ou Web' },
      { num: 2, title: 'Inscription avec code', desc: 'Crée un compte via winamax.fr ou app en saisissant le code parrainage. Important : le code doit être saisi à l\'inscription, impossible après.', tag: 'App ou Web' },
      { num: 3, title: 'Vérification d\'identité', desc: 'Upload CNI + justificatif domicile. La vérification prend 24-72h. Les bonus sont inaccessibles tant que tu n\'es pas vérifié.', tag: 'Web' },
      { num: 4, title: 'Premier dépôt (min 10€)', desc: 'Dépose un montant minimum de 10€ pour débloquer l\'offre de parrainage.', tag: 'App ou Web' },
      { num: 5, title: 'Récupère les 40€ freebets', desc: 'Va dans Mon compte → Parrainage et clique "Récupérer". Tu obtiens 40€ en freebets.',tag: 'App ou Web' },
      { num: 6, title: 'Mise les freebets', desc: 'Utilise tes freebets dans les 7 jours sur des paris sportifs. Les freebets doivent être misés avant retrait (1x la mise minimum requis).', tag: 'App ou Web' },
      { num: 7, title: 'Parrain récupère sa part', desc: 'Identique : le parrain va dans Mon compte → Parrainage et récupère ses 40€ freebets. Il reçoit une notification dès que tu as validé.', tag: 'App' },
    ],
    tips: [
      'Les 40€ freebets sont une offre fiable et sans conditions cachées',
      'Miser sur des cotes ≥ 1.50 pour maximiser l\'utilité des freebets',
      'Les freebets expirent après 7 jours — note la date de validité',
      'Parrain et filleul doivent tous deux vérifier leur identité pour récupérer le bonus',
    ],
    warning: 'Les jeux d\'argent comportent des risques. Joue avec des montants que tu peux te permettre de perdre. 18+ uniquement.',
  },

  /* ─── UNIBET ───────────────────────────────────────────── */
  {
    id: 'unibet',
    name: 'Unibet',
    category: 'betting',
    emoji: '🎰',
    color: '#e60000',
    gradient: 'linear-gradient(135deg, #8b0000 0%, #e60000 60%, #ff4444 100%)',
    bonusFilleul: 'Jusqu\'à 30 € (doublement dépôt)',
    bonusParrain: '30 € en crédits de jeu',
    bonusTotal: '60 €',
    highlight: 'Parrain reçoit 30€ en crédits de jeu. Filleul reçoit jusqu\'à 30€ via doublement du 1er dépôt.',
    badge: 'Web & App',
    badgeColor: '#e60000',
    minDeposit: 'Dépôt minimum 15€',
    timeline: 'Bonus parrain : immédiat après vérification. Bonus filleul : après 1er dépôt et conditions remplies.',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.unibet.fr/promotions/parrainage',
    reliability: 'élevée',
    recommended: true,
    offerNote: 'Offre publique annoncée jusqu\'au 6 avril 2026 — conditions et montants peuvent changer.',
    conditions: [
      'Filleul doit passer par le lien parrainage du parrain',
      'Dépôt minimum 15€ requis pour valider l\'offre',
      'Compte vérifié et légal sous 60 jours',
      'Parrain : compte confirmé avec au moins 1 dépôt effectué',
      'Limite de parrainage : 5 filleuls par an',
      'Bonus crédits de jeu : doivent être mis en paris avant retrait',
      'Être majeur (18 ans) — vérification obligatoire',
    ],
    documents: [
      'Pièce d\'identité valide',
      'Justificatif de domicile',
      'RIB pour les retraits',
    ],
    steps: [
      { num: 1, title: 'Parrain génère son lien', desc: 'Mon compte → Parrainage → Générer un lien unique. Partage ce lien avec tes amis.', tag: 'Web' },
      { num: 2, title: 'Filleul crée un compte', desc: 'Clique sur le lien unique du parrain et crée un compte Unibet en cliquant directement — le parrainage doit être reconnu dès le départ.', tag: 'App ou Web' },
      { num: 3, title: 'Vérification identité', desc: 'Upload les documents (pièce ID + justificatif domicile). Vérification dans les 60 jours — si tu veux bénéficier du bonus rapidement, accélère ce processus.', tag: 'Web' },
      { num: 4, title: 'Premier dépôt (min 15€)', desc: 'Fais un dépôt minimum de 15€. Le bonus doublement s\'applique directement : si tu déposes 15€, tu reçois 15€ supplémentaires (jusqu\'à 30€ max sur le dépôt).', tag: 'Web' },
      { num: 5, title: 'Reçois le bonus filleul', desc: 'Le bonus doublement (jusqu\'à 30€) est crédité automatiquement après le dépôt.', tag: 'Web' },
      { num: 6, title: 'Parrain reçoit 30€ crédits', desc: 'Dès que le filleul a déposé et son compte est validé, le parrain reçoit 30€ en crédits de jeu dans Mon compte → Bonus.', tag: 'Web' },
      { num: 7, title: 'Mise les bonus et parity', desc: 'Les crédits de jeu et le bonus doublement doivent être misés en paris avant retrait (conditions de mise s\'appliquent).', tag: 'Web' },
    ],
    tips: [
      'Limite 5 filleuls/an par parrain — optimise tes parrainages',
      'L\'offre est annoncée jusqu\'au 6 avril 2026 — les montants peuvent changer après',
      'La vérification d\'identité peut prendre jusqu\'à 60 jours — plus elle est rapide, plus tôt tu accéderas au bonus',
      'Le bonus doublement dépend du montant du dépôt (max 30€)',
    ],
    warning: 'Les jeux d\'argent comportent des risques. Joue avec responsabilité. 18+ uniquement.',
  },

  /* ─── BETSSON ──────────────────────────────────────────── */
  {
    id: 'betsson',
    name: 'Betsson',
    category: 'betting',
    emoji: '⚡',
    color: '#ff6b00',
    gradient: 'linear-gradient(135deg, #cc5200 0%, #ff6b00 60%, #ffaa44 100%)',
    bonusFilleul: '10 € en BetBoost',
    bonusParrain: '10 € en BetBoost',
    bonusTotal: '20 € en BetBoost',
    highlight: '10€ en BetBoost pour chacun après validation du compte et 1er dépôt de 10€ minimum.',
    badge: 'Web & App',
    badgeColor: '#ff6b00',
    minDeposit: 'Dépôt minimum 10€',
    timeline: 'Bonus BetBoost : accessible après vérification et 1er dépôt. Validité : selon conditions Betsson.',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.betsson.fr/promotions',
    reliability: 'élevée',
    recommended: true,
    conditions: [
      'Compte vérifié (identité + adresse) pour parrain et filleul',
      'Dépôt minimum 10€ obligatoire pour les deux',
      'Filleul doit passer par le lien de parrainage',
      'BetBoost doit être utilisé en paris avant retrait',
      'Être majeur (18 ans) — KYC obligatoire',
    ],
    documents: [
      'Pièce d\'identité (CNI, passeport)',
      'Justificatif de domicile',
    ],
    steps: [
      { num: 1, title: 'Parrain génère le lien', desc: 'Mon compte → Parrainage → Partager mon code unique ou lien affilié. Communique-le à tes amis.', tag: 'App ou Web' },
      { num: 2, title: 'Filleul s\'inscrit via le lien', desc: 'Clique sur le lien du parrain et crée un compte. Le parrainage doit être reconnu dès l\'inscription.', tag: 'App ou Web' },
      { num: 3, title: 'Vérification du compte', desc: 'Upload pièce ID + justificatif domicile. Vérification généralement rapide (24-48h chez Betsson).', tag: 'Web' },
      { num: 4, title: 'Premier dépôt (min 10€)', desc: 'Dépose minimum 10€ pour débloquer l\'offre de parrainage.', tag: 'App ou Web' },
      { num: 5, title: 'Reçois 10€ BetBoost', desc: 'Tu reçois 10€ en BetBoost — crédit de jeu à utiliser en paris sportifs.', tag: 'App ou Web' },
      { num: 6, title: 'Parrain reçoit 10€ BetBoost', desc: 'Le parrain reçoit également 10€ en BetBoost dès que ton compte est validé.', tag: 'App ou Web' },
      { num: 7, title: 'Mise et retrait', desc: 'Les BetBoosts doivent être misés en paris avant retrait (conditions de mise s\'appliquent).', tag: 'App ou Web' },
    ],
    tips: [
      '10€ BetBoost : montant modéré mais fiable et sans conditions complexes',
      'Vérification rapide chez Betsson — généralement en 24-48h',
      'Betsson est réputé pour ses retraits faciles — pas de problème particulier connu',
      'Cote minimum généralement requise pour les mises : vérifier sur ton compte',
    ],
    warning: 'Les jeux d\'argent comportent des risques. Joue de manière responsable. 18+ uniquement.',
  },

  /* ─── VBET ────────────────────────────────────────────── */
  {
    id: 'vbet',
    name: 'VBET',
    category: 'betting',
    emoji: '💎',
    color: '#6f3db2',
    gradient: 'linear-gradient(135deg, #4c2a6b 0%, #6f3db2 60%, #9966dd 100%)',
    bonusFilleul: 'Jusqu\'à 75 €',
    bonusParrain: 'Détails à confirmer',
    bonusTotal: 'Jusqu\'à 75 € (total variable)',
    highlight: 'VBET annonce un bonus jusqu\'à 75€ pour le parrainage. Répartition exacte à vérifier auprès du bookmaker.',
    badge: 'Web & App',
    badgeColor: '#6f3db2',
    minDeposit: 'Minimum variable',
    timeline: 'À confirmer sur le site de VBET',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.vbet.fr',
    reliability: 'moyenne',
    offerNote: 'ℹ️ Montant up to 75€ annoncé, mais répartition parrain/filleul non clairement documentée publiquement. Détails à confirmer directement auprès de VBET avant de s\'inscrire.',
    conditions: [
      'Montant jusqu\'à 75€ — répartition exacte à vérifier auprès de VBET',
      'Conditions détaillées non assez fiables en sources publiques',
      'Recommandation : contacter le support VBET pour clarifier',
    ],
    documents: [],
    steps: [
      { num: 1, title: 'Consultant VBET', desc: 'Visite vbet.fr et cherche la section "Parrainage" ou "Affiliés". Les conditions changent régulièrement.', tag: 'Web' },
      { num: 2, title: 'Vérifie les détails', desc: 'Les montants, conditions, et répartition parrain/filleul peuvent varier. Contact le support pour confirmation avant de t\'engager.', tag: 'Web' },
    ],
    tips: [
      'VBET change ses offres régulièrement — ne fais pas confiance à une source datée',
      'Si tu envisages VBET, contacte le support pour avoir les termes exacts avant inscription',
      'Vérife les reviews récentes sur les forums de parrainage pour des informations à jour',
    ],
    warning: 'VBET : offre très variable et peu documentée publiquement. À confirmer auprès du bookmaker.',
  },
];

export const BANKS = PLATFORMS.filter(p => p.category === 'bank');
export const BETTING = PLATFORMS.filter(p => p.category === 'betting');
