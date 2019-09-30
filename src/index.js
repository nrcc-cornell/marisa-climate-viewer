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

import React from 'react';
import ReactDOM from 'react-dom';

//Components
import App from './components/App';

//Styles
import './styles/index.css';

//Mobx
import store from './stores';
import { Provider } from 'mobx-react';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
