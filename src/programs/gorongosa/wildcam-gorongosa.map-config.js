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
      'selectCameraCount': 'SELECT cam.*, COUNT(sbjagg.*) as count FROM wildcam_gorongosa_cameras_201601 AS cam LEFT JOIN (SELECT sbj.camera, sbj.location, sbj.dateutc, sbj.season, sbj.time_period, agg.species, agg.subject_id FROM wildcam_gorongosa_subjects_201601_16000 AS sbj INNER JOIN wildcam_gorongosa_aggregations_201603a AS agg ON sbj.subject_id = agg.subject_id) AS sbjagg ON cam.id = sbjagg.camera {WHERE} GROUP BY cam.cartodb_id ORDER BY count DESC',
      
      //Get all the details for all the (filtered) results.
      'selectForDownload': 'SELECT cam.*, sbjagg.* FROM wildcam_gorongosa_cameras_201601 AS cam INNER JOIN (SELECT sbj.camera, sbj.location, sbj.month, sbj.year, sbj.season, sbj.time_period, sbj.timeutc, sbj.dateutc, sbj.gorongosa_id, agg.species, agg.num_classifications FROM wildcam_gorongosa_subjects_201601_16000 AS sbj INNER JOIN wildcam_gorongosa_aggregations_201603a AS agg ON sbj.subject_id = agg.subject_id) AS sbjagg ON cam.id = sbjagg.camera {WHERE}',
      
      //Get all the minimum Subject details for all the (filtered) results. Has Order By and Limit clauses.
      'selectForAssignment': 'SELECT sbjagg.subject_id, sbjagg.location FROM wildcam_gorongosa_cameras_201601 AS cam INNER JOIN (SELECT sbj.subject_id, sbj.camera, sbj.location, sbj.month, sbj.year, sbj.season, sbj.time_period, sbj.timeutc, sbj.dateutc, sbj.gorongosa_id, agg.species, agg.num_classifications FROM wildcam_gorongosa_subjects_201601_16000 AS sbj INNER JOIN wildcam_gorongosa_aggregations_201603a AS agg ON sbj.subject_id = agg.subject_id) AS sbjagg ON cam.id = sbjagg.camera {WHERE} {ORDER} {LIMIT}',      
      
      //Select all the photos from a specific camera. Similar to selectForDownload
      'selectCameraData': 'SELECT DISTINCT(sbjagg.location) FROM wildcam_gorongosa_cameras_201601 AS cam INNER JOIN (SELECT sbj.camera, sbj.location, sbj.month, sbj.year, sbj.season, sbj.time_period, sbj.timeutc, sbj.dateutc, sbj.gorongosa_id, agg.species FROM wildcam_gorongosa_subjects_201601_16000 AS sbj INNER JOIN wildcam_gorongosa_aggregations_201603a AS agg ON sbj.subject_id = agg.subject_id) AS sbjagg ON cam.id = sbjagg.camera {WHERE}',
      
      //Select a single camera, mostly for the camera's metadata.
      'selectCameraMetadata': 'SELECT * FROM wildcam_gorongosa_cameras_201601 {WHERE}',
    }
  },
  
  //The map visualisation bits. Compatible with Leaflet tech.
  'map': {
    'centre': {  //Some arbitrary point between Soberania National Park and Darien National Park. 
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
      /*{
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
              case 'Evergreen tropical ombrophilous broadleaf submontane (500 - 1,000 m Caribbean, 700 - 1,200 m Pacific)':
                color = '#9c3'; break;
              case 'Production system with significant natural or spontaneous woody vegetation (10 - 50%)':
                color = '#993'; break;
              case 'Production system with significant natural or spontaneous woody vegetation (<10%)':
                color = '#693'; break;
              case 'Evergreen ombrophylous tropical lowland broadleaf forest - heavily logged':
                color = '#663'; break;
              case 'Tropical lowland semi-deciduous forest - heavily logged':
                color = '#393'; break;
              case 'Water region':
                color = '#39c'; break;
              case 'Tropical lowland semi-deciduous forest':
                color = '#9c6'; break;
              case 'Tropical lowland semi-deciduous forest - minimally logged':
                color = '#6c6'; break;
              case 'Evergreen tropical ombrophilous broadleaf montane montane (1,000 - 1,500 m Caribbean, 1,200 - 1,800 m Pacific)':
                color = '#cc6'; break;
              case 'Evergreen, broad-leaved tropical broad-leaved evergreen forest':
                color = '#9c9'; break;
            }
          }
          
          return {
            stroke: false,
            fill: true,
            fillColor: color,
            fillOpacity: 0.5,
          };
        },
      },*/
    ],
    'legend': {
      'type': 'simple',
      'items': {
        '#9c3': 'Work In Progress',
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
  }
};

export default mapConfig;