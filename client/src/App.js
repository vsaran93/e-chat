import React from "react";
import Routes from './routes/routes';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();

function App() {
  return (
    <div>
      <Router history={browserHistory}>
        <Routes  history={browserHistory} />
      </Router>
    </div>
  );
}

export default App;
