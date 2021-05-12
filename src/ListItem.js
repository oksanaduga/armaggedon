import dinosaur from './img/dinosaur.svg';
import rock from './img/rock.svg';

import './css/armaggedon.css';
import './css/armaggedonMobile.css';

function Dangerous(props) {
  const dangerous = props.value;
  if (dangerous) {
    return (
      <b>опасен</b>
    );
  } else {
    return (
      <b>не опасен</b>
    )
  }
}

function Warning(props) {
  const markDistruct = props.value;
  if (markDistruct) {
    return (
      <h3>Отправлен на уничтожение</h3>
    );
  } else {
    return (
      null
    )
  }
}

function ListItem(props) {
  let list;
  const measures = props.value.measure;
  const change = props.value.measure;
  const checkbox = props.value.checkbox;

  if (checkbox) {
    list = props.value.asteroids.filter((asteroid) => asteroid.dangerous);
  } else {
    list = props.value.asteroids;
  }

  const rows = list.map((asteroid) => {
    const countSize = (asteroid.size / 100) * 48;
    const asteroidStyle = {
      height: countSize,
      width: countSize,
    };

    return (
      <ul class="list-asteroids">
        <li className={asteroid.dangerous === false
                                              ? "asteroid-item  asteroid-item__normal"
                                              : "asteroid-item  asteroid-item__danger"}>
          <div class="empty">
            <img class='dinosaur' src={dinosaur} alt="dinosaur" />
          </div>
          <img class='rock' src={rock} alt="rock" style={asteroidStyle}/>
          <div class="asteroid">
            <h1 class='h1'>{asteroid.name}</h1>
            <Warning value={asteroid.markDistructure}/>
            <ul class='asteroid__description'>
              <li class='asteroid__data-frame'>
                <div class="asteriod__data-name">Дата</div>
                <div class="asteriod__data-value">{asteroid.date}</div>
              </li>
              <li class='asteroid__data-frame'>
                <div class="asteriod__data-name">Расстояние</div>
                <div class="asteriod__data-value">{asteroid.distance[measures]}</div>
              </li>
              <li class='asteroid__data-frame'>
                <div class="asteriod__data-name">Размер</div>
                <div class="asteriod__data-value">{asteroid.size} м</div>
              </li>
              </ul>
           </div>

           <div class="asteriod__button">
             <div class='asteroid__button-frame'>
               <p class='main-text'>Оценка:</p>
             </div>
             <div class='asteroid__button-frame'>
               <p class='main-text'><Dangerous value={asteroid.dangerous}/></p>
             </div>
             <div class='asteroid__button-frame'>
               <a><button class='button main-text'
                          onClick={props.distruct}
                          name='distructure'
                          id={asteroid.id}>На уничтожение</button></a>
             </div>
           </div>

         </li>
       </ul>
    )
  })



  return (
  <div class="list">

      {rows}

  </div>
  );
}
export default ListItem;
