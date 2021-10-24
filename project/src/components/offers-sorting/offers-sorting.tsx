import { useState, useEffect } from 'react';
import { updateSorting } from '../../store/action';
import { sortOffersBy } from '../../const';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { UpdateSortingAction } from '../../types/action';

const mapDispatchToProps = (dispatch: Dispatch<UpdateSortingAction>) => ({
  onUpdateSorting(sortBy: sortOffersBy) {
    dispatch(updateSorting(sortBy));
  },
});

const connector = connect(null , mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function OffersSorting({ onUpdateSorting }: ConnectedComponentProps): JSX.Element {
  const [activeSortType, setActiveSortType] = useState(sortOffersBy.popular);
  const activeClassName = ' places__option--active';

  useEffect(() => {
    onUpdateSorting(activeSortType);
  }, [activeSortType]);

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
          Object.values(sortOffersBy).map((sortType) => {
            let classValue = 'places__option';
            if (sortType === activeSortType) {
              classValue += activeClassName;
            }
            return (
              <li
                key={`Sort type is by ${sortType}`}
                className={classValue}
                tabIndex={0}
                onClick={() => {
                  if (sortType !== activeSortType) {
                    setActiveSortType(sortType);
                  }
                }}
              >
                {sortType}
              </li>
            );
          })
        }
      </ul>
    </form>
  );
}

export { OffersSorting };
export default connector(OffersSorting);
