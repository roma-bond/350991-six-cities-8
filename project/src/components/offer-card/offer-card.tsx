import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { AppRoute, APIRoute, AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offer';
import { ThunkAppDispatch } from '../../types/action';
import { submitFavoriteAction } from '../../store/api-actions';
import browserHistory from '../../browser-history';

type OfferCardProps = {
  offer: Offer;
  onMouseOver?: () => void;
  onMouseEnter?: (event: MouseEvent<HTMLLIElement>) => void;
  onMouseOut?: () => void;
  page: string;
  authorizationStatus?: AuthorizationStatus;
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onUpdate: (id: number, favorite: boolean) => {
    dispatch(submitFavoriteAction(id, favorite));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & OfferCardProps;

function OfferCard(props: ConnectedComponentProps): JSX.Element {
  const { offer, onMouseOver, onMouseEnter, onMouseOut, page, onUpdate, authorizationStatus } = props;
  const bookmarkButtonClass = offer.favorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button';

  let placeCardExtraClass = 'cities__place-card';
  let imageWrapperExtraClass = 'cities__image-wrapper';
  let cardInfoExtraClass = '';
  let imageWidth = 260;
  let imageHeight = 200;

  if (page === 'favorites') {
    placeCardExtraClass = 'favorites__card';
    imageWrapperExtraClass = 'favorites__image-wrapper';
    cardInfoExtraClass = 'favorites__card-info';
    imageWidth = 150;
    imageHeight = 110;
  } else if (page === 'offer') {
    placeCardExtraClass = 'near-places__card';
    imageWrapperExtraClass = 'near-places__image-wrapper';
  }

  const onButtonClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      onUpdate(offer.id, !offer.favorite);
    } else {
      browserHistory.push(APIRoute.Login);
    }
  };

  return (
    <article onMouseEnter={onMouseEnter} onMouseOut={onMouseOut} className={`${placeCardExtraClass} place-card`} onMouseOver={onMouseOver}>
      { offer.premium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${imageWrapperExtraClass} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={offer.images[0]} width={imageWidth} height={imageHeight} alt="Place image" />
        </a>
      </div>
      <div className={`${cardInfoExtraClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={bookmarkButtonClass} type="button" onClick={onButtonClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${100 * offer.rating / 5}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export { OfferCard };
export default connector(OfferCard);
