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
                'Login': 'Login',
                'Logout': 'Logout',
                'Users': 'Users',
                'Next': 'Next >',
                'Previous': '< Previous',
                'Fail Load': 'Fail Load!',
                'User not found': 'User not found',
                'Edit': 'Edit',
                'Save': 'Save',
                'Close': 'Close',
                'Change Your Display Name': 'Change Your Display Name'
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
                'Login': 'Giriş',
                'Logout': 'Çıkış Yap',
                'Users': 'Kullanıcılar',
                'Next': 'Sonraki >',
                'Previous': '< Önceki',
                'Fail Load': 'Sayfa Yüklenemedi!',
                'User not found': 'Kullanıcı bulunamadı',
                'Edit': 'Düzenle',
                'Save': 'Kaydet',
                'Close': 'Kapat',
                'Change Your Display Name': 'Görünür İsmi Değiştir'
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
