import { NavLink } from "react-router-dom";

import './css/armaggedon.css';
import './css/armaggedonMobile.css';



function Header() {
  return (
    <div class="container-header">
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
           <li>
             <NavLink
               className="header__nav-item nav__item"
               activeClassName="nav__item_active"
               exact
               to="/">
               Астероиды
               </NavLink>
           </li>
           <li>
             <NavLink
               className="header__nav-item nav__item"
               activeClassName="nav__item_active"
               exact
               to="/destroy">
               Уничтожение
             </NavLink>
           </li>
         </ul>
       </div>
     </header>
    </div>
    );
}
export default Header;
