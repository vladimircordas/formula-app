
import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
// import createBrowserHistory from 'history/createBrowserHistory';  history={createBrowserHistory}
import history from './history';
import Drawer from './views/Header'
import Home from './views/Home';
import Drivers from './views/Drivers';
import Teams from './views/Teams';
import Races from './views/Races';
import DriverDetails from './components/drivers/DriverDetails';
import TeamDetails from './components/teams/TeamDetails';
import RaceDetails from './components/races/RaceDetails';
import './App.css';

import Footer from './views/Footer';

import NotFound from './views/NotFound';


import SelectYear from './components/SelectYear';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedYear: 2019
    }
  }



  getSelectedYear = (year) => {
    this.setState({
      selectedYear: year
    });
  }

  render() {
    var year = this.state.selectedYear;
    // console.log('app ' + this.state.selectedYear)
    return (
      <div>
        <Router history={history} basename={process.env.PUBLIC_URL}>
          <SelectYear getYear={this.getSelectedYear} year={year} />
          <Drawer year={year} />
          <div className="mainBody">
            <Switch>

              <Route exact path='/formula-app/' component={() => <Home year={year} />} />

              <Route exact path='/formula-app/drivers' component={() => <Drivers year={year} />} />
              <Route exact path='/formula-app/drivers/:driver' component={(props) => <DriverDetails {...props} year={year} />} />

              <Route exact path='/formula-app/teams' component={() => <Teams year={year} />} />
              <Route exact path='/formula-app/teams/:team' component={(props) => <TeamDetails {...props} year={year} />} />

              <Route exact path='/formula-app/races' component={() => <Races year={year} />} />
              <Route exact path='/formula-app/races/:race' component={(props) => <RaceDetails {...props} year={year} />} />

              <Route component={NotFound} />
              
            </Switch>
          </div>
        <Footer />
        </Router>
      </div>
    );
  }
}

export default App;