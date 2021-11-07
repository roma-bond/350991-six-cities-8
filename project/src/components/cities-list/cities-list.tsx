import CityTab from '../city-tab/city-tab';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { changeCity } from '../../store/action';
import { ChangeCityAction } from '../../types/action';
import { State } from '../../types/state';
import { getActiveCity } from '../../store/filter-reducer/selectors';

type CitiesListProps = {
  cities: string[];
}

const mapStateToProps = (state: State) => ({
  activeCity: getActiveCity(state),
});

const mapDispatchToProps = (dispatch: Dispatch<ChangeCityAction>) => ({
  onChangeCity(city: string) {
    dispatch(changeCity(city));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & CitiesListProps;

function CitiesList({ cities, activeCity, onChangeCity }: ConnectedComponentProps): JSX.Element {
  const classValue = 'locations__item-link tabs__item';
  const activeClassValue = 'locations__item-link tabs__item tabs__item--active';

  return (
    <ul className="locations__list tabs__list">
      {
        cities.map((city) => (
          <CityTab
            key={city}
            city={city}
            classValue={city === activeCity ? activeClassValue : classValue}
            onClickHandler={(newCity: string) => {onChangeCity(newCity);}}
          />
        ))
      }
    </ul>
  );
}

export { CitiesList };
export default connector(CitiesList);
