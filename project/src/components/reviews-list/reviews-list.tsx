import { Review } from '../../types/offer';
import ReviewPost from '../review/review';

type ReviewsListProps = {
  reviews: Review[];
}

function ReviewsList ({ reviews }: ReviewsListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {
          reviews.map((review) => <ReviewPost key={`${review.id}-${review.avatar}`} review={review} />)
        }
      </ul>
    </>
  );
}

export default ReviewsList;
