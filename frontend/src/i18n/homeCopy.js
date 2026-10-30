import { useLanguage } from '../context/LanguageContext';

// Text for the new landing sections. English is the base; any key a language does not
// have falls back to English, so a missing translation never leaves a blank.
// Lingala (ln) is intentionally empty: add it here once a Lingala speaker has written it.

const en = {
  nav: { plans: 'Plans', events: 'Events', donate: 'Donate', login: 'Log in', signup: 'Create account', logout: 'Log out' },
  hero: {
    badge: 'Early access opens soon',
    plans: 'See plans',
    support: 'Support our mission',
    trust: ['5 languages', '4 ways to translate', 'Works offline'],
  },
  plans: {
    title: 'Unlock the full YasTalk',
    subtitle: 'Pick a plan and pay with M-Pesa. It is tied to your account, so it follows you into the app. Prices are in Kenyan shillings.',
    cta: 'Choose',
    compare: 'Compare all plans',
    per: 'per month',
  },
  events: {
    title: 'Events and meetups',
    subtitle: 'Webinars, workshops and launches. Come and talk with us.',
    all: 'See all events',
    emptyTitle: 'No events scheduled right now',
    emptyBody: 'We announce new events here first. Join the waitlist and we will email you.',
    emptyCta: 'Join the waitlist',
    details: 'Details',
  },
  donate: {
    title: 'Help every conversation find its language',
    body: 'Big translation tools still stumble on Lingala and Swahili. Your gift pays for native-speaker reviewers, servers and the next languages we add.',
    cta: 'Give now',
    pick: 'Choose an amount',
    ways: 'M-Pesa, card or crypto',
  },
  footer: {
    product: 'Product', support: 'Support', legal: 'Legal',
    app: 'The app', plans: 'Plans', events: 'Events', donate: 'Donate',
    contact: 'Contact', privacy: 'Privacy', terms: 'Terms',
    secure: 'Pay with M-Pesa, card or crypto',
  },
};

const overrides = {
  fr: {
    nav: { plans: 'Formules', events: 'Événements', donate: 'Faire un don', login: 'Connexion', signup: 'Créer un compte', logout: 'Déconnexion' },
    hero: { badge: 'Accès anticipé bientôt ouvert', plans: 'Voir les formules', support: 'Soutenir notre mission', trust: ['5 langues', '4 façons de traduire', 'Fonctionne hors ligne'] },
    plans: { title: 'Débloquez tout YasTalk', subtitle: "Choisissez une formule et payez avec M-Pesa. Elle est liée à votre compte et vous suit dans l'application. Prix en shillings kényans.", cta: 'Choisir', compare: 'Comparer toutes les formules', per: 'par mois' },
    events: { title: 'Événements et rencontres', subtitle: 'Webinaires, ateliers et lancements. Venez échanger avec nous.', all: 'Voir tous les événements', emptyTitle: 'Aucun événement prévu pour le moment', emptyBody: "Nous annonçons les nouveaux événements ici en premier. Rejoignez la liste d'attente et nous vous écrirons.", emptyCta: "Rejoindre la liste", details: 'Détails' },
    donate: { title: 'Aidez chaque conversation à trouver sa langue', body: 'Les grands outils de traduction trébuchent encore sur le lingala et le swahili. Votre don finance des relecteurs locuteurs natifs, des serveurs et les prochaines langues.', cta: 'Faire un don', pick: 'Choisissez un montant', ways: 'M-Pesa, carte ou crypto' },
    footer: { product: 'Produit', support: 'Soutien', legal: 'Légal', app: "L'application", plans: 'Formules', events: 'Événements', donate: 'Faire un don', contact: 'Contact', privacy: 'Confidentialité', terms: 'Conditions', secure: 'Payez par M-Pesa, carte ou crypto' },
  },
  sw: {
    nav: { plans: 'Mipango', events: 'Matukio', donate: 'Changia', login: 'Ingia', signup: 'Fungua akaunti', logout: 'Toka' },
    hero: { badge: 'Ufikiaji wa mapema unakuja', plans: 'Tazama mipango', support: 'Unga mkono dhamira yetu', trust: ['Lugha 5', 'Njia 4 za kutafsiri', 'Hufanya kazi bila mtandao'] },
    plans: { title: 'Fungua YasTalk kamili', subtitle: 'Chagua mpango na ulipe kwa M-Pesa. Unaunganishwa na akaunti yako, kwa hiyo unakufuata hadi kwenye programu. Bei ni kwa shilingi za Kenya.', cta: 'Chagua', compare: 'Linganisha mipango yote', per: 'kwa mwezi' },
    events: { title: 'Matukio na mikutano', subtitle: 'Warsha, mitandao ya mtandaoni na uzinduzi. Njoo tuzungumze.', all: 'Tazama matukio yote', emptyTitle: 'Hakuna tukio lililopangwa sasa', emptyBody: 'Tunatangaza matukio mapya hapa kwanza. Jiunge na orodha ya kusubiri nasi tutakutumia barua pepe.', emptyCta: 'Jiunge na orodha', details: 'Maelezo' },
    donate: { title: 'Saidia kila mazungumzo yapate lugha yake', body: 'Zana kubwa za tafsiri bado zinakwama kwenye Kilingala na Kiswahili. Mchango wako hulipia wakaguzi wazawa wa lugha, seva na lugha tutakazoongeza.', cta: 'Changia sasa', pick: 'Chagua kiasi', ways: 'M-Pesa, kadi au crypto' },
    footer: { product: 'Bidhaa', support: 'Msaada', legal: 'Kisheria', app: 'Programu', plans: 'Mipango', events: 'Matukio', donate: 'Changia', contact: 'Mawasiliano', privacy: 'Faragha', terms: 'Masharti', secure: 'Lipa kwa M-Pesa, kadi au crypto' },
  },
  ar: {
    nav: { plans: 'الخطط', events: 'الفعاليات', donate: 'تبرّع', login: 'تسجيل الدخول', signup: 'إنشاء حساب', logout: 'تسجيل الخروج' },
    hero: { badge: 'الوصول المبكر يبدأ قريباً', plans: 'عرض الخطط', support: 'ادعم رسالتنا', trust: ['5 لغات', '4 طرق للترجمة', 'يعمل دون اتصال'] },
    plans: { title: 'افتح كل ميزات YasTalk', subtitle: 'اختر خطة وادفع عبر M-Pesa. ترتبط بحسابك فتلحق بك إلى التطبيق. الأسعار بالشلن الكيني.', cta: 'اختر', compare: 'قارن كل الخطط', per: 'شهرياً' },
    events: { title: 'الفعاليات واللقاءات', subtitle: 'ندوات إلكترونية وورش عمل وإطلاقات. تعال وتحدث معنا.', all: 'عرض كل الفعاليات', emptyTitle: 'لا توجد فعاليات مجدولة حالياً', emptyBody: 'نعلن عن الفعاليات الجديدة هنا أولاً. انضم إلى قائمة الانتظار وسنراسلك.', emptyCta: 'انضم إلى القائمة', details: 'التفاصيل' },
    donate: { title: 'ساعد كل محادثة على إيجاد لغتها', body: 'أدوات الترجمة الكبرى لا تزال تتعثر في اللينغالا والسواحيلية. تبرعك يموّل مراجعين من أهل اللغة وخوادم واللغات التي سنضيفها.', cta: 'تبرّع الآن', pick: 'اختر مبلغاً', ways: 'M-Pesa أو بطاقة أو عملات رقمية' },
    footer: { product: 'المنتج', support: 'الدعم', legal: 'قانوني', app: 'التطبيق', plans: 'الخطط', events: 'الفعاليات', donate: 'تبرّع', contact: 'اتصل بنا', privacy: 'الخصوصية', terms: 'الشروط', secure: 'ادفع عبر M-Pesa أو بطاقة أو عملات رقمية' },
  },
  ln: {},
};

function merge(base, extra = {}) {
  const out = {};
  for (const key of Object.keys(base)) {
    out[key] =
      base[key] && typeof base[key] === 'object' && !Array.isArray(base[key])
        ? merge(base[key], extra[key])
        : (extra[key] ?? base[key]);
  }
  return out;
}

const COPY = { en, ...Object.fromEntries(Object.entries(overrides).map(([k, v]) => [k, merge(en, v)])) };

export function useCopy() {
  const { lang } = useLanguage();
  return COPY[lang] || COPY.en;
}
