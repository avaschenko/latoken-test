import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import './App.css';
import { Finance } from './modules/Finance/components';


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
         <h1>
           Home Finance
         </h1>
          <Finance />
        </div>
      </Provider>
    );
  }
}

export default App;
