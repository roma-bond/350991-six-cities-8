import classNames from 'classnames';
import { sortOffersBy } from '../../const';

type OffersSortingOptionProps = {
  sortType: sortOffersBy;
  activeSortType: sortOffersBy;
  onClickHandler: (sortType: sortOffersBy, isNotActiveOption: boolean) => void;
}

function OffersSortingOption({ sortType, activeSortType, onClickHandler }: OffersSortingOptionProps): JSX.Element {
  const classValue = (sortType !== activeSortType)
    ? 'places__option'
    : classNames('places__option', 'places__option--active');

  const optionClickHandler = () => {
    onClickHandler(sortType, sortType !== activeSortType);
  };

  return (
    <li
      className={classValue}
      tabIndex={0}
      onClick={optionClickHandler}
    >
      {sortType}
    </li>
  );

}

export default OffersSortingOption;
