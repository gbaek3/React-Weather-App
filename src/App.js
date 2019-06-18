import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import Homepage from '../src/components/Homepage'
import './App.css';

const App = () => (
  <HashRouter>
    <div>
      <Route exact path="/" component={Homepage} />
    </div>
  </HashRouter>
);

export default App;
