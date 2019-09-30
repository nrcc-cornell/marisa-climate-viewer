///////////////////////////////////////////////////////////////////////////////
//
// MARISA Climate Change Tool
// Copyright (c) 2019 Northeast Regional Climate Center
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
import { inject, observer } from 'mobx-react';
//import GddBaseSelect from '../../components/GddBaseSelect';
import PrecipThresholdSelect from '../../components/PrecipThresholdSelect';
import TempThresholdSelect from '../../components/TempThresholdSelect';
//import SeasonThresholdSelect from '../../components/SeasonThresholdSelect';
import Loader from 'react-loader-advanced';

import '../../styles/ChartRadioSelect.css';

@inject("store") @observer
class ChartRadioSelect extends Component {

  render() {
        let accordion_type = false
        let temperature_tab_status = true
        let precipitation_tab_status = true

        return (
            <div className='radio-input-div'>
            <div className='radio-div'>
                <form>
                  <div className="select-title">
                    <h3 className="u-position-relative accordion__title--animated">
                        Temperature
                    </h3>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="avgtGrowingSeason" 
                          checked={this.props.store.app.getDisplaySeries === 'avgtGrowingSeason'} 
                          onChange={this.props.store.app.updateDisplaySeries} />
                      <span>Average Temperature</span>
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="maxtGrowingSeason" 
                          checked={this.props.store.app.getDisplaySeries === 'maxtGrowingSeason'} 
                          onChange={this.props.store.app.updateDisplaySeries} />
                      <span>High Temperature</span>
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="mintGrowingSeason" 
                          checked={this.props.store.app.getDisplaySeries === 'mintGrowingSeason'} 
                          onChange={this.props.store.app.updateDisplaySeries} />
                      <span>Low Temperature</span>
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="daysAboveTemp" 
                          checked={this.props.store.app.getDisplaySeries === 'daysAboveTemp'} 
                          onChange={this.props.store.app.updateDisplaySeries} />
                      <span>Days w/ High > 90°F</span>
                    </label>
                  </div>
                  <div className="hide-temp-threshold-select">
                      <TempThresholdSelect/>
                  </div>
                  <div className="select-title">
                    <h3 className="u-position-relative">
                        Precipitation
                    </h3>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="pcpnGrowingSeason" 
                          checked={this.props.store.app.getDisplaySeries === 'pcpnGrowingSeason'} 
                          onChange={this.props.store.app.updateDisplaySeries} />
                      <span>Total Precipitation</span>
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="daysAbovePcpn" 
                          checked={this.props.store.app.getDisplaySeries === 'daysAbovePcpn'} 
                          onChange={this.props.store.app.updateDisplaySeries} />
                      <span>Heavy Precipitation</span>
                    </label>
                  </div>
                  <div className={(this.props.store.app.getDisplaySeries === 'daysAbovePcpn') ? "precip-threshold-select" : "hide-precip-threshold-select"}>
                      <PrecipThresholdSelect/>
                  </div>
                </form>
                  <div className={(this.props.store.app.getMapActiveStatus) ? "hide-climate-projections" : "show-climate-projections"}>
                  <div className="select-title">
                    <h3 className="u-position-relative">
                        Climate Projections
                    </h3>
                  </div>
                  <Loader message={'Loading Projections...'} messageStyle={{color:'#ff0000', fontWeight:'bold'}} show={this.props.store.app.isProjectionLoading} priority={10} backgroundStyle={{backgroundColor: null}} hideContentOnLoad={true}>
                <form>
                  <div className="checkbox">
                    <label className={this.props.store.app.isProjectionLoading ? "label-for-check-loading" : "label-for-check"}>
                      <input
                          type="checkbox"
                          value="rcp85"
                          disabled={this.props.store.app.isProjectionLoading}
                          checked={this.props.store.app.getProjectionView && this.props.store.app.getModelScenario==="rcp85"}
                          onChange = {this.props.store.app.updateModelScenarioFromCheckbox}
                      />
                      {(this.props.store.app.isProjectionLoading) ? "loading data ..." : "High Emissions"}
                    </label>
                  </div>
                  <div className="checkbox">
                    <label className={this.props.store.app.isProjectionLoading ? "label-for-check-loading" : "label-for-check"}>
                      <input
                          type="checkbox"
                          value="rcp45"
                          disabled={this.props.store.app.isProjectionLoading}
                          checked={this.props.store.app.getProjectionView && this.props.store.app.getModelScenario==="rcp45"}
                          onChange = {this.props.store.app.updateModelScenarioFromCheckbox}
                      />
                      {(this.props.store.app.isProjectionLoading) ? "loading data ..." : "Low Emissions"}
                    </label>
                  </div>
                </form>
                  </Loader>
                  </div>
            </div>
            </div>
        )
  }

};

export default ChartRadioSelect;
