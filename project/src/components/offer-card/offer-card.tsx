import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';

type OfferCardProps = {
  offer: Offer;
  onMouseOver?: () => void;
  page: string;
}

function OfferCard(props: OfferCardProps): JSX.Element {
  const { offer, onMouseOver, page } = props;
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
  }

  return (
    <article className={`${placeCardExtraClass} place-card`} onMouseOver={onMouseOver}>
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
          <button className={bookmarkButtonClass} type="button">
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

export default OfferCard;
