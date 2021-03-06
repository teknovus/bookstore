import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Container } from 'semantic-ui-react';
import Navbar from './Components/Navbar.js';
import Home from './Components/Home.js';
import Catalog from './Components/Catalog.js';
import Customers from './Components/Customers.js';
import Orders from './Components/Orders.js';
import Stock from './Components/Stock.js';
import Wholesale from './Components/Wholesale.js';
import Profit from './Components/Profit.js';
import BestSeller from './Components/BestSeller.js';
import Purchasable from './Components/Purchasable.js';
import History from './Components/History.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Container>
          <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/Catalog" component={Catalog} />
              <Route path="/Customers" component={Customers} />
              <Route path="/Orders" component={Orders} />
              <Route path="/Stock" component={Stock} />
              <Route path="/Wholesale" component={Wholesale} />
              <Route path="/Profit" component={Profit} />
              <Route path="/Bestseller" component={BestSeller} />
              <Route path="/Purchasable" component={Purchasable} />
              <Route path="/History" component={History} />
              <Redirect to="/" />
            </Switch>   
        </Container>
      </Router>
    </div>
  );
}

export default App;
