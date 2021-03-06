import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { submitReviewAction } from '../../store/api-actions';
import { getReviews } from '../../store/data-reducer/selectors';
import { ThunkAppDispatch } from '../../types/action';
import { ReviewPost } from '../../types/offer';
import { State } from '../../types/state';

type CommentFormProps = {
  offerId: number;
}

const mapStateToProps = (state: State) => ({
  reviews: getReviews(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit: (id: number, post: ReviewPost) => {
    dispatch(submitReviewAction(id, post));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & CommentFormProps;

function CommentForm({ offerId, onSubmit, reviews }: ConnectedComponentProps): JSX.Element {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('1');

  useEffect(() => {
    setReviewText('');
    setRating('1');
  }, [reviews]);

  const onRatingChange = (evt: ChangeEvent<HTMLInputElement>) => setRating(evt.target.value);

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(offerId, {text: reviewText, rating: Number(rating)});
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={onFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" checked={rating === '5'} onChange={onRatingChange} />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" checked={rating === '4'} onChange={onRatingChange} />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" checked={rating === '3'} onChange={onRatingChange} />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" checked={rating === '2'} onChange={onRatingChange} />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" checked={rating === '1'} onChange={onRatingChange} />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={({ target }) => setReviewText(target.value)}
        value={reviewText}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={reviewText.length <= 50}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export { CommentForm };
export default connector(CommentForm);
