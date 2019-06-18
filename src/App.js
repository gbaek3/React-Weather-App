import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Homepage from '../src/components/Homepage'
import './App.css';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Homepage} />
    </div>
  </BrowserRouter>
);

export default App;
