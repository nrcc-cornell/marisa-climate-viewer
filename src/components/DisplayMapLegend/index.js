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

import Control from 'react-leaflet-control';

import '../../styles/DisplayMapLegend.css';

var app;

@inject("store") @observer
export default class DisplayMapLegend extends Component {

  constructor(props) {
    super(props);
    app = this.props.store.app;
  }

  componentDidMount() {
    this.forceUpdate();
  }

  render() {

            if (app.getMapActiveStatus) {

                // suffix for values in tooltip
                let valueSuffix = {}
                valueSuffix['seasonLength'] = ' days'
                valueSuffix['gddGrowingSeason'] = ' GDDs'
                valueSuffix['avgtGrowingSeason'] = '°F'
                valueSuffix['maxtGrowingSeason'] = '°F'
                valueSuffix['mintGrowingSeason'] = '°F'
                valueSuffix['daysAboveTemp'] = ' days'
                valueSuffix['pcpnGrowingSeason'] = ' inches'
                valueSuffix['daysAbovePcpn'] = ' days'

                let precision = app.getPrecision()

                return (
                  <Control position="bottomright">
                    <div className="map-legend">
                        <div className="map-legend-title">{valueSuffix[app.getDisplaySeries]}/Decade</div>
                        <div className={"color-box "+ ((app.getDisplaySeries==="pcpnGrowingSeason" || app.getDisplaySeries==="daysAbovePcpn") ? "green3":"red4")}></div><span className="map-legend-label">{'> '+(app.getLegendThresholds()[5]*10.).toFixed(precision)}</span><br/>
                        <div className={"color-box "+ ((app.getDisplaySeries==="pcpnGrowingSeason" || app.getDisplaySeries==="daysAbovePcpn") ? "green2":"red3")}></div><span className="map-legend-label">{(app.getLegendThresholds()[4]*10.).toFixed(precision)} - {(app.getLegendThresholds()[5]*10.).toFixed(precision)}</span><br/>
                        <div className={"color-box "+ ((app.getDisplaySeries==="pcpnGrowingSeason" || app.getDisplaySeries==="daysAbovePcpn") ? "green1":"red2")}></div><span className="map-legend-label">{(app.getLegendThresholds()[3]*10.).toFixed(precision)} - {(app.getLegendThresholds()[4]*10.).toFixed(precision)}</span><br/>
                        <div className="color-box white"></div><span className="map-legend-label">{(0.00).toFixed(precision)}</span><br/>
                        <div className={"color-box "+ ((app.getDisplaySeries==="pcpnGrowingSeason" || app.getDisplaySeries==="daysAbovePcpn") ? "brown1":"blue2")}></div><span className="map-legend-label">{(app.getLegendThresholds()[1]*10.).toFixed(precision)} - {(app.getLegendThresholds()[2]*10.).toFixed(precision)}</span><br/>
                        <div className={"color-box "+ ((app.getDisplaySeries==="pcpnGrowingSeason" || app.getDisplaySeries==="daysAbovePcpn") ? "brown2":"blue3")}></div><span className="map-legend-label">{(app.getLegendThresholds()[0]*10.).toFixed(precision)} - {(app.getLegendThresholds()[1]*10.).toFixed(precision)}</span><br/>
                        <div className={"color-box "+ ((app.getDisplaySeries==="pcpnGrowingSeason" || app.getDisplaySeries==="daysAbovePcpn") ? "brown3":"blue4")}></div><span className="map-legend-label">{'< '+(app.getLegendThresholds()[0]*10.).toFixed(precision)}</span><br/>
                    </div>
                  </Control>  
                )

            } else {
                return (false)
            }
  }

}

