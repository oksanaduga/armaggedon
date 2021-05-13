import { Link } from "react-router-dom";

import './css/armaggedon.css';
import './css/armaggedonMobile.css';

function DistructList(props) {
  const page = props.value.page;
  const list = props.value.distructure;

  const rows = list.map((asteroid) => {

    return (
      <div class="destruction">
        <ul>
          <li class='destruction-asteroid'>
            <div class='destruction-frame'>
                <b>{asteroid.name}</b>
            </div>
            <div class='button-list'>
            <Link to="/">
              <button class='button main-text'
                     onClick={props.distruct}
                     id={asteroid.id}>Уничтожить</button>
            </Link>
            <Link to="/">
              <button class='button main-text'
                      onClick={props.cancel}
                      id={asteroid.id}>Отмена</button>
            </Link>
            </div>
          </li>
        </ul>
      </div>
    )
  })

  return (
    <div class='container-destruction'>
      <div class='asteroids-menu'>
        <p class="main-text">
          Уничтожение астероидов
        </p>
      </div>
      {rows}
    </div>
  );
}
export default DistructList;
