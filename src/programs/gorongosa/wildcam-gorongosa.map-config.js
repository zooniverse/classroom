/*
WildCam Gorongosa Map Config
=========================

Configuration file for the WildCam Map feature. Each MapConfig is tailored to a
specific project, and this config file is for WildCam Gorongosa.

Requires:
* (External dependency) an external database containing the map data for said
  project; in this case, Carto.

********************************************************************************
 */

const gorongosaGeodata = require('./map-geojson/gorongosa.json');
const vegetationGeodata = require('./map-geojson/vegetation.json');

const mapConfig = {
  //Connection details for the external data source.
  'database': {
    'urls': {
      'json': '//shaunanoordin-zooniverse.carto.com/api/v2/sql?q={SQLQUERY}',
      'geojson': '//shaunanoordin-zooniverse.carto.com/api/v2/sql?format=GeoJSON&q={SQLQUERY}',
      'csv': '//shaunanoordin-zooniverse.carto.com/api/v2/sql?format=CSV&q={SQLQUERY}'
    },
    'queries': {
      //For each camera, show how many (filtered) results are available.
      'selectCameraCount': `
        SELECT
          cam.*,
          COUNT(sbjagg.*) as count
        FROM
          wildcam_gorongosa_cameras_201601 AS cam
        LEFT JOIN
          (
          SELECT
            sbj.camera,
            sbj.location,
            sbj.dateutc,
            sbj.season,
            sbj.time_period,
            agg.species,
            agg.subject_id
          FROM
            wildcam_gorongosa_subjects_201601_16000 AS sbj
          INNER JOIN
            (
            SELECT * FROM wildcam_gorongosa_aggregations_201603a WHERE num_classifications >= 5
            ) AS agg
          ON
            sbj.subject_id = agg.subject_id
          ) AS sbjagg
        ON
          cam.id = sbjagg.camera
        {WHERE}
        GROUP BY
          cam.cartodb_id
        ORDER BY
          count DESC
      `,
      
      //Get all the details for all the (filtered) results.
      'selectForDownload': `
        SELECT
          cam.veg_type,
          cam.human_type AS "human_structure",
          cam.dist_humans_m AS distance_human_m,
          cam.dist_water_m AS distance_water_m,
          cam.water_type,
          cam.latitude,
          cam.longitude,
          sbjagg.*
        FROM
          wildcam_gorongosa_cameras_201601 AS cam
        INNER JOIN
          (
          SELECT
            sbj.subject_id AS image_id,
            sbj.camera,
            sbj.location AS image_url,
            sbj.month,
            sbj.year,
            sbj.season,
            sbj.time_period,
            sbj.dateutc AS "date",
            sbj.gorongosa_id,
            agg.species,
            agg.most_likely_number_of_animals AS "species_count",
            agg.percentage_behaviour_resting AS "percentage_resting",
            agg.percentage_behaviour_standing AS "percentage_standing",
            agg.percentage_behaviour_moving AS "percentage_moving",
            agg.percentage_behaviour_eating AS "percentage_eating",
            agg.percentage_behaviour_interacting AS "percentage_interacting",
            agg.most_likely_are_there_any_young_present AS "young_present",
            agg.most_likely_do_you_see_any_horns AS "horns" 
          FROM
            wildcam_gorongosa_subjects_201601_16000 AS sbj
          INNER JOIN
            (
            SELECT * FROM wildcam_gorongosa_aggregations_201603a WHERE num_classifications >= 5
            ) AS agg
          ON
            sbj.subject_id = agg.subject_id
          ) AS sbjagg
        ON
          cam.id = sbjagg.camera
        {WHERE}
      `,
      
      //Get all the minimum Subject details for all the (filtered) results. Has Order By and Limit clauses.
      'selectForAssignment': `
        SELECT
          sbjagg.subject_id,
          sbjagg.location
        FROM
          wildcam_gorongosa_cameras_201601 AS cam
        INNER JOIN
          (
          SELECT
            sbj.subject_id,
            sbj.camera,
            sbj.location,
            sbj.month,
            sbj.year,
            sbj.season,
            sbj.time_period,
            sbj.timeutc,
            sbj.dateutc,
            sbj.gorongosa_id,
            agg.species,
            agg.num_classifications
          FROM
            wildcam_gorongosa_subjects_201601_16000 AS sbj
          INNER JOIN
            (
            SELECT * FROM wildcam_gorongosa_aggregations_201603a WHERE num_classifications >= 5
            ) AS agg
          ON
            sbj.subject_id = agg.subject_id
          ) AS sbjagg
        ON
          cam.id = sbjagg.camera
        {WHERE}
        {ORDER}
        {LIMIT}
      `,
      
      //Get all subjects, with camera data.
      'selectAllSubjects': `
        SELECT
          cam.human_type,
          cam.dist_humans_m,
          cam.water_type,
          cam.dist_water_m,
          cam.veg_type,
          cam.latitude,
          cam.longitude,
          sbj.camera,
          sbj.gorongosa_id,
          sbj.subject_id,
          sbj.season,
          sbj.time_period,
          sbj.timeutc,
          sbj.month,
          sbj.year,
          sbj.dateutc,
          sbj.location AS image_url
        FROM
          wildcam_gorongosa_subjects_201601_16000 AS sbj
        LEFT JOIN
          wildcam_gorongosa_cameras_201601 AS cam
        ON
          sbj.camera = cam.id
      `,
      
      //Select all the photos from a specific camera. Similar to selectForDownload
      'selectCameraData': `
        SELECT
          DISTINCT(sbjagg.location)
        FROM
          wildcam_gorongosa_cameras_201601 AS cam
        INNER JOIN
          (
          SELECT
            sbj.camera,
            sbj.location,
            sbj.month,
            sbj.year,
            sbj.season,
            sbj.time_period,
            sbj.timeutc,
            sbj.dateutc,
            sbj.gorongosa_id,
            agg.species
          FROM
            wildcam_gorongosa_subjects_201601_16000 AS sbj
          INNER JOIN
            (
            SELECT * FROM wildcam_gorongosa_aggregations_201603a WHERE num_classifications >= 5
            ) AS agg
          ON
            sbj.subject_id = agg.subject_id
          )
        AS
          sbjagg
        ON
          cam.id = sbjagg.camera
        {WHERE}
      `,
      
      //Select a single camera, mostly for the camera's metadata.
      'selectCameraMetadata': 'SELECT * FROM wildcam_gorongosa_cameras_201601 {WHERE}',
    }
  },
  
  //The map visualisation bits. Compatible with Leaflet tech.
  'map': {
    'centre': {  //Some arbitrary point in Gorongosa National Park. 
      "latitude": -18.9278,
      "longitude": 34.45,
      "zoom": 11
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
        'name': 'gorongosa_national_park',
        'label': 'Gorongosa National Park',
        'data': gorongosaGeodata,
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
        'data': vegetationGeodata,
        'style': function (feature) {
          let color = '#ccc';
          if (feature && feature.properties) {
            switch (feature.properties.NAME) {
              case 'Miombo Woodland':
                color = '#063'; break;
              case 'Mixed Savanna and Woodland':
                color = '#693'; break;
              case 'Floodplain Grassland':
                color = '#3c9'; break;
              case 'Limestone Gorges':
                color = '#cc0'; break;
              case 'Montane Woodland':
                color = '#c3c'; break;
              case 'Montane Forest':
                color = '#606'; break;
              case 'Montane Grassland':
                color = '#30c'; break;
              case 'Lake Urema':
                color = '#0ff'; break;
              case 'Inselberg':
                color = '#f30'; break;
            }
          }
          
          return {
            stroke: false,
            fill: true,
            fillColor: color,
            fillOpacity: 0.2,
            interactive: false,
          };
        },
      },
    ],
    'legend': {
      'type': 'simple',
      'items': {
        '#063': 'Miombo Woodland',
        '#693': 'Mixed Savanna and Woodland',
        '#3c9': 'Floodplain Grassland',
        '#cc0': 'Limestone Gorges',

        '#c3c': 'Montane Woodland',
        '#606': 'Montane Forest',
        '#30c': 'Montane Grassland',

        '#0ff': 'Lake Urema',
        '#f30': 'Inselberg'
      },
    },
    'filters': {
      'species': {
        'label': 'Species',
        'type': 'multichoice',
        'options': [
          {
            'value': "Aardvark",
            'label': "Aardvarks"
          },
          {
            'value': "Baboon",
            'label': "Baboons"
          },
          {
            'value': "Bird (other)",
            'label': "Birds (other)"
          },
          {
            'value': "Bushbuck",
            'label': "Bushbucks"
          },
          {
            'value': "Bushpig",
            'label': "Bushpigs"
          },
          {
            'value': "Caracal",
            'label': "Caracals"
          },
          {
            'value': "Civet",
            'label': "Civets"
          },
          {
            'value': "Crane",
            'label': "Cranes"
          },
          {
            'value': "Duiker",
            'label': "Duikers"
          },
          {
            'value': "Eland",
            'label': "Elands"
          },
          {
            'value': "Elephant",
            'label': "Elephants"
          },
          {
            'value': "Genet",
            'label': "Genets"
          },
          {
            'value': "Ground Hornbill",
            'label': "Ground Hornbills"
          },
          {
            'value': "Hare",
            'label': "Hares"
          },
          {
            'value': "Hartebeest",
            'label': "Hartebeests"
          },
          {
            'value': "Hippopotamus",
            'label': "Hippopotami"
          },
          {
            'value': "Honey Badger",
            'label': "Honey Badgers"
          },
          {
            'value': "Hyena",
            'label': "Hyenas"
          },
          {
            'value': "Impala",
            'label': "Impalas"
          },
          {
            'value': "Jackal",
            'label': "Jackals"
          },
          {
            'value': "Kudu",
            'label': "Kudus"
          },
          {
            'value': "Leopard",
            'label': "Leopards"
          },
          {
            'value': "Lion (cub)",
            'label': "Lion Cubs"
          },
          {
            'value': "Lion (female)",
            'label': "Lions (Females)"
          },
          {
            'value': "Lion (male)",
            'label': "Lions (Males)"
          },
          {
            'value': "Mongoose",
            'label': "Mongoose"
          },
          {
            'value': "Nyala",
            'label': "Nyalas"
          },
          {
            'value': "Oribi",
            'label': "Oribis"
          },
          {
            'value': "Otter",
            'label': "Otters"
          },
          {
            'value': "Pangolin",
            'label': "Pangolins"
          },
          {
            'value': "Porcupine",
            'label': "Porcupines"
          },
          {
            'value': "Raptor (other)",
            'label': "Raptors (other)"
          },
          {
            'value': "Reedbuck",
            'label': "Reedbucks"
          },
          {
            'value': "Reptile",
            'label': "Reptiles"
          },
          {
            'value': "Rodent",
            'label': "Rodents"
          },
          {
            'value': "Sable Antelope",
            'label': "Sable Antelopes"
          },
          {
            'value': "Samango Monkey",
            'label': "Samango Monkeys"
          },
          {
            'value': "Secretary bird",
            'label': "Secretary Birds"
          },
          {
            'value': "Serval",
            'label': "Servals"
          },
          {
            'value': "Vervet Monkey",
            'label': "Vervet Monkeys"
          },
          {
            'value': "Vulture",
            'label': "Vultures"
          },
          {
            'value': "Warthog",
            'label': "Warthogs"
          },
          {
            'value': "Waterbuck",
            'label': "Waterbucks"
          },
          {
            'value': "Weasel",
            'label': "Weasels"
          },
          {
            'value': "Wildcat",
            'label': "Wildcats"
          },
          {
            'value': "Wild Dog",
            'label': "Wild Dogs"
          },
          {
            'value': "Wildebeest",
            'label': "Wildebeest"
          },
          {
            'value': "Zebra",
            'label': "Zebras"
          },
          {
            'value': "Human",
            'label': "Humans"
          },
          {
            'value': "Fire",
            'label': "Fire!"
          },
          {
            'value': "Nothing here",
            'label': "(Nothing)"
          }
        ]
      },
      'veg_type': {
        'label': 'Habitats',
        'type': 'multichoice',
        'options': [
          {
            'value': "Limestone Gorge",
            'label': "Limestone Gorge"
          },
          {
            'value': "Floodplain Grassland",
            'label': "Floodplain Grassland"
          },
          {
            'value': "Miombo Woodland",
            'label': "Miombo Woodland"
          },
          {
            'value': "Mixed Savanna and Woodland",
            'label': "Mixed Savanna and Woodland"
          }
        ]
      },
      'season': {
        'label': 'Seasons',
        'type': 'multichoice',
        'options': [
          {
            'value': "Wet Jan-Mar",
            'label': "Wet (Jan-Mar)"
          },
          {
            'value': "WetDry Apr-Jun",
            'label': "Wet-Dry (Apr-Jun)"
          },
          {
            'value': "Dry Jul-Sep",
            'label': "Dry (Jul-Sep)"
          },
          {
            'value': "DryWet Oct-Dec",
            'label': "Dry-Wet (Oct-Dec)"
          }
        ]
      },
      'time_period': {
        'label': 'Times of Day',
        'type': 'multichoice',
        'options': [
          {
            'value': "Dawn 0557-0622",
            'label': "Dawn (0557 - 0622)"
          },
          {
            'value': "Day 0623-1709",
            'label': "Day (0623 - 1709)"
          },
          {
            'value': "Dusk 1710-1735",
            'label': "Dusk (1710 - 1735)"
          },
          {
            'value': "Night 1736-0556",
            'label': "Night (1736 - 0556)"
          }
        ]
      },
    }
  },
  
  //Misc stuff related to the program
  'program': {
    dataGuideURL: '/#/wildcam-gorongosa-lab/explorers/data-guide/',
    transformDownloadData: function (csvData) {
      if (csvData && csvData.data && csvData.data.length > 0 && csvData.errors.length === 0) {
        return Promise.resolve(transformGorongosaDownloadData(csvData));
      }

      if (csvData && csvData.errors.length > 0) {
        return Promise.reject(csvData.errors[0].message);
      }

      return Promise.resolve(null);      
    }
  },
};

function transformGorongosaDownloadData (csvData) {
  let output = '';
  
  const tgtColumns = [
    "image_id","camera","longitude","latitude","date","month","year","season","time_period","veg_type","human_structure","distance_human_m","water_type","distance_water_m","species","species_count","percentage_resting","percentage_standing","percentage_moving","percentage_eating","percentage_interacting","young_present","horns","image_url"
  ];
  const srcColumns = csvData.data[0];
  
  output = tgtColumns.map(str => csvStr(str)).join(',') + '\n';
  
  for (let i = 1; i < csvData.data.length; i ++) {
    let srcRow = csvData.data[i];
    let tgtRow = [];
    
    if (srcRow.length < tgtColumns.length) continue;  // Ignore empty rows
    
    tgtColumns.forEach(tgtCol => {
      const cellIndex = srcColumns.findIndex(i => i===tgtCol);
      const cell = (cellIndex >= 0) ? srcRow[cellIndex] : '';
      tgtRow.push(cell);
    });
    
    output += tgtRow.map(str => csvStr(str)).join(',') + '\n';
  }
  
  return output;
}

function csvStr(str) {
  return '"' + str.replace(/"/g, '""') + '"';
}

export default mapConfig;
