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
    
    this.map = null;
    this.tileLayers = null;
    this.dataLayers = null;
  }

  componentDidMount() {
    if (this.map) return;
    
    this.tileLayers = [
      L.tileLayer(
        '//server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        { attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community' }
      ),
    ];
    
    this.map = new L.Map('mapVisuals', {
      center: [0, 0],  //Lat-Long
      zoom: 12,
      layers: this.tileLayers[0]  //Set the default base layer
    });
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

MapExplorer.propTypes = {};
MapExplorer.defaultProps = {};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(MapExplorer);
