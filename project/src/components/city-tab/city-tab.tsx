import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type CityTabProps = {
  city: string;
  classValue: string;
  onClickHandler: (city: string) => void
}

function CityTab({ city, classValue, onClickHandler }: CityTabProps): JSX.Element {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    onClickHandler(city);
  };

  return (
    <li className="locations__item">
      <Link onClick={handleClick} className={classValue} to={AppRoute.Main}>
        <span>{city}</span>
      </Link>
    </li>
  );
}

export default CityTab;
