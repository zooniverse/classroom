import { ZooTranGetLanguage } from '../../lib/zooniversal-translator'


import { TEXT_EN } from './text.en.js';
import { TEXT_ES } from './text.es.js';

const lang = ZooTranGetLanguage();

const TEXT = (lang !== 'es')
  ? TEXT_EN
  : TEXT_ES;

export { TEXT };