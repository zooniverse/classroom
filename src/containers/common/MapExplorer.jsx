/*
Map Explorer
============

********************************************************************************
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import L from 'leaflet';

class MapExplorer extends React.Component {
  constructor(props) {
    super(props);
    
    this.initMapExplorer = this.initMapExplorer.bind(this);
    
    this.map = null;
    this.dataLayer = null;
  }
  
  componentDidMount() {
    this.initMapExplorer();
  }

  initMapExplorer() {
    if (this.map) return;
    
    let defaultTileLayer = null;
    const tileLayers = {};
    this.props.mapConfig.tileLayers.map((layer, index) => {
      const tl = L.tileLayer(layer.url, { attribution: layer.attribution, });
      tileLayers[layer.name] = tl;
      if (index === 0) defaultTileLayer = tl;
    });
    
    this.map = new L.Map('mapVisuals', {
      center: [this.props.mapConfig.centre.latitude, this.props.mapConfig.centre.longitude],  //Lat-Long
      zoom: this.props.mapConfig.centre.zoom,
      layers: defaultTileLayer  //Set the default base layer
    });
    
    const geomapLayers = {};
    
    //Bonus: Add the Layer Controls
    L.control.layers(tileLayers, {
      //'Data': dataLayers,
      //...geomapLayers
    }, {
      position: 'topleft',
      collapsed: true,
    }).addTo(this.map);
  }

  render() {
    return (
      <div className="map-explorer" style={{height: '90vh'}}>
        <link
           rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
           integrity="sha512-M2wvCLH6DSRazYeZRIm1JnYyh22purTM+FDB5CsyxtQJYeKq83arPe5wgbNmcFXGqiSH2XR8dT/fJISVA1r/zQ=="
           crossOrigin=""
        />
        <section ref="mapVisuals" className="map-visuals">
          <div id="mapVisuals"></div>
        </section>
      </div>
    );
  }
}

MapExplorer.propTypes = {
  mapConfig: PropTypes.object,
};
MapExplorer.defaultProps = {
  mapConfig: {
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
  },
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(MapExplorer);
