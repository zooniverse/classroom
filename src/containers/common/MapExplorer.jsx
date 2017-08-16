/*
Map Explorer
============

********************************************************************************
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import superagent from 'superagent';

import L from 'leaflet';

class MapExplorer extends React.Component {
  constructor(props) {
    super(props);
    
    this.initMapExplorer = this.initMapExplorer.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
    this.updateDataLayer = this.updateDataLayer.bind(this);
    
    this.map = null;
    this.dataLayer = null;
  }
  
  //----------------------------------------------------------------

  initMapExplorer() {
    if (this.map) return;  //Don't initialise the map if a map already exists.
    if (!this.props.mapConfig) return;
    
    //Prepare the actual map. POWERED BY LEAFLET!
    //--------------------------------
    this.map = new L.Map('mapVisuals', {
      center: [this.props.mapConfig.map.centre.latitude, this.props.mapConfig.map.centre.longitude],  //Lat-Long
      zoom: this.props.mapConfig.map.centre.zoom,
    });
    //--------------------------------
    
    //Prepare the tile (map base) layers.
    //--------------------------------
    const tileLayers = {};
    this.props.mapConfig.map.tileLayers.map((layer, index) => {
      const tl = L.tileLayer(layer.url, { attribution: layer.attribution, });
      tileLayers[layer.name] = tl;
      if (index === 0) tl.addTo(this.map);  //Use the first tile layer as the default tile layer.
    });
    //--------------------------------
    
    //Prepare the dynamic data layer.
    //Starts off empty, but is populated by updateDataLayer().
    //--------------------------------
    this.dataLayer = L.geoJson(null, {
      pointToLayer: this.renderMarker
    }).addTo(this.map);
    this.updateDataLayer(this.props);
    //--------------------------------
    
    //Prepare additional geographic information layers (park boundaries, etc)
    //--------------------------------
    const geomapLayers = {};
    //--------------------------------
    
    //Add standard 'Layer' controls
    //--------------------------------
    L.control.layers(tileLayers, {
      'Data': this.dataLayer,
      //...geomapLayers
    }, {
      position: 'topleft',
      collapsed: true,
    }).addTo(this.map);
    //--------------------------------
  }
  
  //----------------------------------------------------------------
  
  updateDataLayer(props = this.props) {
    if (!this.map || !this.props.mapConfig || !this.dataLayer) return;
    
    //const TEST_SQL = 'SELECT * FROM cameras'
    //const TEST_URL = 'http://wildcam-darien.carto.com/api/v2/sql?format=GeoJSON&q=' + encodeURIComponent(TEST_SQL);
    const TEST_URL = this.props.mapConfig.database.url.replace(
      '{SQLQUERY}',
      this.props.mapConfig.database.queries.selectCameras.replace('{WHERE}', '')
    );
    
    superagent.get(TEST_URL)
    .then(response => {
      if (response.ok && response.body) {
        return response.body;
      }
      throw 'ERROR (MapExplorer): invalid response';
    })
    .then(geojson => {
      this.dataLayer.clearLayers();
      this.dataLayer.addData(geojson);
    })
    .catch(err => {
      console.error(err);
    });
    
    //this.dataLayer.clearLayers();
    //this.dataLayer.addData(geojson);
  }
  
  renderMarker(feature, latlng) {
    const marker = L.circleMarker(latlng, {
      color: '#fff',
      fillColor: '#c33',
      fillOpacity: 0.8,
      radius: 5,
    });
    return marker;
  }
  
  //----------------------------------------------------------------
  
  render() {
    return (
      <div className="map-explorer" style={{height: '90vh'}}>
        <section ref="mapVisuals" className="map-visuals">
          <link
            rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
            integrity="sha512-M2wvCLH6DSRazYeZRIm1JnYyh22purTM+FDB5CsyxtQJYeKq83arPe5wgbNmcFXGqiSH2XR8dT/fJISVA1r/zQ=="
            crossOrigin=""
          />
          <div id="mapVisuals"></div>
        </section>
      </div>
    );
  }
  
  componentDidMount() {
    this.initMapExplorer();
  }
  
  componentWillReceiveProps(nextProps) {
    //this.updateDataLayer(nextProps);
  }
  
  //----------------------------------------------------------------
}

MapExplorer.propTypes = {
  mapConfig: PropTypes.object,
};
MapExplorer.defaultProps = {
  mapConfig: {
    "database": {
      "url": "http://wildcam-darien.carto.com/api/v2/sql?format=GeoJSON&q={SQLQUERY}",
      "queries": {
        "selectCameras": "SELECT * FROM cameras {WHERE}",
      },
    },
    "map": {
      centre: {
        "latitude": 7.895,
        "longitude": -77.561,
        "zoom": 8
      },
      "tileLayers": [
        {
          "name": "Terrain",
          "url": "//server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
          "attribution": "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
        },
        {
          "name": "Terrain (Shaded)",
          "url": "//server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
          "attribution": "Tiles &copy; Esri &mdash; Source: Esri"
        },
        {
          "name": "Roads",
          "url": "http://{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png",
          "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"
        },
        {
          "name": "Satellite",
          "url": "//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          "attribution": "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        },
        {
          "name": "Plain",
          "url": "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
          "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> &copy; <a href=\"http://cartodb.com/attributions\">CartoDB</a>"
        }
      ],
    }
  },
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(MapExplorer);
