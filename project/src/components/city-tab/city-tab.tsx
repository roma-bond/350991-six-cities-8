import { MouseEvent } from 'react';

type CityTabProps = {
  city: string;
  classValue: string;
  onClickHandler: (city: string) => void
}

function CityTab({ city, classValue, onClickHandler }: CityTabProps) {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    onClickHandler(city);
  };

  return (
    <li className="locations__item">
      <a onClick={handleClick} className={classValue} href="#">
        <span>{city}</span>
      </a>
    </li>
  );
}

export default CityTab;
