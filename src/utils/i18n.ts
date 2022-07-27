import { createI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import { LANG } from '@/constants/storage';
import { Local } from '@/utils/storage';

// 项目语言
export type ILangMapKey = 'zh' | 'ja' | 'en';

export async function loadMessage(lang: string): Promise<Record<'message' | 'antMessage', any>> {
  let defaultLocal, antMessage, dayjsMessage;
  switch (lang) {
    case 'en':
      defaultLocal = import.meta.glob(`../locales/en/*.ts`);
      antMessage = await import('ant-design-vue/es/locale/en_US');
      dayjsMessage = await import('dayjs/locale/en');
      break;
    case 'ja':
      defaultLocal = import.meta.glob(`../locales/ja/*.ts`);
      antMessage = await import('ant-design-vue/es/locale/ja_JP');
      dayjsMessage = await import('dayjs/locale/ja');
      break;
    default:
      defaultLocal = import.meta.glob(`../locales/zh/*.ts`);
      antMessage = await import('ant-design-vue/es/locale/zh_CN');
      dayjsMessage = await import('dayjs/locale/zh-cn');
      break;
  }

  const message: Record<string, unknown> = {};

  dayjs.locale(dayjsMessage.default);

  for (const item in defaultLocal) {
    const fileName = item.replace(`../locales/${lang}/`, '').replace('.ts', '');
    const langObject = await defaultLocal[item]?.();
    message[fileName] = langObject.default;
  }

  return {
    message,
    antMessage,
  };
}

// 初始化
export async function initI18n() {
  const lang = Local.get(LANG) ?? 'zh';
  const { message } = await loadMessage(lang);
  return createI18n({
    locale: lang,
    fallbackLocale: 'zh',
    messages: {
      [lang]: message,
    },
  });
}
