/*
Wildwatch Kenya Map Config
==========================

Configuration file for the WildCam Map feature. Each MapConfig is tailored to a
specific project, and this config file is for Wildwatch Kenya.

Requires:
- (External dependency) a map service. In this case, Leaflet.
- (External dependency) an external database containing the map data for said
  project. In this case, https://classroom-maps-api.zooniverse.org/

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
      'items': {},
    },
    'filters': {
      'data.choice': {
        'label': 'Species',
        'type': 'multichoice',
        'options': [
          {
            "value":"HARE",
            "label":"Hare"
          },
          {
            "value":"KUDU",
            "label":"Kudu"
          },
          {
            "value":"LION",
            "label":"Lion"
          },
          {
            "value":"ORYX",
            "label":"Oryx"
          },
          {
            "value":"CIVET",
            "label":"Civet"
          },
          {
            "value":"CRANE",
            "label":"Crane"
          },
          {
            "value":"ELAND",
            "label":"Eland"
          },
          {
            "value":"GENET",
            "label":"Genet"
          },
          {
            "value":"HYENA",
            "label":"Hyena"
          },
          {
            "value":"ZEBRA",
            "label":"Zebra"
          },
          {
            "value":"BABOON",
            "label":"Baboon"
          },
          {
            "value":"DIKDIK",
            "label":"Dik Dik"
          },
          {
            "value":"DUIKER",
            "label":"Duiker"
          },
          {
            "value":"IMPALA",
            "label":"Impala"
          },
          {
            "value":"JACKAL",
            "label":"Jackal"
          },
          {
            "value":"SERVAL",
            "label":"Serval"
          },
          {
            "value":"BUFFALO",
            "label":"Buffalo"
          },
          {
            "value":"CARACAL",
            "label":"Caracal"
          },
          {
            "value":"CHEETAH",
            "label":"Cheetah"
          },
          {
            "value":"GAZELLE",
            "label":"Gazelle"
          },
          {
            "value":"GERENUK",
            "label":"Gerenuk"
          },
          {
            "value":"GIRAFFE",
            "label":"Giraffe"
          },
          {
            "value":"LEOPARD",
            "label":"Leopard"
          },
          {
            "value":"WARTHOG",
            "label":"Warthog"
          },
          {
            "value":"WILDDOG",
            "label":"Wild Dog"
          },
          {
            "value":"ZORILLA",
            "label":"Zorilla"
          },
          {
            "value":"AARDVARK",
            "label":"Aardvark"
          },
          {
            "value":"AARDWOLF",
            "label":"Aardwolf"
          },
          {
            "value":"BUSHBUCK",
            "label":"Bushbuck"
          },
          {
            "value":"ELEPHANT",
            "label":"Elephant"
          },
          {
            "value":"MONGOOSE",
            "label":"Mongoose"
          },
          {
            "value":"BIRDOTHER",
            "label":"Bird (other)"
          },
          {
            "value":"LIVESTOCK",
            "label":"Livestock"
          },
          {
            "value":"PORCUPINE",
            "label":"Porcupine"
          },
          {
            "value":"WATERBUCK",
            "label":"Waterbuck"
          },
          {
            "value":"GUINEAFOWL",
            "label":"Guinea Fowl"
          },
          {
            "value":"HARTEBEEST",
            "label":"Hartebeest"
          },
          {
            "value":"BATEAREDFOX",
            "label":"Bat-eared Fox"
          },
          {
            "value":"HONEYBADGER",
            "label":"Honey Badger"
          },
          {
            "value":"KORIBUSTARD",
            "label":"Kori Bustard"
          },
          {
            "value":"HIPPOPOTAMUS",
            "label":"Hippopotamus"
          },
          {
            "value":"HUMANVEHICLE",
            "label":"Human/Vehicle"
          },
          {
            "value":"VERVETMONKEY",
            "label":"Vervet Monkey"
          },
          {
            "value":"GROUNDSQUIRREL",
            "label":"Ground Squirrel"
          },
          {
            "value":"LEOPARDTORTOISE",
            "label":"Leopard Tortoise"
          }
        ]
      },
      'season': {
        'label': 'Seasons',
        'type': 'multichoice',
        'options': [
          {
            'value': 'dry',
            'label': 'Dry'
          },
          {
            'value': 'wet',
            'label': 'Wet'
          }
        ]
      },
    }
  },
  
  //Misc stuff related to the program
  'program': {
    dataGuideURL: '/#/wildwatch-kenya-lab/explorers/data-guide/',
    transformDownloadData: function (csvData) {
      if (csvData && csvData.data && csvData.data.length > 0 && csvData.errors.length === 0) {
        return Promise.resolve(transformDownloadData(csvData));
      }

      if (csvData && csvData.errors.length > 0) {
        return Promise.reject(csvData.errors[0].message);
      }

      return Promise.resolve(null);      
    }
  },
};

export default mapConfig;

/*  Wildwatch Kenya data exports have a 'Consensus Count' field added.
 */
function transformDownloadData(csvData) {
  let output = '';
  const header = csvData.data[0].slice();
  header.push('consensus_count');  //Append consensus count to the final column of each row.
  
  const headerLookup = {};
  header.forEach((item, index) => {
    if (item.startsWith('data.answers.howmany.')) headerLookup[item] = index;
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
        consensusCount = key.replace('data.answers.howmany.', '');
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