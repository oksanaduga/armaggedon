
import './css/armaggedon.css';
import './css/armaggedonMobile.css';

function DistructItem(props) {
  const page = props.value.page;
  const list = props.value.distructure;

  const rows = list.map((asteroid) => {
    const { name } = asteroid;

    return (
      <div class="destruction">
        <ul>
          <li class='destruction-asteroid'>
            <div class='destruction-frame'>
                <b>{name}</b>
            </div>
            <div class='button-list'>
            <a><button class='button main-text'
                     onClick={props.distruct}
                     name='asteroids'
                     id={asteroid.id}>Уничтожить</button></a>
             <a><button class='button main-text'
                      onClick={props.cancel}
                      name='asteroids'
                      id={asteroid.id}>Отмена</button></a>
            </div>
          </li>
        </ul>
      </div>
    )
  })

  return (
    <div className={ page == 'distructure'
                                 ? 'container-destruction'
                                 : 'hidden'}>

      <div class='asteroids-menu'>
        <p class="main-text">
          Уничтожение астероидов
        </p>
      </div>

      {rows}

    </div>
  );
}
export default DistructItem;
