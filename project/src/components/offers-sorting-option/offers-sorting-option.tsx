import { sortOffersBy } from '../../const';

type OffersSortingOptionProps = {
  sortType: sortOffersBy;
  activeSortType: sortOffersBy;
  onClickHandler: (sortType: sortOffersBy, isNotActiveOption: boolean) => void;
}

function OffersSortingOption({ sortType, activeSortType, onClickHandler }: OffersSortingOptionProps): JSX.Element {
  const activeClassName = ' places__option--active';
  let classValue = 'places__option';
  if (sortType === activeSortType) {
    classValue += activeClassName;
  }
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
