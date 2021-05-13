import { Link } from "react-router-dom";

import './css/armaggedon.css';
import './css/armaggedonMobile.css';

import Measure from './Measure';
import ListItem from './ListItem';


function Body(props) {
  const state = props.value;

  return (
    <div class='container'>
      <div class='asteroids-menu'>

        <div class='description'>
          <label class="main-text">
            <input type="checkbox" class='checkbox' onClick={props.checkbox}/>
            Показать только опасные
          </label>
          <Measure value={state} change={props.measure}/>
        </div>

        <Link to="/destroy">
          <ListItem value={state}
                    change={props.measure}
                    distruct={props.distruct}/>
        </Link>

      </div>
    </div>
    );
}
export default Body;
