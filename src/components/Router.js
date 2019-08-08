import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import PictureDetails from './PictureDetails/PictureDetails';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/:objectType?" component={App} />
      <Route path="/picture/:objectNumber" component={PictureDetails} />
    </Switch>
  </BrowserRouter>
);

export default Router;
