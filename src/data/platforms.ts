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
  color: string;        // brand hex
  gradient: string;     // CSS gradient
  bonusFilleul: string; // new user gets
  bonusParrain: string; // referrer gets
  bonusTotal: string;
  highlight: string;    // 1-line pitch
  badge: string;        // "App uniquement" | "Web & App"
  badgeColor: string;
  minDeposit: string;
  timeline: string;
  conditions: string[];
  documents: string[];
  steps: Step[];
  tips: string[];
  warning?: string;
};

export const PLATFORMS: Platform[] = [
  /* ─── BOURSORAMA ──────────────────────────────────────── */
  {
    id: 'boursorama',
    name: 'Boursorama Banque',
    category: 'bank',
    emoji: '🏦',
    color: '#00b4d8',
    gradient: 'linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)',
    bonusFilleul: '80 €',
    bonusParrain: 'jusqu\'à 130 €',
    bonusTotal: '210 €',
    highlight: 'La banque en ligne n°1 en France — prime versée sans dépôt obligatoire',
    badge: 'Web & App',
    badgeColor: '#00b4d8',
    minDeposit: 'Aucun dépôt minimum',
    timeline: 'Prime versée sous 2 à 3 mois après validation',
    conditions: [
      'Ouvrir un compte courant Boursorama (Welcomer, Ultim ou Metal)',
      'Commander et activer ta carte bancaire',
      'Effectuer au moins 3 paiements par carte dans les 3 premiers mois',
      'Le parrain doit être client depuis au moins 3 mois avec un compte actif',
    ],
    documents: [
      'Pièce d\'identité valide (CNI recto-verso ou passeport)',
      'Justificatif de domicile de moins de 3 mois (facture EDF, quittance de loyer...)',
      'RIB d\'un autre établissement bancaire (pour premier virement)',
      'Numéro de téléphone mobile français',
    ],
    steps: [
      { num: 1, title: 'Récupère le lien de parrainage', desc: 'Demande le lien unique à ton parrain, ou utilise un code parrain trouvé sur ce site. Le lien ressemble à boursorama.com/parrainage/XXXXXXXX', tag: 'App ou Web' },
      { num: 2, title: 'Clique sur le lien et ouvre le compte', desc: 'Va sur le lien de parrainage (ne passe pas directement par le site Boursorama sans le lien, sinon le parrainage ne sera pas comptabilisé !)', tag: 'Web' },
      { num: 3, title: 'Remplis le formulaire d\'inscription', desc: 'Saisis tes infos personnelles, choisis ton type de compte (Welcomer gratuit ou Ultim), et charge tes documents justificatifs (CNI + justif domicile)', tag: 'Web' },
      { num: 4, title: 'Valide ton identité', desc: 'Boursorama peut demander une vérification par vidéo ou par courrier. Réponds rapidement pour accélérer l\'ouverture du compte', tag: 'App ou Web' },
      { num: 5, title: 'Reçois et active ta carte', desc: 'La carte arrive sous 5 à 10 jours ouvrés. Active-la depuis l\'app → Carte → Activer ma carte', tag: 'App' },
      { num: 6, title: 'Fais tes 3 paiements', desc: 'Utilise ta carte pour au moins 3 achats (même 1€ en supermarché). Évite les paiements sans contact désactivés', tag: 'App ou Web' },
      { num: 7, title: 'Attends et encaisse', desc: 'La prime de 80€ arrive automatiquement sur ton compte Boursorama sous 2 à 3 mois. Tu recevras un email de confirmation', tag: 'App' },
    ],
    tips: [
      'Utilise la carte pour les courses quotidiennes pour vite atteindre 3 paiements',
      'L\'offre Welcomer est gratuite sans condition de revenus — idéale pour commencer',
      'Active les notifications push pour suivre l\'avancement de ta prime',
      'Si l\'offre Metal est disponible, elle donne droit à plus d\'avantages (assurances, cashback)',
    ],
  },

  /* ─── FORTUNEO ────────────────────────────────────────── */
  {
    id: 'fortuneo',
    name: 'Fortuneo Banque',
    category: 'bank',
    emoji: '💚',
    color: '#00c07f',
    gradient: 'linear-gradient(135deg, #007a52 0%, #00c07f 100%)',
    bonusFilleul: '80 €',
    bonusParrain: 'jusqu\'à 120 €',
    bonusTotal: '200 €',
    highlight: 'Offres boostées régulières + parfois des actions en bourse offertes',
    badge: 'Web & App',
    badgeColor: '#00c07f',
    minDeposit: 'Aucun dépôt minimum obligatoire',
    timeline: 'Prime versée sous 3 mois après le 1er paiement',
    conditions: [
      'Ouvrir un compte courant Fortuneo via le lien de parrainage',
      'Commander la carte Mastercard Gold (gratuite sous conditions de revenus)',
      'Effectuer au moins 1 paiement par carte dans les 3 premiers mois',
      'Ne pas avoir eu de compte Fortuneo dans les 12 derniers mois',
    ],
    documents: [
      'CNI ou passeport en cours de validité (recto-verso pour la CNI)',
      'Justificatif de domicile de moins de 3 mois',
      'Dernier avis d\'imposition (pour vérification revenus)',
      'RIB d\'une autre banque (recommandé pour le premier virement)',
    ],
    steps: [
      { num: 1, title: 'Obtiens le lien de parrainage', desc: 'Le lien unique de ton parrain est INDISPENSABLE. Sans lui, tu n\'obtiens pas la prime. Il ressemble à fortuneo.fr/parrainage?code=XXXXX', tag: 'App ou Web' },
      { num: 2, title: 'Lance l\'inscription via le lien', desc: 'Clique sur le lien, tu arrives sur la page Fortuneo avec la mention "Parrainage" visible. Ne ferme pas la page ni ne te reconnecte séparément', tag: 'Web' },
      { num: 3, title: 'Remplis le dossier en ligne', desc: 'Formulaire complet : état civil, adresse, situation professionnelle, revenus. Charge tes documents. Le processus prend environ 15 minutes', tag: 'Web' },
      { num: 4, title: 'Vérification et signature électronique', desc: 'Fortuneo envoie un code SMS pour la signature électronique du contrat. Vérifie tes spams si tu ne reçois rien sous 10 min', tag: 'Web' },
      { num: 5, title: 'Réception de la carte', desc: 'La carte Mastercard Gold arrive sous 7 à 15 jours. Elle est gratuite si tu as au moins 1 800 €/mois de revenus (sinon 6,99€/mois)', tag: 'App' },
      { num: 6, title: 'Premier paiement', desc: 'Fais un achat avec ta carte dès réception. N\'oublie pas d\'activer la carte depuis l\'app Fortuneo → Mes cartes → Activer', tag: 'App' },
      { num: 7, title: 'Prime créditée', desc: 'Les 80€ sont versés sur ton compte Fortuneo dans les 3 mois. Ton parrain reçoit également sa prime en parallèle', tag: 'App' },
    ],
    tips: [
      'Surveille les offres boostées de Fortuneo (souvent en début d\'année ou en automne) où le bonus filleul peut monter à 150€+',
      'La Mastercard Gold inclut des assurances voyage très utiles (annulation, bagages...)',
      'Ton parrain reçoit sa prime seulement après ton 1er paiement — tiens-le au courant',
      'L\'app Fortuneo est bien notée et le service client réactif par chat',
    ],
    warning: 'La carte est gratuite uniquement avec 1 800€/mois de revenus domiciliés (ou 5 paiements/mois). Vérifie bien avant d\'ouvrir.',
  },

  /* ─── REVOLUT ─────────────────────────────────────────── */
  {
    id: 'revolut',
    name: 'Revolut',
    category: 'bank',
    emoji: '⚡',
    color: '#191c24',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 60%, #0ea5e9 100%)',
    bonusFilleul: 'jusqu\'à 50 €',
    bonusParrain: 'jusqu\'à 40 €',
    bonusTotal: 'jusqu\'à 90 €',
    highlight: 'Inscription ultra-rapide en 5 min, 100% sur app — idéal comme 2e compte',
    badge: 'App uniquement',
    badgeColor: '#7c3aed',
    minDeposit: 'Aucun dépôt minimum',
    timeline: 'Bonus versé sous 30 jours après validation des conditions',
    conditions: [
      'Télécharger l\'app Revolut et créer un compte via le lien de parrainage',
      'Commander la carte physique Revolut (gratuite en standard)',
      'Effectuer entre 3 et 5 paiements dans les 30 jours selon l\'offre en cours',
      'Être un nouvel utilisateur Revolut (jamais eu de compte)',
    ],
    documents: [
      'Pièce d\'identité (CNI ou passeport) — scannée directement dans l\'app',
      'Selfie avec l\'identité (vérification automatique par IA en quelques minutes)',
      'Numéro de téléphone mobile valide',
    ],
    steps: [
      { num: 1, title: 'Obtiens le lien de parrainage', desc: 'Le parrain partage son lien depuis l\'app : Menu → Inviter des amis → Partager. Le lien ouvre directement l\'app store', tag: 'App' },
      { num: 2, title: 'Télécharge l\'app via le lien', desc: 'CRUCIAL : télécharge l\'app en cliquant sur le lien de parrainage, pas en cherchant "Revolut" sur le store. Sinon le parrainage ne sera pas lié.', tag: 'App' },
      { num: 3, title: 'Crée ton compte en 5 minutes', desc: 'Saisis ton numéro de téléphone, crée un code PIN, et entre tes infos personnelles. L\'interface est très guidée', tag: 'App' },
      { num: 4, title: 'Vérifie ton identité (KYC)', desc: 'L\'app te demande de prendre en photo ta CNI/passeport, puis de faire un selfie. La vérification est généralement instantanée (IA)', tag: 'App' },
      { num: 5, title: 'Commande ta carte physique', desc: 'Va dans l\'app → Cartes → Commander une carte physique. La carte standard est gratuite (délai : 7-14 jours). Sans cette étape, pas de bonus !', tag: 'App' },
      { num: 6, title: 'Fais tes paiements', desc: 'Effectue les paiements requis (généralement 3-5 selon l\'offre). Tu peux commencer avec la carte virtuelle immédiatement disponible dans l\'app', tag: 'App' },
      { num: 7, title: 'Reçois le bonus', desc: 'Le bonus s\'affiche dans l\'app sous forme de cashback ou de monnaie ajoutée. Vérifie dans Profil → Récompenses', tag: 'App' },
    ],
    tips: [
      'La carte virtuelle est disponible immédiatement — tu peux l\'ajouter à Apple Pay/Google Pay et faire tes paiements tout de suite',
      'Revolut Standard est entièrement gratuit — pas besoin de prendre un abonnement Premium',
      'Le programme de parrainage Revolut change très fréquemment : vérifie toujours le montant du bonus dans l\'app avant de parrainer',
      'Utilise Revolut pour tes achats en devises étrangères — 0% de frais de change jusqu\'à 1 000€/mois en standard',
    ],
    warning: 'Le montant du bonus Revolut varie selon les périodes et les pays. Le parrain voit le bonus exact dans son app au moment du partage du lien.',
  },

  /* ─── BETCLIC ─────────────────────────────────────────── */
  {
    id: 'betclic',
    name: 'Betclic',
    category: 'betting',
    emoji: '⚽',
    color: '#e8001c',
    gradient: 'linear-gradient(135deg, #9b0000 0%, #e8001c 60%, #ff4444 100%)',
    bonusFilleul: '100 € remboursés',
    bonusParrain: '30 € par ami',
    bonusTotal: '130 €',
    highlight: '1er pari perdant remboursé jusqu\'à 100€ — + 30€ offerts par ami parrainé',
    badge: 'Web & App',
    badgeColor: '#e8001c',
    minDeposit: 'Dépôt minimum 5€',
    timeline: 'Remboursement sous 72h si 1er pari perdu. Prime parrain sous 7 jours',
    conditions: [
      'Créer un compte Betclic via le lien de parrainage',
      'Effectuer un premier dépôt (minimum 5€)',
      'Placer un premier pari sportif (minimum 5€)',
      'Être majeur (18 ans minimum) — vérification d\'identité obligatoire',
      'Ne jamais avoir eu de compte Betclic',
    ],
    documents: [
      'Pièce d\'identité valide (CNI ou passeport)',
      'Justificatif de domicile de moins de 3 mois',
      'RIB à ton nom (obligatoire pour retirer tes gains)',
      'Parfois : selfie avec pièce d\'identité pour validation KYC',
    ],
    steps: [
      { num: 1, title: 'Récupère le lien de parrainage', desc: 'Depuis l\'app Betclic de ton parrain : Menu → Parrainage → Copier mon lien. Ou via le web : Mon compte → Parrainage', tag: 'App ou Web' },
      { num: 2, title: 'Crée ton compte', desc: 'Clique sur le lien, puis sur "Créer un compte". Remplis tes infos : nom, prénom, date de naissance, email, adresse. La case parrainage doit être pré-remplie', tag: 'App ou Web' },
      { num: 3, title: 'Vérifie ton identité (KYC)', desc: 'Envoie ta pièce d\'identité + justif domicile. IMPORTANT : sans vérification validée, tu ne pourras pas retirer tes gains. Envoie dès l\'inscription pour gagner du temps', tag: 'App ou Web' },
      { num: 4, title: 'Fais ton premier dépôt', desc: 'Dépôt minimum 5€. Méthodes : carte bancaire, PayPal, virement. Le dépôt par carte est instantané', tag: 'App ou Web' },
      { num: 5, title: 'Place ton 1er pari', desc: 'Choisis n\'importe quel sport, match ou événement. Mise minimum 5€. Pour maximiser le remboursement potentiel, mise jusqu\'à 100€ sur une cote ≥ 1.70', tag: 'App ou Web' },
      { num: 6, title: 'Remboursement si pari perdu', desc: 'Si tu perds, Betclic rembourse en Freebets sous 72h (jusqu\'à 100€). Les freebets ont souvent une condition de x1 mise avant retrait', tag: 'App' },
      { num: 7, title: 'Prime parrain créditée', desc: 'Ton parrain reçoit 30€ en cash (pas des freebets !) sur son compte Betclic dès que ton 1er pari est validé', tag: 'App' },
    ],
    tips: [
      'Parie sur une cote ≥ 1.70 pour maximiser l\'utilité du remboursement (condition souvent exigée par Betclic)',
      'Vérifie ton identité dès l\'inscription — ça peut prendre 24-48h et tu ne peux pas retirer sans ça',
      'Les freebets du remboursement doivent être utilisés dans les 7 jours en général',
      'L\'app Betclic est très bien faite avec le streaming de nombreux matches en direct',
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
    bonusFilleul: 'jusqu\'à 500 €',
    bonusParrain: 'jusqu\'à 100 €',
    bonusTotal: 'jusqu\'à 600 €',
    highlight: 'Bonus jusqu\'à 500€ en paris sportifs + bonus poker séparé — parrain généreusement récompensé',
    badge: 'Web & App',
    badgeColor: '#d97706',
    minDeposit: 'Dépôt minimum 1€',
    timeline: 'Bonus débloqué progressivement selon l\'activité (7 à 30 jours)',
    conditions: [
      'Créer un compte Winamax via le lien de parrainage',
      'Valider son identité (KYC obligatoire avant tout retrait)',
      'Effectuer un premier dépôt',
      'Placer des paris sportifs ou jouer au poker selon l\'offre choisie',
      'Être majeur (18 ans) — vérification stricte',
    ],
    documents: [
      'Pièce d\'identité (CNI ou passeport) — scannée dans l\'app ou uploadée sur le web',
      'Justificatif de domicile de moins de 3 mois',
      'Selfie tenant ta pièce d\'identité (souvent demandé)',
      'RIB à ton nom (indispensable pour les retraits)',
    ],
    steps: [
      { num: 1, title: 'Lien de parrainage depuis l\'app', desc: 'Dans l\'app Winamax → Mon compte → Parrainage → Partager mon code. Le filleul peut aussi saisir le code manuellement à l\'inscription', tag: 'App ou Web' },
      { num: 2, title: 'Inscription sur Winamax', desc: 'Va sur winamax.fr ou l\'app, clique sur "Créer un compte". Remplis le formulaire (infos personnelles, email, mot de passe). La case code parrainage est à remplir ici !', tag: 'App ou Web' },
      { num: 3, title: 'Vérification KYC', desc: 'Upload ta CNI (recto/verso) + justif domicile + selfie. La vérification peut prendre 24-72h. Sans ça : pas de retrait possible', tag: 'Web' },
      { num: 4, title: 'Premier dépôt', desc: 'Minimum 1€ pour activer le compte. Pour maximiser le bonus, dépose jusqu\'à 500€ (le bonus est souvent proportionnel au dépôt)', tag: 'App ou Web' },
      { num: 5, title: 'Paris sportifs — débloque ton bonus', desc: 'Mise les montants requis en paris sportifs. Le bonus est libéré progressivement (par tranches) selon ton volume de mises. Privilégie les cotes ≥ 1.50', tag: 'App ou Web' },
      { num: 6, title: 'Option Poker', desc: 'Si tu choisis le bonus poker, télécharge le logiciel Winamax (PC/Mac) ou joue depuis l\'app mobile. Le bonus poker est libéré en "points" selon tes parties', tag: 'App' },
      { num: 7, title: 'Prime parrain reçue', desc: 'Ton parrain reçoit sa prime (en cash ou freebets) une fois que tu as atteint le seuil d\'activité requis. Il est notifié par l\'app', tag: 'App' },
    ],
    tips: [
      'Choisis entre bonus paris sportifs OU poker — ils ne se cumulent pas, prends celui pour lequel tu as le plus d\'appétit',
      'Le bonus Winamax est dit "rollover" : tu dois le jouer X fois avant de pouvoir retirer — lis bien les conditions',
      'Winamax propose souvent des tournois satellites poker avec des tickets gratuits pour débutants',
      'Le service client Winamax est réactif par chat et très bien noté',
    ],
    warning: 'Les jeux d\'argent comportent des risques. Joue avec des montants que tu peux te permettre de perdre. 18+ uniquement. Numéro d\'aide : 09 74 75 13 13.',
  },
];

export const BANKS = PLATFORMS.filter(p => p.category === 'bank');
export const BETTING = PLATFORMS.filter(p => p.category === 'betting');
