import './css/armaggedon.css';
import './css/armaggedonMobile.css';

function Measure(props) {
  const measureValue = props.value.measure;

  return (
   <div class='description__nav'>
     <p class="main-text">
        Расстояние &nbsp;
      <span>
        <a href="#" name='kilometers'
          className={ measureValue == 'kilometers'
                                      ? 'nav__item nav__item_active'
                                      : 'nav__item' }
                                      onClick={props.change}>
          в километрах<span class="main-text">, </span>
        </a>
      </span>
      <span>
        <a href="#" name='lunar'
        className={ measureValue == 'lunar'
                                    ? 'nav__item nav__item_active'
                                    : 'nav__item' }
                                    onClick={props.change} >
          в дистанциях до луны
        </a>
      </span>
    </p>
  </div>
  );
}
export default Measure;
