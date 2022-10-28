import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign up': 'Sign up',
                'Password mismatch': 'Password mismatch',
                'Username': 'Username',
                'Display Name': 'Display Name',
                'Password': 'Password',
                'Password Repeat': 'Password Repeat',
                'Login': 'Login'
            }
        },
        tr: {
            translations: {
                'Sign up': 'Kayıt ol',
                'Password mismatch': 'Şifreler uyuşmuyor.',
                'Username': 'Kullanıcı Adı',
                'Display Name': 'Görünen İsim',
                'Password': 'Şifre',
                'Password Repeat': 'Şifre Tekrar',
                'Login': 'Giriş'
            }
        }
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        useSuspense: true
    }
});

export default i18n;
