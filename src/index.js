import React from 'react';
import ReactDOM from 'react-dom';
import * as moment from 'moment';

import './css/armaggedon.css';
import './css/armaggedonMobile.css';

import Page from './Page';
import Measure from './Measure';
import ListItem from './ListItem';
import DistructItem from './DistructItem';
import reportWebVitals from './reportWebVitals';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asteroids: [],
      measure: 'kilometers',
      page: 'asteroids',
      distructure: [],
      checkbox: false,
    };
    this.handleSwitchMeasure = this.handleSwitchMeasure.bind(this);
    this.handleSwitchPage = this.handleSwitchPage.bind(this);
    this.handleAsteroidToDistruct = this.handleAsteroidToDistruct.bind(this);
    this.getAsteroids = this.getAsteroids.bind(this);
    this.handleFinishDistruct = this.handleFinishDistruct.bind(this);
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
           page: 'asteroids',
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
      page: 'asteroids',
      distructure: [...this.state.distructure],
      checkbox: false,
    });
  }

  handleSwitchPage(event) {
    event.preventDefault();
    const pageName = event.target.name;

    this.setState({
      ...this.state,
      measure: 'kilometers',
      page: pageName,
      distructure: [...this.state.distructure],
      checkbox: false,
    });
  }

  handleAsteroidToDistruct(event) {
    event.preventDefault();
    const pageName = event.target.name;

    const id = event.target.id;

    const asteroid = this.state.asteroids.filter((asteroid) => asteroid.id === id)[0];
    const checkDestructureList = this.state.distructure.filter((el) => el.id === asteroid.id);

    if (checkDestructureList.length === 0) {
      this.setState({
        ...this.state,
        measure: 'kilometers',
        page: pageName,
        distructure: [...this.state.distructure, asteroid],
        checkbox: false,
      });
    } else {
      this.setState({
        ...this.state,
        measure: 'kilometers',
        page: pageName,
        distructure: [...this.state.distructure],
        checkbox: false,
      });
    }
  }

  handleFinishDistruct(event) {
    event.preventDefault();
    const pageName = event.target.name;

    const id = event.target.id;
    const asteroid = this.state.asteroids.map((asteroid) => {
      if (asteroid.id === id) {
        asteroid.markDistructure = true;
      }
    })[0];
    this.handleSwitchPage(event);
  }

  handleCancelDistruct(event) {
    event.preventDefault();
    const pageName = event.target.name;

    const id = event.target.id;
    const asteroid = this.state.asteroids.map((asteroid) => {
      if (asteroid.id === id) {
        asteroid.markDistructure = false;
      }
    })[0];
    this.handleSwitchPage(event);
    const deleteAsteroidFromList = this.state.distructure.filter((asteroid) => asteroid.id !== id);
    this.setState({
      ...this.state,
      measure: 'kilometers',
      page: pageName,
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
        <div class="container-header">
         <header class='header'>
           <div class='header__promo'>
             <h1 class='h1'>armaggedon v</h1>
             <p class='header__text main-text'>
               Сервис мониторинга и уничтожения
                астероидов, опасно подлетающих к Земле.
             </p>
           </div>
           <Page value={this.state} switch={this.handleSwitchPage}/>
         </header>
        </div>

        <div className={ this.state.page == 'asteroids'
                                     ? 'container'
                                     : 'hidden'}>
          <div class='asteroids-menu'>

            <div class='description'>
              <label class="main-text">
                <input type="checkbox" class='checkbox' onClick={this.handleCheckbox}/>
                Показать только опасные
              </label>
              <Measure value={this.state} change={this.handleSwitchMeasure}/>
            </div>

            <ListItem value={this.state} change={this.handleSwitchMeasure}
              distruct={this.handleAsteroidToDistruct}
              />
          </div>
        </div>
        <DistructItem
          value={this.state}
          distruct={this.handleFinishDistruct}
          cancel={this.handleCancelDistruct}
          />
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
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
