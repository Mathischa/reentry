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
    bonusFilleul: '20 € (parrainage) + offre bienvenue',
    bonusParrain: '20 € par ami (max 5/mois)',
    bonusTotal: '40 € parrainage + jusqu\'à 350€ bienvenue',
    highlight: 'Parrainage : 20€ chacun (10€ bonus + 10€ freebets). En plus : 100€ remboursés sur 1er pari OU 250€ bonus poker.',
    badge: 'Web & App',
    badgeColor: '#d97706',
    minDeposit: 'Dépôt minimum 10€',
    timeline: 'Bonus parrainage récupérable après vérification KYC. Bonus bienvenue : 30 jours pour le 1er pari sportif.',
    lastChecked: 'Avril 2026',
    sourceUrl: 'https://www.winamax.fr/parrainage',
    conditions: [
      'Parrainage — filleul reçoit : 10€ bonus + 10€ freebets (à récupérer dans Mon compte → Parrainage)',
      'Parrainage — parrain reçoit : 10€ bonus + 10€ freebets par filleul (max 5 parrainages/mois)',
      'Filleul doit créer un compte, vérifier son identité et effectuer un 1er dépôt minimum 10€',
      'Bonus bienvenue (séparé) : 1er pari perdant remboursé jusqu\'à 100€ (paris sportifs)',
      'Bonus bienvenue poker (séparé) : jusqu\'à 250€ sur 1er dépôt, libéré en 10% selon les Miles',
      'Les bonus doivent être misés en paris sportifs ou joués au poker avant retrait',
      'Être majeur (18 ans) — vérification KYC obligatoire',
    ],
    documents: [
      'Pièce d\'identité (CNI ou passeport) — uploadée sur le site ou l\'app',
      'Justificatif de domicile de moins de 3 mois',
      'Selfie tenant ta pièce d\'identité (souvent demandé)',
      'RIB à ton nom (indispensable pour les retraits)',
    ],
    steps: [
      { num: 1, title: 'Parrain partage son code', desc: 'Dans l\'app Winamax → Mon compte → Parrainage → Partager mon code. Le filleul peut aussi saisir le code manuellement lors de l\'inscription.', tag: 'App ou Web' },
      { num: 2, title: 'Inscription avec le code parrainage', desc: 'Va sur winamax.fr ou l\'app → "Créer un compte". Remplis le formulaire et saisis le code parrainage dans le champ dédié. IMPORTANT : ce champ doit être rempli lors de l\'inscription, impossible après.', tag: 'App ou Web' },
      { num: 3, title: 'Vérification KYC', desc: 'Uploade CNI (recto/verso) + justificatif domicile + selfie. La vérification peut prendre 24-72h. Les bonus parrainage ne sont récupérables qu\'après la validation KYC.', tag: 'Web' },
      { num: 4, title: 'Premier dépôt (min 10€)', desc: 'Dépose minimum 10€. Pour maximiser le bonus bienvenue poker (jusqu\'à 250€), dépose davantage — le bonus est proportionnel au dépôt.', tag: 'App ou Web' },
      { num: 5, title: 'Récupère le bonus parrainage', desc: 'Va dans Mon compte → Parrainage et clique sur "Récupérer". Tu obtiens 10€ bonus + 10€ freebets. Conditions : tes comptes doivent être vérifiés.', tag: 'App ou Web' },
      { num: 6, title: 'Choisis bienvenue : paris ou poker', desc: 'Paris sportifs : place ton 1er pari (si perdant → remboursé jusqu\'à 100€ en cash). Poker : joue pour accumuler des Miles et débloquer progressivement le bonus (250€ max sur 3 mois).', tag: 'App ou Web' },
      { num: 7, title: 'Parrain récupère sa prime', desc: 'Le parrain va dans Mon compte → Parrainage pour récupérer ses 10€ bonus + 10€ freebets. Il reçoit une notification dès que le filleul a déposé.', tag: 'App' },
    ],
    tips: [
      'Distingue bien le bonus parrainage (20€ pour chacun) de l\'offre de bienvenue (100€ ou 250€) — ils se cumulent !',
      'Le bonus bienvenue paris : mise sur des cotes ≥ 1.50 pour que le remboursement soit intéressant',
      'Le bonus poker se débloque progressivement via les Miles — continue à jouer régulièrement pendant 3 mois',
      'Le parrain est limité à 5 parrainages/mois — au-delà, pas de bonus supplémentaire (mais le filleul en bénéficie quand même)',
      'Les bonus doivent être joués avant de pouvoir être retirés — lis bien les conditions de mise (rollover)',
    ],
    warning: 'Les jeux d\'argent comportent des risques. Joue avec des montants que tu peux te permettre de perdre. 18+ uniquement. Aide : 09 74 75 13 13.',
  },
];

export const BANKS = PLATFORMS.filter(p => p.category === 'bank');
export const BETTING = PLATFORMS.filter(p => p.category === 'betting');
