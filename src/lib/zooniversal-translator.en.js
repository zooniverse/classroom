let EnglishTranslations = {
  //Database
  'cartodb_id': null,
  'the_geom': null,
  'the_geom_webmercator': null,
  'dist_humans_m': 'Distance from humans (m)',
  'dist_water_m':  'Distance from water (m)',
  'land_use': 'Land Use',
  'national_park': 'National Park',
  'human_type': 'Nearby Humans',
  'water_type': 'Nearby Water',
  'veg_type': 'Habitat',
  'id': null,
  'longitude': 'Longitude',
  'latitude': 'Latitude',
  'camera': 'Camera',
  'location': 'Photo URL',
  'month': 'Month',
  'year': 'Year',
  'season': 'Season',
  'time_period': 'Time Period',
  'time': 'Time',
  'date': 'Date',
  'darien_id': null,
  'data_choice': 'Species',
  'data_answers_howmany_1': 'Number of people who saw 1 animal',
  'data_answers_howmany_2': 'Number of people who saw 2 animals',
  'data_answers_howmany_3': 'Number of people who saw 3 animals',
  'data_answers_howmany_4': 'Number of people who saw 4 animals',
  'data_answers_howmany_5': 'Number of people who saw 5 animals',
  'data_answers_howmany_6': 'Number of people who saw 6 animals',
  'data_answers_howmany_7': 'Number of people who saw 7 animals',
  'data_answers_howmany_8': 'Number of people who saw 8 animals',
  'data_answers_howmany_9': 'Number of people who saw 9 animals',
  'data_answers_howmany_10': 'Number of people who saw 10 animals',
  'data_answers_howmany_1120': 'Number of people who saw 11-20 animals',
  'data_answers_howmany_21': 'Number of people who saw 21+ animals',
  'consensus_count': 'Number of animals (consensus)'
};

//HACK: database support for WildCam Darien.
import mapConfig from '../programs/darien/wildcam-darien.map-config.js';
const databaseAdditions = {};
mapConfig.map.filters.data_choice.options.map(item => {
  const databaseValue = item.value;
  const englishLabel = item.label;
  if (englishLabel) databaseAdditions[databaseValue] = englishLabel;
});
EnglishTranslations = {...EnglishTranslations, ...databaseAdditions};

export default EnglishTranslations;
