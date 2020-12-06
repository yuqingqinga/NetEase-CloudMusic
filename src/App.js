import React, { memo } from 'react';
import {renderRoutes} from 'react-router-config'
import routes from './router';
import { HashRouter } from 'react-router-dom';

import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import AppPlayerBar from './pages/player/app-player-bar';


export default memo(function App() {
  return (
      <HashRouter>
        <AppHeader/>
        {renderRoutes(routes)}
        <AppFooter/>
        <AppPlayerBar/>
    </HashRouter>
  )
})
