/*
Zooniversal Translator
======================

The Zooniversal Translator is a simple, brute-force approach to achieving
translations on the WildCam Map, very specifically: WildCam Darien needs
English and Spanish text for their project, and it needs it by launch
(31 Aug 2017).

The naming is such that it's super simple to grep/Ctrl+F to find the code and
replace all usage with a better solution, once that's implemented.

This documentation is accurate as of Stardate 2017.240

********************************************************************************
 */

import EnglishTranslations from './zooniversal-translator.en.js';
import SpanishTranslations from './zooniversal-translator.es.js';

export function ZooTran(text) {
  const translations = ZooTranGetTranslationsObject();

  return (translations && translations[text])
    ? translations[text]
    : text;
}

export function ZooTranExists(text) {
  const translations = ZooTranGetTranslationsObject();
  return translations[text] !== null;
}

export function ZooTranSetLanguage(lang) {
  if (!localStorage) return;
  localStorage.setItem('zooniversal-translator-language', lang);
}

export function ZooTranGetLanguage() {
  if (!localStorage) return null;
  return localStorage.getItem('zooniversal-translator-language');
}

export function ZooTranGetTranslationsObject() {
  const lang = ZooTranGetLanguage();
  if (lang === 'es') return SpanishTranslations;
  return EnglishTranslations;
}

/*
Checks if ZooTran is using a valid language for the current Program. If not,
reset to a valid language, and then reload the page.
 */
export function ZooTranCheckForValidLanguage(acceptableLanguages = ['en']) {
  const lang = ZooTranGetLanguage();  // Note: lang can be null or ''
  if (lang && !acceptableLanguages.includes(lang)) {
    ZooTranSetLanguage('');
    setTimeout(() => { window.location.reload() }, 100);
    // Using timeout + reload is a crude but effective solution. A more elegant
    // solution would be to rework the translation system entirely, using
    // `counterpart` or a similar library to replace the Zooniversal Translator
    // @shaun.a.noordin 2022.01.07
  }
}
