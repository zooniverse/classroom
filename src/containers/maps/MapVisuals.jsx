/*
Map Explorer - Visuals
======================

********************************************************************************
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import L from 'leaflet';

import {
  MAPEXPLORER_INITIAL_STATE, MAPEXPLORER_PROPTYPES
} from '../../ducks/mapexplorer';

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
    Actions.getMapMarkers(this.props.mapConfig);
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
    if (!this.map || !this.dataLayer || !props.markersData) return;
    
    this.dataLayer.clearLayers();
    this.dataLayer.addData(props.markersData);  //Markers Data must be in GeoJSON format.
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
  ...MAPEXPLORER_PROPTYPES,
};
MapVisuals.defaultProps = {
  mapConfig: null,
  ...MAPEXPLORER_INITIAL_STATE,
};
const mapStateToProps = (state) => {
  console.log('1'.repeat(100), state.mapexplorer.markersData);
  return ({
    markersData: state.mapexplorer.markersData,
    markersStatus: state.mapexplorer.markersStatus,
    markersError: state.mapexplorer.markersError,
  })
};

export default connect(mapStateToProps)(MapVisuals);
