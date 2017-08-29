/*
Zooniversal Translator
======================

The Zooniversal Translator is a simple, brute-force approach to achieving
translations on the Map Explorer, very specifically: WildCam Darien needs
English and Spanish text for their project, and it needs it by launch
(31 Aug 2017).

The naming is such that it's super simple to grep/Ctrl+F to find the code and
replace all usage with a better solution, once that's implemented.

This documentation is accurate as of Stardate 2017.240

********************************************************************************
 */

import EnglishTranslations from 'zooniversal-translator.en.js'; 
import SpanishTranslations from 'zooniversal-translator.es.js'; 

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

export function ZooTranCSV(lotsOfText) {
  const translations = ZooTranGetTranslationsObject();
  if (!translations || !lotsOfText) return lotsOfText;
  
  let output = lotsOfText;
  Object.keys(translations).map((original, index) => {
    let translation = translations[original];
    if (translation === null) return;
    
    const regex = new RegExp(
      original  //Make this a literal expression, not a RegEx expression
      .replace(/\\/g, '\\\\')
      .replace(/\+/g, '\\+')
      .replace(/\-/g, '\\-')
      .replace(/\|/g, '\\|')
      .replace(/\./g, '\\.')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/\*/g, '\\*')
      .replace(/\?/g, '\\?'),
      'g'
    );
    
    //Make translation CSV-safe
    translation = translation.replace(/,/g, '');
    output = output.replace(regex, translation);
  });
  
  return output;
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