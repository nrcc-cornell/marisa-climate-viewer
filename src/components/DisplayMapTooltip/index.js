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

import '../../styles/DisplayMapTooltip.css';

var app;

@inject("store") @observer
export default class DisplayMapTooltip extends Component {

  constructor(props) {
    super(props);
    app = this.props.store.app;
  }

  componentDidMount() {
    this.forceUpdate();
  }

  render() {

            if (app.getMapActiveStatus) {

                // Chart title, dependent on variable
                let mapTitle = {}
                mapTitle['seasonLength'] = 'Growing Season Length (consecutive days > '+this.props.store.app.getSeasonThreshold+'°F)'
                mapTitle['gddGrowingSeason'] = 'Annual Growing Degree Days, base '+this.props.store.app.getGddBase+'°F'
                mapTitle['avgtGrowingSeason'] = 'Annual Average Temperature'
                mapTitle['maxtGrowingSeason'] = 'Annual Average High Temperature'
                mapTitle['mintGrowingSeason'] = 'Annual Average Low Temperature'
                mapTitle['daysAboveTemp'] = 'Number of days w/ high temp > '+this.props.store.app.getTempThreshold+'°F'
                mapTitle['pcpnGrowingSeason'] = 'Total Annual Precipitation'
                mapTitle['daysAbovePcpn'] = 'Number of days w/ precipitation > '+this.props.store.app.getPrecipThreshold+'"'

                return (
                    <Control position="topright">
                        <div className="map-tooltip">
                            <div className="map-tooltip-title">{mapTitle[app.getDisplaySeries]}, {app.getTrendStartYear}-2013 Trend</div>
                            <div className="map-tooltip-content">
                                {app.getMouseoverMessage}
                            </div>
                        </div>
                    </Control>
                )

            } else {
                return (false)
            }
  }

}

