import './css/armaggedon.css';
import './css/armaggedonMobile.css';
import ListItem from './ListItem';
import DistructItem from './DistructItem';


function App() {
  return (
    <div>
    <div class="container">
     <header class='header'>
       <div class='header__promo'>
         <h1 class='h1'>armaggedon v</h1>
         <p class='header__text main-text'>
           Сервис мониторинга и уничтожения
            астероидов, опасно подлетающих к Земле.
         </p>
       </div>
       <div class='header__nav'>
         <ul class='nav'>
           <li class='header__nav-item nav__item nav__item_active'><a href="#" class=''>Астероиды</a></li>
           <li class='header__nav-item nav__item'><a href="#">Уничтожение</a></li>
         </ul>
       </div>
     </header>
   </div>

  <div class="container">
    <div class='asteroids-menu'>

      <div class='description'>
        <label class="main-text">
          <input type="checkbox" class='checkbox' />
          Показать только опасные
        </label>
        <div class='description__nav'>
          <p class="main-text">
            Расстояние &nbsp;
          <span class='nav__item nav__item_active'>
            <a href="#">
              в километрах<span class="main-text">, </span>
            </a>
          </span>
          <span class='nav__item'>
            <a href="#">
              в дистанциях до луны
            </a>
          </span>
        </p>
        </div>
      </div>

      <ListItem />
    </div>
  </div>

  <DistructItem />

  <div class="container">
    <footer class='footer'>
     <p class='main-text'>2021 © все права и планета защищены</p>
    </footer>
  </div>
    </div>
  );
}

export default App;
