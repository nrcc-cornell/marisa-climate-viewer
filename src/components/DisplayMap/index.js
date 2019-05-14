///////////////////////////////////////////////////////////////////////////////
//
// Climate Smart Farming Climate Change in Your County
// Copyright (c) 2018 Cornell Institute for Climate Smart Solutions
// All Rights Reserved
//
// This software is published under the provisions of the GNU General Public
// License <http://www.gnu.org/licenses/>. A text copy of the license can be
// found in the file 'LICENSE' included with this software.
//
// A text copy of the copyright notice, licensing conditions and disclaimers
// is available in the file 'COPYRIGHT' included with this software.
//
///////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import Loader from 'react-loader-advanced';

import 'leaflet/dist/leaflet.css';
//import Control from 'react-leaflet-control';
//import { Map, GeoJSON, LayersControl, TileLayer } from 'react-leaflet';
import { Map, GeoJSON, TileLayer } from 'react-leaflet';

import DisplayMapTooltip from '../../components/DisplayMapTooltip';
import DisplayMapLegend from '../../components/DisplayMapLegend';
import DisplayMapTimeRangeButtons from '../../components/DisplayMapTimeRangeButtons';

import '../../styles/DisplayMap.css';
import '../../styles/loader.css';

const mapContainer = 'map-container';
const mapCenter = [40.0, -77.0];
const zoomLevel = 6;
const minZoomLevel = 6;
const maxZoomLevel = 8;
const spinner = <div className="loader"></div>
var app;

@inject("store") @observer
export default class DisplayMap extends Component {

  constructor(props) {
    super(props);
    app = this.props.store.app;
  }

  componentDidMount() {
    this.forceUpdate();
  }

  render() {

            if (app.getMapActiveStatus) {

                let precision = app.getPrecision()
                let yearRange = app.getTrendStartYear+'-2013'
                let precipThreshold = app.getPrecipThreshold

                return (
                  <div className="csftool-display-map">
                    <Loader message={spinner} show={app.getLoaderCountyGeojson} priority={10} backgroundStyle={{backgroundColor: null}} hideContentOnLoad={false}>
                    <Map
                        center={mapCenter}
                        zoom={zoomLevel}
                        minZoom={minZoomLevel}
                        maxZoom={maxZoomLevel}
                        attributionControl={true}
                        className={mapContainer}
                        style={{ height:500, width:724 }}
                    >
                        <TileLayer
                            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <GeoJSON
                            data={app.getCountyGeojson}
                            style={app.countyFeatureStyle}
                            onEachFeature={app.countyOnEachFeature}
                        />

                        <GeoJSON
                            data={app.getWatershedGeojson}
                            style={app.watershedFeatureStyle}
                        />

                        <DisplayMapTimeRangeButtons />
                        <DisplayMapLegend />
                        <DisplayMapTooltip />

                    </Map>
                    </Loader>
                  </div>
                )

            } else {
                return (false)
            }
  }

}

