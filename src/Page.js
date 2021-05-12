import './css/armaggedon.css';
import './css/armaggedonMobile.css';

function Page(props) {
  const page = props.value.page;

  return (
    <div class='header__nav'>
      <ul class='nav'>
        <li className={ page === 'asteroids'
                                ? 'header__nav-item nav__item nav__item_active'
                                : 'header__nav-item nav__item'}>
          <a href="#" name='asteroids' onClick={props.switch}>Астероиды</a>
        </li>
        <li className={ page === 'distructure'
                                ? 'header__nav-item nav__item nav__item_active'
                                : 'header__nav-item nav__item'}>
          <a href="#" name='distructure' onClick={props.switch}>Уничтожение</a>
        </li>
      </ul>
    </div>
  );
}
export default Page;
