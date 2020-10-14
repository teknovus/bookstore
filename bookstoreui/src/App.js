import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Container } from 'semantic-ui-react';
import Home from './Components/Home.js';
import Other from './Components/Other.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Container>       
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/other" component={Other} />
            <Redirect to="/" />
          </Switch>
          </Container>
      </Router>
    </div>
  );
}

export default App;
