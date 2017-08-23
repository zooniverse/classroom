/*
Map Explorer - Visuals
======================

Part of the Map Explorer feature.

This feature has one function:
* visually display the aggregated data from a specific Zooniverse project on a
  geographical map.

********************************************************************************
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import Box from 'grommet/components/Box';

import L from 'leaflet';

import {
  MAPEXPLORER_INITIAL_STATE, MAPEXPLORER_PROPTYPES
} from '../../ducks/mapexplorer';

//Arbitrary values for a default map marker.
//TODO / QUESTION: make this customisable?
const DEFAULT_MARKER = {
  color: '#fff',
  fillColor: '#fc3',
  emptyFillColor: '#999',
  fillOpacity: 0.8,
  radius: 10,
  minRadius: 5,
  maxRadius: 20,
  minValue: 0,
  maxValue: 1000,
};

class MapVisuals extends React.Component {
  constructor(props) {
    super(props);
    
    this.initMapExplorer = this.initMapExplorer.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
    this.examineMarker = this.examineMarker.bind(this);
    this.updateDataLayer = this.updateDataLayer.bind(this);
    
    this.map = null;
    this.mapContainer = null;
    this.dataLayer = null;
  }
  
  //----------------------------------------------------------------

  initMapExplorer() {
    if (this.map) return;  //Don't initialise the map if a map already exists.
    if (!this.props.mapConfig) return;
    
    //Prepare the actual map. POWERED BY LEAFLET!
    //--------------------------------
    this.map = new L.Map(this.mapContainer.boxContainerRef, {
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
    Actions.getMapMarkers({
      mapConfig: this.props.mapConfig,
      filters: this.props.filters,
    });
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
  
  /*  This function acts as the "render()" action for the Leaflet map, since
      the Leaflet map isn't tied into the React lifecycle and needs to be nudged
      (via componentWillReceiveProps()) when the data state updates.
   */
  updateDataLayer(props = this.props) {
    if (!this.map || !this.dataLayer || !props.markersData) return;
    
    this.dataLayer.clearLayers();
    this.dataLayer.addData(props.markersData);  //Markers Data must be in GeoJSON format.
  }
  
  renderMarker(feature, latlng) {
    const count = (feature && feature.properties && feature.properties.count !== undefined)
      ? feature.properties.count : 0;  //Warning: assumption is `count` is an integer.
    const radius = 
      Math.max(Math.min((count - DEFAULT_MARKER.minValue) / DEFAULT_MARKER.maxValue, 1), 0) *
      (DEFAULT_MARKER.maxRadius - DEFAULT_MARKER.minRadius) +
      DEFAULT_MARKER.minRadius;
    
    const marker = L.circleMarker(latlng, {
      color: DEFAULT_MARKER.color,
      fillColor: (count > 0) ? DEFAULT_MARKER.fillColor : DEFAULT_MARKER.emptyFillColor,
      fillOpacity: DEFAULT_MARKER.fillOpacity,
      radius,
    });
    
    marker.on('click', this.examineMarker);
    return marker;
  }
  
  examineMarker(e) {
    if (!e || !e.target || !e.target.feature || !e.target.feature.properties) return;
    
    const cameraId = e.target.feature.properties.id;
    alert(`TODO: Examine camera ${cameraId}`);  //TODO: Make this a "View a single camera's photos" action.
  }
  
  //----------------------------------------------------------------
  
  render() {
    return (
      <Box className="map-visuals" ref={(c)=>{this.mapContainer=c}}></Box>
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
const mapStateToProps = (state) => ({
  markersData: state.mapexplorer.markersData,
  markersStatus: state.mapexplorer.markersStatus,
  markersError: state.mapexplorer.markersError,
  filters: state.mapexplorer.filters,
});

export default connect(mapStateToProps)(MapVisuals);
