import CityTab from '../city-tab/city-tab';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { changeCity } from '../../store/action';
import { Actions } from '../../types/action';
import { State } from '../../types/state';

type CitiesListProps = {
  cities: string[];
}

const mapStateToProps = ({ city }: State) => ({
  activeCity: city,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => bindActionCreators({
  onChangeCity: changeCity,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & CitiesListProps;

function CitiesList({ cities, activeCity, onChangeCity }: ConnectedComponentProps) {
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
