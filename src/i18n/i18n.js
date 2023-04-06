import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_EN from 'src/locales/en/home.json'
import HOME_VI from 'src/locales/vi/home.json'
const resources = {
    en: {
       home:HOME_EN
    },
    vi: {
       home:HOME_VI
    }

};
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "vi", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option
        ns:['home'],
        defaultNS:'home',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });