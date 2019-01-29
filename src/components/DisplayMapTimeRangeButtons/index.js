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

import '../../styles/DisplayMapTimeRangeButtons.css';

var app;

@inject("store") @observer
export default class DisplayMapTimeRangeButtons extends Component {

  constructor(props) {
    super(props);
    app = this.props.store.app;
  }

  componentDidMount() {
    this.forceUpdate();
  }

  render() {

            if (app.getMapActiveStatus) {

                return (
                    <Control position="bottomleft">
                        <div className="map-year-range">
                            <button
                                className={(app.getTrendStartYear==='1950') ? "map-year-range-button-active" : "map-year-range-button-inactive"}
                                onClick={() => {app.updateTrendStartYear('1950')}}
                            >   
                                {'1950-2013'}
                            </button> 
                            &nbsp;
                            <button
                                className={(app.getTrendStartYear==='1980') ? "map-year-range-button-active" : "map-year-range-button-inactive"}
                                onClick={() => {app.updateTrendStartYear('1980')}}
                            >   
                                {'1980-2013'}
                            </button> 
                        </div>
                    </Control>

                )

            } else {
                return (false)
            }
  }

}

