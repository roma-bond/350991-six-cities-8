import CityTab from '../city-tab/city-tab';

type CitiesListProps = {
  cities: string[];
  activeCity: string;
  onChangeCity: (city: string) => void;
}

function CitiesList({ cities, activeCity, onChangeCity }: CitiesListProps): JSX.Element {
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

export default CitiesList;
