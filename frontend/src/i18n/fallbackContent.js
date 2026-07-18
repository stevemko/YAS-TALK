// Used only if the Django API call fails (e.g. backend not running yet).
// Keeps the site fully functional and demo-able on the frontend alone.

export const fallbackLanguages = [
  { id: 1, code: 'en', name_en: 'English', native_name: 'English', flag_emoji: '🇬🇧', is_rtl: false, order: 1 },
  { id: 2, code: 'fr', name_en: 'French', native_name: 'Français', flag_emoji: '🇫🇷', is_rtl: false, order: 2 },
  { id: 3, code: 'ln', name_en: 'Lingala', native_name: 'Lingála', flag_emoji: '🇨🇩', is_rtl: false, order: 3 },
  { id: 4, code: 'sw', name_en: 'Swahili', native_name: 'Kiswahili', flag_emoji: '🇰🇪', is_rtl: false, order: 4 },
  { id: 5, code: 'ar', name_en: 'Arabic', native_name: 'العربية', flag_emoji: '🇸🇦', is_rtl: true, order: 5 },
];

export const fallbackServices = [
  { id: 1, icon: 'mic', title: 'Voice Translation', description: 'Speak naturally and hear your words carried over into any of our five languages in real time.' },
  { id: 2, icon: 'text', title: 'Text Translation', description: 'Paste or type any message and get an accurate, context-aware translation instantly.' },
  { id: 3, icon: 'chat', title: 'Live Conversation Mode', description: 'Hold a two-way conversation with someone who speaks a different language, turn by turn.' },
  { id: 4, icon: 'camera', title: 'Camera Translation', description: 'Point your camera at a sign, menu, or document and see the translation overlaid instantly.' },
  { id: 5, icon: 'offline', title: 'Offline Packs', description: 'Download a language pack before you travel and keep translating without any signal.' },
  { id: 6, icon: 'document', title: 'Document Translation', description: 'Upload a document and get a formatted translation back, ready to share.' },
];

export const fallbackTestimonials = [
  { id: 1, author_name: 'Amina K.', author_role: 'Nairobi, Kenya', language_code: 'sw', quote: 'YasTalk let me talk to my supplier in Kinshasa without either of us switching to English.' },
  { id: 2, author_name: 'Jean-Paul M.', author_role: 'Kinshasa, DRC', language_code: 'ln', quote: 'Nasepeli Lingala mpe azali koyoka na Falansé na tango moko. Ezali kokamwisa!' },
  { id: 3, author_name: 'Yousef A.', author_role: 'Cairo, Egypt', language_code: 'ar', quote: 'ترجمة فورية ودقيقة، حتى في المكالمات الصوتية. غيّرت طريقة تواصلي مع فريقي.' },
];
