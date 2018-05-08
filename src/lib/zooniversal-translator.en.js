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
  'data_answers_howmany_1': 'Count 1',
  'data_answers_howmany_2': 'Count 2',
  'data_answers_howmany_3': 'Count 3',
  'data_answers_howmany_4': 'Count 4',
  'data_answers_howmany_5': 'Count 5',
  'data_answers_howmany_6': 'Count 6',
  'data_answers_howmany_7': 'Count 7',
  'data_answers_howmany_8': 'Count 8',
  'data_answers_howmany_9': 'Count 9',
  'data_answers_howmany_10': 'Count 10',
  'data_answers_howmany_1120': 'Count 11-20',
  'data_answers_howmany_21': 'Count 21+',
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
