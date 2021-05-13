import React from 'react';
import ReactDOM from 'react-dom';
import * as moment from 'moment';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './css/armaggedon.css';
import './css/armaggedonMobile.css';

import Header from './Header';
import Body from './Body';
import DistructList from './DistructList';
import reportWebVitals from './reportWebVitals';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asteroids: [],
      measure: 'kilometers',
      distructure: [],
      checkbox: false,
    };
    this.getAsteroids = this.getAsteroids.bind(this);
    this.handleSwitchMeasure = this.handleSwitchMeasure.bind(this);
    this.handleAsteroidToDistruct = this.handleAsteroidToDistruct.bind(this);
    this.handleAsteroidDistruct = this.handleAsteroidDistruct.bind(this);
    this.handleCancelDistruct = this.handleCancelDistruct.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

   async getAsteroids() {
     const dateNow = new Date();
     const dateParse = moment(dateNow).format('YYYY-MM-DD');

     const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateParse}&end_date=${dateParse}&api_key=DEMO_KEY`)
       .then((response) => {
         return response.json();
       })
       .then((asteroids) => {

         const asteroidsList = asteroids.near_earth_objects[dateParse];
         const newAsteroidsList = asteroidsList.reduce((acc, el) => {
           const id = el.id;
           const name = el.name.replace(/\(|\)/gi, '');
           const dangerous = el.is_potentially_hazardous_asteroid;

           const lunar = Math.round(el.close_approach_data[0].miss_distance.lunar);
           const kilometers = Math.round(el.close_approach_data[0].miss_distance.kilometers);

           const size =  Math.round(el.estimated_diameter.meters.estimated_diameter_min +
           el.estimated_diameter.meters.estimated_diameter_max);

           const asteroid = {
             id: id,
             name: name,
             dangerous: dangerous,
             markDistructure: false,
             date: dateParse,
             distance: {
               lunar: lunar,
               kilometers: `${kilometers} км`,
             },
             size: size,
           };
           return [...acc, asteroid];
         }, []);
         return newAsteroidsList;

       }).then((newList) => {
         this.setState({
           asteroids: newList,
           measure: 'kilometers',
           distructure: [],
           checkbox: false,
         });
       });
       return response;
   }

  componentDidMount() {
    this.getAsteroids();
  }

  handleSwitchMeasure(event) {
    event.preventDefault();
    const measureName = event.target.name;
    this.setState({
      ...this.state,
      measure: measureName,
      distructure: [...this.state.distructure],
      checkbox: false,
    });
  }

  handleAsteroidToDistruct(event) {
    const id = event.target.id;

    const asteroid = this.state.asteroids.filter((asteroid) => asteroid.id === id)[0];
    const checkDestructureList = this.state.distructure.filter((el) => el.id === asteroid.id);

    if (checkDestructureList.length === 0) {
      this.setState({
        ...this.state,
        distructure: [...this.state.distructure, asteroid],
        checkbox: false,
      });
    } else {
      this.setState({ ...this.state });
    }
  }

  handleAsteroidDistruct(event) {
    const id = event.target.id;
    const asteroid = this.state.asteroids.map((asteroid) => {
      if (asteroid.id === id) {
        asteroid.markDistructure = true;
      }
    })[0];
  }

  handleCancelDistruct(event) {
    const id = event.target.id;
    const asteroid = this.state.asteroids.map((asteroid) => {
      if (asteroid.id === id) {
        asteroid.markDistructure = false;
      }
    })[0];

    const deleteAsteroidFromList = this.state.distructure.filter((asteroid) => asteroid.id !== id);
    this.setState({
      ...this.state,
      measure: 'kilometers',
      distructure: [...deleteAsteroidFromList],
      checkbox: false,
    });
  }

  handleCheckbox(event) {
    const checked = this.state.checkbox ? false : true;
    this.setState({
      ...this.state,
      checkbox: checked,
    });
  }

  render() {
    return (
      <div>
        <Header/>
         <Switch>
           <Route path="/destroy">
             <DistructList
               value={this.state}
               distruct={this.handleAsteroidDistruct}
               cancel={this.handleCancelDistruct}
               />
           </Route>
          <Route path="/">
            <Body value={this.state}
                  checkbox={this.handleCheckbox}
                  measure={this.handleSwitchMeasure}
                  distruct={this.handleAsteroidToDistruct}/>
          </Route>
        </Switch>
        <div class="container">
          <footer class='footer'>
           <p class='main-text'>2021 © все права и планета защищены</p>
          </footer>
        </div>
     </div>
    );
  }

}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
