import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {register} from "timeago.js";
import {format} from "timeago.js";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign up': 'Sign up',
                'Password mismatch': 'Password mismatch',
                'Username': 'Username',
                'Email': 'Email',
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
                'Change Your Display Name': 'Change Your Display Name',
                'My Profile': "My Profile",
                "There are no posts": "There are no posts",
                "Load before posts": "Load before posts",
                "There are new posts": "There are new posts",
                "enterotpcode": "Please enter the your otp code"
            }
        },
        tr: {
            translations: {
                'Sign up': 'Kayıt ol',
                'Password mismatch': 'Şifreler uyuşmuyor.',
                'Username': 'Kullanıcı Adı',
                'Email': 'E-Posta',
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
                'Change Your Display Name': 'Görünür İsmi Değiştir',
                'My Profile': "Profilim",
                "There are no posts": "Henüz post paylaşılmadı.",
                "Load before posts": "Diğer postları yükle",
                "There are new posts": "Yeni postlar var.",
                'enterotpcode': 'Lütfen otp kodunuzu giriniz.'

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

const localeFunc = (number, index) => {
    // number: the timeago / timein number;
    // index: the index of array below;
    // totalSec: total seconds between date to be formatted and today's date;
    return [
        ['az önce', 'şimdi'],
        ['%s saniye önce', '%s saniye içinde'],
        ['1 dakika önce', '1 dakika içinde'],
        ['%s dakika önce', '%s dakika içinde'],
        ['1 saat önce', '1 saat içinde'],
        ['%s saat önce', '%s saat içinde'],
        ['1 gün önce', '1 gün içinde'],
        ['%s gün önce', '%s gün içinde'],
        ['1 hafta önce', '1 hafta içinde'],
        ['%s hafta önce', '%s hafta içinde'],
        ['1 ay önce', '1 ay içinde'],
        ['%s ay önce', '%s ay içinde'],
        ['1 yıl önce', '1 yıl içinde'],
        ['%s yıl önce', '%s yıl içinde']
    ][index];
};
// register your locale with timeago
register('tr', localeFunc);


export default i18n;
