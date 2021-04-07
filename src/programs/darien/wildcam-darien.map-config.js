/*
WildCam Darien Map Config
=========================

Configuration file for the WildCam Map feature. Each MapConfig is tailored to a
specific project, and this config file is for WildCam Darien.

Requires:
Requires:
- (External dependency) a map service. In this case, Leaflet.
- (External dependency) an external database containing the map data for said
  project. In this case, https://classroom-maps-api.zooniverse.org/

********************************************************************************
 */

import { ZooTran } from '../../lib/zooniversal-translator.js';

const mapConfig = {
  //Connection details for the external data source.
  'database': {
    'urls': {
      'json': '//classroom-maps-api.zooniverse.org/darien.json?_shape=objects&sql={SQLQUERY}',
      'geojson': '//classroom-maps-api.zooniverse.org/darien.geojson?sql={SQLQUERY}',
      'csv': '//classroom-maps-api.zooniverse.org/darien.csv?sql={SQLQUERY}'
    },
    'queries': {
      //For each camera, show how many (filtered) results are available.
      'selectCameraCount': `
        SELECT
          cam.*, COUNT(*) as count
        FROM
          cameras AS cam
        LEFT JOIN
          (
          SELECT
            sbj.camera, sbj.location, sbj.date, sbj.season, sbj.time_period, agg.data_choice, agg.subject_id
          FROM
            subjects AS sbj
          INNER JOIN
             aggregations AS agg
          ON
             sbj.subject_id = agg.subject_id
          ) AS sbjagg
        ON
          cam.id = sbjagg.camera
        {WHERE}
        GROUP BY
          cam.id, human_type, dist_humans_m, dist_water_m, land_use, national_park, water_type, veg_type, longitude, latitude, the_geom, cam.cartodb_id
        ORDER BY
          count DESC
        `,
        /*  //Variant for dynamically flattening camera IDs, e.g. 'CP01a' -> 'CP01'. Technically not needed as flattening is now done during database setup instead of at runtime.
        `SELECT
          cam.*, COUNT(sbjagg.*) as count
        FROM
          (
            SELECT
              DISTINCT(REPLACE(REPLACE(id, 'a', ''), 'b', '')) AS id, human_type, dist_humans_m, dist_water_m, land_use, national_park, water_type, veg_type, longitude, latitude, the_geom
            FROM
              cameras
            ) AS cam
        LEFT JOIN
          (
          SELECT
              DISTINCT(REPLACE(REPLACE(camera, 'a', ''), 'b', '')) AS camera, sbj.location, sbj.date, sbj.season, sbj.time_period, agg.data_choice, agg.subject_id
            FROM
              subjects AS sbj
            INNER JOIN
               aggregations AS agg
            ON
               sbj.subject_id = agg.subject_id
            ) AS sbjagg
        ON
          cam.id = sbjagg.camera
        {WHERE}
        GROUP BY
          cam.id, human_type, dist_humans_m, dist_water_m, land_use, national_park, water_type, veg_type, longitude, latitude, the_geom
        ORDER BY
          count DESC
        `,*/
      
      //Get all the details for all the (filtered) results.
      'selectForDownload': `
        SELECT
          cam.national_park,
          cam.veg_type,
          cam.human_type,
          cam.dist_humans_m,
          cam.water_type,
          cam.dist_water_m,
          cam.land_use,
          cam.latitude,
          cam.longitude,
          sbjagg.*
        FROM
          cameras AS cam
        INNER JOIN
          (
          SELECT
            sbj.camera, sbj.location, sbj.month, sbj.year, sbj.season, sbj.time_period, sbj.time, sbj.date, sbj.darien_id, agg.data_choice, agg.data_answers_howmany_1, agg.data_answers_howmany_2, agg.data_answers_howmany_3, agg.data_answers_howmany_4, agg.data_answers_howmany_5, agg.data_answers_howmany_6, agg.data_answers_howmany_7, agg.data_answers_howmany_8, agg.data_answers_howmany_9, agg.data_answers_howmany_10, agg.data_answers_howmany_1120, agg.data_answers_howmany_21
          FROM
            subjects AS sbj
          INNER JOIN
            aggregations AS agg
          ON
            sbj.subject_id = agg.subject_id
          ) AS sbjagg
        ON
          cam.id = sbjagg.camera
        {WHERE}
      `,
      
      //Get all the minimum Subject details for all the (filtered) results. Has Order By and Limit clauses.
      'selectForAssignment': 'SELECT sbjagg.subject_id, sbjagg.location FROM cameras AS cam INNER JOIN (SELECT sbj.subject_id, sbj.camera, sbj.location, sbj.month, sbj.year, sbj.season, sbj.time_period, sbj.time, sbj.date, sbj.darien_id, agg.data_choice, agg.data_answers_howmany_1, agg.data_answers_howmany_2, agg.data_answers_howmany_3, agg.data_answers_howmany_4, agg.data_answers_howmany_5, agg.data_answers_howmany_6, agg.data_answers_howmany_7, agg.data_answers_howmany_8, agg.data_answers_howmany_9, agg.data_answers_howmany_10, agg.data_answers_howmany_1120, agg.data_answers_howmany_21 FROM subjects AS sbj INNER JOIN aggregations AS agg ON sbj.subject_id = agg.subject_id) AS sbjagg ON cam.id = sbjagg.camera {WHERE} {ORDER} {LIMIT}',
      
      //Get all subjects, with camera data.
      'selectAllSubjects': 'SELECT sbj.subject_id, sbj.camera, cam.national_park, cam.longitude, cam.latitude, sbj.date, sbj.month, sbj.year, sbj.season, sbj.time_period, cam.veg_type, cam.land_use, cam.water_type, cam.dist_humans_m, cam.dist_water_m, sbj.location AS image_url FROM subjects AS sbj LEFT JOIN cameras AS cam ON sbj.camera = cam.id',
      
      //Select all the photos from a specific camera. Similar to selectForDownload
      'selectCameraData': 'SELECT DISTINCT(sbjagg.location) FROM cameras AS cam INNER JOIN (SELECT sbj.camera, sbj.location, sbj.month, sbj.year, sbj.season, sbj.time_period, sbj.time, sbj.date, sbj.darien_id, agg.data_choice FROM subjects AS sbj INNER JOIN aggregations AS agg ON sbj.subject_id = agg.subject_id) AS sbjagg ON cam.id = sbjagg.camera {WHERE}',
      
      //Select a single camera, mostly for the camera's metadata.
      'selectCameraMetadata': 'SELECT * FROM cameras {WHERE}',
    }
  },
  
  //The map visualisation bits. Compatible with Leaflet tech.
  'map': {
    'centre': {  //Some arbitrary point between Soberania National Park and Darien National Park. 
      'latitude': 8.300,
      'longitude': -78.600,
      'zoom': 8
    },
    'tileLayers': [
      {
        'name': 'Terrain',
        'url': '//server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        'attribution': 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
      },
      {
        'name': 'Terrain (Shaded)',
        'url': '//server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
        'attribution': 'Tiles &copy; Esri &mdash; Source: Esri'
      },
      {
        'name': 'Roads',
        'url': '//{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png',
        'attribution': '&copy; <a href=\'http://www.openstreetmap.org/copyright\'>OpenStreetMap</a>'
      },
      {
        'name': 'Satellite',
        'url': '//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        'attribution': 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      },
      {
        'name': 'Plain',
        'url': '//{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        'attribution': '&copy; <a href=\'http://www.openstreetmap.org/copyright\'>OpenStreetMap</a> &copy; <a href=\'http://cartodb.com/attributions\'>CartoDB</a>'
      }
    ],
    extraLayers: [
      {
        'name': 'darien_national_park',
        'label': 'Darien National Park',
        'query': 'SELECT * FROM darien_national_park',
        'style': function (feature) {
          return {
            stroke: true,
            color: '#3cc',
            fill: false,
          };
        },
      },
      {
        'name': 'soberania_national_park',
        'label': 'Soberania National Park',
        'query': 'SELECT * FROM soberania_national_park',
        'style': function (feature) {
          return {
            stroke: true,
            color: '#3cc',
            fill: false,
            interactive: false,
          };
        },
      },
      {
        'name': 'veg_type',
        'label': 'Habitats',
        'query': 'SELECT * FROM vegetation_map',
        'style': function (feature) {
          let color = '#ccc';
          if (feature && feature.properties) {
            switch (feature.properties.veg_type) {
              case 'Montane evergreen tropical forest':
                color = '#9c3'; break;
              case 'Lowland evergreen tropical forest':
                color = '#993'; break;
              case 'Submontane evergreen tropical forest':
                color = '#693'; break;
              case 'Lowland semideciduous tropical forest':
                color = '#9c6'; break;
              case 'Water':
                color = '#39c'; break;
            }
          }
          
          return {
            stroke: false,
            fill: true,
            fillColor: color,
            fillOpacity: 0.5,
            interactive: false,
          };
        },
      },
    ],
    'legend': {
      'type': 'simple',
      'items': {
        '#9c3': 'Montane evergreen tropical forest',
        '#993': 'Lowland evergreen tropical forest',
        '#693': 'Submontane evergreen tropical forest',
        '#9c6': 'Lowland semideciduous tropical forest',
        '#39c': 'Water'
      },
    },
    'filters': {
      'data_choice': {
        'label': 'Species',
        'type': 'multichoice',
        'options': [
          {
            'value': 'agouti',
            'label': 'Agouti'
          },
          {
            'value': 'armadillonakedtailed',
            'label': 'Armadillo, Naked-tailed'
          },
          {
            'value': 'armadilloninebanded',
            'label': 'Armadillo, Nine-banded'
          },
          {
            'value': 'bat',
            'label': 'Bat'
          },
          {
            'value': 'birdother',
            'label': 'Bird (other)'
          },
          {
            'value': 'capuchinmonkey',
            'label': 'Capuchin Monkey'
          },
          {
            'value': 'capybara',
            'label': 'Capybara'
          },
          {
            'value': 'coati',
            'label': 'Coati'
          },
          {
            'value': 'coyote',
            'label': 'Coyote'
          },
          {
            'value': 'crestedguan',
            'label': 'Crested Guan'
          },
          {
            'value': 'deerredbrocket',
            'label': 'Deer, Red Brocket'
          },
          {
            'value': 'deerwhitetailed',
            'label': 'Deer, White-tailed'
          },
          {
            'value': 'dogbush',
            'label': 'Dog, Bush'
          },
          {
            'value': 'dogdomestic',
            'label': 'Dog, Domestic'
          },
          {
            'value': 'foxcrabeating',
            'label': 'Fox, Crab-eating'
          },
          {
            'value': 'foxgray',
            'label': 'Fox, Gray'
          },
          {
            'value': 'giantanteater',
            'label': 'Giant Anteater'
          },
          {
            'value': 'greatcurassow',
            'label': 'Great Curassow'
          },
          {
            'value': 'greattinamou',
            'label': 'Great Tinamou'
          },
          {
            'value': 'grison',
            'label': 'Grison'
          },
          {
            'value': 'jaguar',
            'label': 'Jaguar'
          },
          {
            'value': 'jaguarundi',
            'label': 'Jaguarundi'
          },
          {
            'value': 'margay',
            'label': 'Margay'
          },
          {
            'value': 'monkeyother',
            'label': 'Monkey (other)'
          },
          {
            'value': 'ocelot',
            'label': 'Ocelot'
          },
          {
            'value': 'oncilla',
            'label': 'Oncilla'
          },
          {
            'value': 'opossumother',
            'label': 'Opossum (other)'
          },
          {
            'value': 'opossumcommon',
            'label': 'Opossum, Common'
          },
          {
            'value': 'otter',
            'label': 'Otter'
          },
          {
            'value': 'paca',
            'label': 'Paca'
          },
          {
            'value': 'peccarycollared',
            'label': 'Peccary, Collared'
          },
          {
            'value': 'peccarywhitelipped',
            'label': 'Peccary, White-lipped'
          },
          {
            'value': 'porcupine',
            'label': 'Porcupine'
          },
          {
            'value': 'puma',
            'label': 'Puma'
          },
          {
            'value': 'rabbit',
            'label': 'Rabbit'
          },
          {
            'value': 'raccoon',
            'label': 'Raccoon'
          },
          {
            'value': 'redtailedsquirrel',
            'label': 'Red-tailed Squirrel'
          },
          {
            'value': 'reptileamphibian',
            'label': 'Reptile / Amphibian'
          },
          {
            'value': 'rodentother',
            'label': 'Rodent (other)'
          },
          {
            'value': 'skunk',
            'label': 'Skunk'
          },
          {
            'value': 'spinyrat',
            'label': 'Spiny Rat'
          },
          {
            'value': 'tamandua',
            'label': 'Tamandua'
          },
          {
            'value': 'tapir',
            'label': 'Tapir'
          },
          {
            'value': 'tayra',
            'label': 'Tayra'
          },
          {
            'value': 'weasel',
            'label': 'Weasel'
          },
          {
            'value': 'humannotvehicles',
            'label': 'Human (not vehicles)'
          },
          {
            'value': 'vehicle',
            'label': 'Vehicle'
          },
          {
            'value': 'nothinghere',
            'label': 'Nothing here'
          }
        ]
      },
      'veg_type': {
        'label': 'Habitats',
        'type': 'multichoice',
        'options': [
          {
            'value': 'Mature Forest',
            'label': 'Mature Forest'
          },
          {
            'value': 'Lowland semideciduous tropical forest',
            'label': 'Lowland semideciduous tropical forest'
          },
          {
            'value': 'Lowland evergreen tropical forest',
            'label': 'Lowland evergreen tropical forest'
          },
          {
            'value': 'Submontane evergreen tropical forest',
            'label': 'Submontane evergreen tropical forest'
          }
        ]
      },
      'season': {
        'label': 'Seasons',
        'type': 'multichoice',
        'options': [
          {
            'value': 'Dry',
            'label': 'Dry'
          },
          {
            'value': 'Wet',
            'label': 'Wet'
          }
        ]
      },
      'time_period': {
        'label': 'Times of Day',
        'type': 'multichoice',
        'options': [
          {
            'value': 'Dawn 0555-0616',
            'label': 'Dawn (05:55-06:16)'
          },
          {
            'value': 'Day 0617-1827',
            'label': 'Day (06:17-18:27)'
          },
          {
            'value': 'Dusk 1828-1849',
            'label': 'Dusk (18:28-18:49)'
          },
          {
            'value': 'Night 1850-0554',
            'label': 'Night (18:50-05:54)'
          }
        ]
      },
      'national_park': {
        'label': 'National Parks',
        'type': 'multichoice',
        'options': [
          {
            'value': 'Darien',
            'label': 'Darien'
          },
          {
            'value': 'Soberania',
            'label': 'Soberania'
          }
        ]
      },
      'land_use': {
        'label': 'Land Use',
        'type': 'multichoice',
        'options': [
          {
            'value': 'Tourism',
            'label': 'Tourism'
          },
          {
            'value': 'Wilderness',
            'label': 'Wilderness'
          }
        ]
      },
      'human_type': {
        'label': 'Nearby Humans',
        'type': 'multichoice',
        'options': [
          {
            'value': 'Road',
            'label': 'Road'
          },
          {
            'value': 'Village',
            'label': 'Village'
          }
        ]
      },
      'water_type': {
        'label': 'Nearby Water',
        'type': 'multichoice',
        'options': [
          {
            'value': 'River',
            'label': 'River'
          },
          {
            'value': 'Lake',
            'label': 'Lake'
          }
        ]
      }
    }
  },
  
  //Misc stuff related to the program
  'program': {
    dataGuideURL: '/#/wildcam-darien-lab/explorers/data-guide/',
    transformDownloadData: function (csvData) {
      if (csvData && csvData.data && csvData.data.length > 0 && csvData.errors.length === 0) {
        return Promise.resolve(transformDarienDownloadData(csvData));
      }

      if (csvData && csvData.errors.length > 0) {
        return Promise.reject(csvData.errors[0].message);
      }

      return Promise.resolve(null);      
    }
  },
};

export default mapConfig;

/*  WildCam Darien data exports need to 1. be translated to the proper language, and 2. need to have a 'Consensus Count' field added.
 */
function transformDarienDownloadData(csvData) {
  let output = '';
  const header = csvData.data[0].slice();
  header.push('consensus_count');  //Append consensus count to the final column of each row.
  
  const headerLookup = {};
  header.forEach((item, index) => {
    if (item.startsWith('data_answers_howmany_')) headerLookup[item] = index;
  }); 
  
  output = header.map(str => csvStr(str)).join(',') + '\n';
  
  for (let i = 1; i < csvData.data.length; i ++) {
    let row = csvData.data[i];
    
    if (row.join().length === 0) continue
    
    let consensusCount = undefined;
    let numberForConsensus = 0;
    
    //Which "animal was seen X times in this photo" has the highest count?    
    Object.keys(headerLookup).forEach((key) => {
      const index = headerLookup[key];
      const currentNumber = row[index];
      if (!consensusCount || numberForConsensus < currentNumber) {
        numberForConsensus = currentNumber;
        consensusCount = key.replace('data_answers_howmany_', '');
        if (consensusCount === '1120') consensusCount = '11-20';
        if (consensusCount === '21') consensusCount = '21+';
      }
    });
    
    if (!consensusCount) {
      row.push('-')
    } else {
      row.push(consensusCount)
    }
    
    output += row.map(str => csvStr(str)).join(',') + '\n';
  }
  
  return output;
}

function csvStr(str) {
  return '"' + ZooTran(str).replace(/"/g, '""') + '"';
}