export type Language = 'zh-CN' | 'zh-TW' | 'en' | 'ru' | 'ar' | 'ko';

export const languages = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文', 
  'en': 'English',
  'ru': 'Русский',
  'ar': 'العربية',
  'ko': '한국어'
} as const;

// 定義所有語言的翻譯鍵類型
type TranslationKeys = {
  title: string;
  originalUrl: string;
  clientType: string;
  externalConfig: string;
  backendUrl: string;
  includeKeywords: string;
  excludeKeywords: string;
  // ... 其他翻譯鍵
};

export const translations: Record<Language, TranslationKeys> = {
  'zh-CN': {
    title: 'ESL订阅转换',
    originalUrl: '原订阅链接:',
    clientType: '客户端类型:',
    externalConfig: '外部配置:',
    backendUrl: '后端地址:',
    includeKeywords: '包含关键字:',
    excludeKeywords: '排除关键字:',
  },
  'zh-TW': {
    title: 'ESL訂閱轉換',
    originalUrl: '原訂閱連結:',
    clientType: '客戶端類型:',
    externalConfig: '外部配置:',
    backendUrl: '後端地址:',
    includeKeywords: '包含關鍵字:',
    excludeKeywords: '排除關鍵字:',
  },
  'en': {
    title: 'ESL Subscription Converter',
    originalUrl: 'Original Subscription URL:',
    clientType: 'Client Type:',
    externalConfig: 'External Config:',
    backendUrl: 'Backend URL:',
    includeKeywords: 'Include Keywords:',
    excludeKeywords: 'Exclude Keywords:',
  },
  'ru': {
    title: 'Конвертер подписок ESL',
    originalUrl: 'Исходная ссылка на подписку:',
    clientType: 'Тип клиента:',
    externalConfig: 'Внешняя конфигурация:',
    backendUrl: 'URL бэкенда:',
    includeKeywords: 'Включить ключевые слова:',
    excludeKeywords: 'Исключить ключевые слова:',
  },
  'ar': {
    title: 'محول اشتراك ESL',
    originalUrl: 'رابط الاشتراك الأصلي:',
    clientType: 'نوع العميل:',
    externalConfig: 'التكوين الخارجي:',
    backendUrl: 'عنوان الخادم الخلفي:',
    includeKeywords: 'تضمين الكلمات الرئيسية:',
    excludeKeywords: 'استبعاد الكلمات الرئيسية:',
  },
  'ko': {
    title: 'ESL 구독 변환기',
    originalUrl: '원본 구독 URL:',
    clientType: '클라이언트 유형:',
    externalConfig: '외부 구성:',
    backendUrl: '백엔드 URL:',
    includeKeywords: '포함 키워드:',
    excludeKeywords: '제외 키워드:',
  }
}; 