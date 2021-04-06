/*
WildCam Darien Map Config
=========================

Configuration file for the WildCam Map feature. Each MapConfig is tailored to a
specific project, and this config file is for WildCam Darien.

Requires:
* (External dependency) an external database containing the map data for said
  project; in this case, Carto.

********************************************************************************
 */

const kenyaGeodata = require('./map-geojson/kenya.json');

const mapConfig = {
  //Connection details for the external data source.
  'database': {
    'urls': {
      'json': '//classroom-maps-api.zooniverse.org/kenya.json?_shape=objects&sql={SQLQUERY}',
      'geojson': '//classroom-maps-api.zooniverse.org/kenya.geojson?sql={SQLQUERY}',
      'csv': '//classroom-maps-api.zooniverse.org/kenya.csv?sql={SQLQUERY}'
    },
    'queries': {
      //For each camera, show how many (filtered) results are available.
      'selectCameraCount': `
        SELECT
          cam.id, cam.latitude, cam.longitude, COUNT(*) as count
        FROM
          cameras AS cam
        LEFT JOIN
          (
          SELECT
            sbj.subject_id, sbj.camera, sbj.location, agg.[data.choice]
          FROM
            subjects AS sbj
          INNER JOIN
            aggregations AS agg
          ON
            sbj.subject_id = agg.subject_id
          WHERE
            [data.choice_count] >= 3
          ) AS sbjagg
        ON
          cam.id = sbjagg.camera
        {WHERE}
        GROUP BY
          cam.id, longitude, latitude
        ORDER BY
          count DESC
        `,
      
      //Get all the details for all the (filtered) results.
      'selectForDownload': `
        SELECT
          cam.id,
          cam.latitude,
          cam.longitude,
          cam.season,
          sbjagg.*
        FROM
          cameras AS cam
        INNER JOIN
          (
          SELECT
            sbj.subject_id, sbj.camera, sbj.location, sbj.month, sbj.year,
            agg.[data.choice], agg.[data.choice_count], agg.[data.total_vote_count], agg.[data.answers.whatbehaviorsdoyousee.standing], agg.[data.answers.whatbehaviorsdoyousee.interacting], agg.[data.answers.whatbehaviorsdoyousee.moving], agg.[data.answers.whatbehaviorsdoyousee.resting], agg.[data.answers.whatbehaviorsdoyousee.eating], agg.[data.answers.arethereanyyoungpresent.yes], agg.[data.answers.arethereanyyoungpresent.no], agg.[data.answers.howmany.1], agg.[data.answers.howmany.2], agg.[data.answers.howmany.3], agg.[data.answers.howmany.4], agg.[data.answers.howmany.5], agg.[data.answers.howmany.6], agg.[data.answers.howmany.7], agg.[data.answers.howmany.8], agg.[data.answers.howmany.9], agg.[data.answers.howmany.10], agg.[data.answers.howmany.1150], agg.[data.answers.howmany.51]
          FROM
            subjects AS sbj
          INNER JOIN
            aggregations AS agg
          ON
            sbj.subject_id = agg.subject_id
          WHERE
            [data.choice_count] >= 3
          ) AS sbjagg
        ON
          cam.id = sbjagg.camera
        {WHERE}
      `,
      
      //Get all the minimum Subject details for all the (filtered) results. Has Order By and Limit clauses.
      'selectForAssignment': `
        SELECT
          sbjagg.subject_id, sbjagg.location
        FROM
          cameras AS cam
        INNER JOIN
          (
          SELECT
            sbj.subject_id, sbj.camera, sbj.location, sbj.month, sbj.year,
            agg.[data.choice], agg.[data.choice_count], agg.[data.total_vote_count], agg.[data.answers.whatbehaviorsdoyousee.standing], agg.[data.answers.whatbehaviorsdoyousee.interacting], agg.[data.answers.whatbehaviorsdoyousee.moving], agg.[data.answers.whatbehaviorsdoyousee.resting], agg.[data.answers.whatbehaviorsdoyousee.eating], agg.[data.answers.arethereanyyoungpresent.yes], agg.[data.answers.arethereanyyoungpresent.no], agg.[data.answers.howmany.1], agg.[data.answers.howmany.2], agg.[data.answers.howmany.3], agg.[data.answers.howmany.4], agg.[data.answers.howmany.5], agg.[data.answers.howmany.6], agg.[data.answers.howmany.7], agg.[data.answers.howmany.8], agg.[data.answers.howmany.9], agg.[data.answers.howmany.10], agg.[data.answers.howmany.1150], agg.[data.answers.howmany.51]
          FROM
            subjects AS sbj
          INNER JOIN
            aggregations AS agg
          ON
            sbj.subject_id = agg.subject_id
          WHERE
            [data.choice_count] >= 3
          ) AS sbjagg
        ON
          cam.id = sbjagg.camera
        {WHERE} {ORDER} {LIMIT}
      `,
      
      //Get all subjects, with camera data.
      'selectAllSubjects': `
        SELECT
          sbj.subject_id, sbj.camera, cam.longitude, sbj.date, sbj.month, sbj.year, sbj.location, cam.latitude, cam.season
        FROM
          subjects AS sbj
        LEFT JOIN
          cameras AS cam
        ON
          sbj.camera = cam.id
      `,
      
      //Select all the photos from a specific camera. Similar to selectForDownload
      'selectCameraData': `
        SELECT
          DISTINCT(sbjagg.location)
        FROM
          cameras AS cam
        INNER JOIN
          (
          SELECT
            sbj.subject_id, sbj.camera, sbj.location, sbj.month, sbj.year,
            agg.[data.choice], agg.[data.choice_count], agg.[data.total_vote_count], agg.[data.answers.whatbehaviorsdoyousee.standing], agg.[data.answers.whatbehaviorsdoyousee.interacting], agg.[data.answers.whatbehaviorsdoyousee.moving], agg.[data.answers.whatbehaviorsdoyousee.resting], agg.[data.answers.whatbehaviorsdoyousee.eating], agg.[data.answers.arethereanyyoungpresent.yes], agg.[data.answers.arethereanyyoungpresent.no], agg.[data.answers.howmany.1], agg.[data.answers.howmany.2], agg.[data.answers.howmany.3], agg.[data.answers.howmany.4], agg.[data.answers.howmany.5], agg.[data.answers.howmany.6], agg.[data.answers.howmany.7], agg.[data.answers.howmany.8], agg.[data.answers.howmany.9], agg.[data.answers.howmany.10], agg.[data.answers.howmany.1150], agg.[data.answers.howmany.51]
          FROM
            subjects AS sbj
          INNER JOIN
            aggregations AS agg
          ON
            sbj.subject_id = agg.subject_id
          WHERE
            [data.choice_count] >= 3
          ) AS sbjagg
        ON
          cam.id = sbjagg.camera
        {WHERE}
      `,
      
      //Select a single camera, mostly for the camera's metadata.
      'selectCameraMetadata': 'SELECT * FROM cameras {WHERE}',
    }
  },
  
  //The map visualisation bits. Compatible with Leaflet tech.
  'map': {
    'centre': {  //Some arbitrary point in Kenya. 
      'latitude': 1.5,
      'longitude': 40,
      'zoom': 7,
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
        'name': 'kenya_zone',
        'label': 'Kenya',
        'data': kenyaGeodata,
        'style': function (feature) {
          return {
            stroke: true,
            color: '#3cc',
            fill: false,
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
  return '"' + str.replace(/"/g, '""') + '"';
}