/*
Map Explorer - Visuals
======================

********************************************************************************
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import superagent from 'superagent';
import L from 'leaflet';

class MapVisuals extends React.Component {
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
      <section ref="mapVisuals" className="map-visuals">
        <link
          rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
          integrity="sha512-M2wvCLH6DSRazYeZRIm1JnYyh22purTM+FDB5CsyxtQJYeKq83arPe5wgbNmcFXGqiSH2XR8dT/fJISVA1r/zQ=="
          crossOrigin=""
        />
        <div id="mapVisuals"></div>
      </section>
    );
  }
  
  componentDidMount() {
    this.initMapExplorer();
  }
  
  componentWillReceiveProps(nextProps) {
    this.updateDataLayer(nextProps);
  }
  
  //----------------------------------------------------------------
}

MapVisuals.propTypes = {
  mapConfig: PropTypes.object,
};
MapVisuals.defaultProps = {
  mapConfig: null,
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(MapVisuals);
