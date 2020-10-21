import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Container } from 'semantic-ui-react';
import Navbar from './Components/Navbar.js';
import Home from './Components/Home.js';
import Catalog from './Components/Catalog.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Container>
          <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/Catalog" component={Catalog} />
              <Redirect to="/" />
            </Switch>   
        </Container>
      </Router>
    </div>
  );
}

export default App;
