import { useState, useEffect } from 'react';
import { SortOffersBy } from '../../const';
import OffersSortingOption from '../offers-sorting-option/offers-sorting-option';

type OffersSortingProps = {
  onUpdateSorting: (activeSortType: SortOffersBy) => void;
};

function OffersSorting({ onUpdateSorting }: OffersSortingProps): JSX.Element {
  const [activeSortType, setActiveSortType] = useState(SortOffersBy.Popular);
  const [isSortingVisible, setIsSortingVisible] = useState(false);

  const sortingClassList = isSortingVisible
    ? 'places__options places__options--custom places__options--opened'
    : 'places__options places__options--custom';

  useEffect(() => {
    onUpdateSorting(activeSortType);
  }, [activeSortType]);

  const onOptionClickHandler = (sortType: SortOffersBy, isNotActiveOption: boolean) => {
    if (isNotActiveOption) {
      setActiveSortType(sortType);
    }
  };

  const onTitleClickHandler = () => {
    setIsSortingVisible((prevValue) => !prevValue);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={onTitleClickHandler}>
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={sortingClassList}>
        {
          Object.values(SortOffersBy).map((sortType) => (
            <OffersSortingOption
              key={`Sort type is by ${sortType}`}
              sortType={sortType}
              activeSortType={activeSortType}
              onClickHandler={onOptionClickHandler}
            />),
          )
        }
      </ul>
    </form>
  );
}

export default OffersSorting;
