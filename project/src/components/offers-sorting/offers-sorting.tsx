import { useState, useEffect } from 'react';
import { sortOffersBy } from '../../const';
import OffersSortingOption from '../offers-sorting-option/offers-sorting-option';

type OffersSortingProps = {
  onUpdateSorting: (activeSortType: sortOffersBy) => void;
};

function OffersSorting({ onUpdateSorting }: OffersSortingProps): JSX.Element {
  const [activeSortType, setActiveSortType] = useState(sortOffersBy.popular);

  useEffect(() => {
    onUpdateSorting(activeSortType);
  }, [activeSortType]);

  const onClickHandler = (sortType: sortOffersBy, isNotActiveOption: boolean) => {
    if (isNotActiveOption) {
      setActiveSortType(sortType);
    }
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {
          Object.values(sortOffersBy).map((sortType) => (
            <OffersSortingOption
              key={`Sort type is by ${sortType}`}
              sortType={sortType}
              activeSortType={activeSortType}
              onClickHandler={onClickHandler}
            />),
          )
        }
      </ul>
    </form>
  );
}

export default OffersSorting;
