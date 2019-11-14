import React from 'react'

export default function ReviewList(props) {
  return (
    <>
      {
        props.reviews.map(review => (
          <div id='review-box'>
            <h4 id='review'>{review.review}</h4>
            {
              props.currentUser.id === review.userId &&
              <button id='delete-review' onClick={() => props.destroyReview(review.gameId, review.id)}>Delete</button>
            }
          </div>
        ))
      }
    </>
  )
}
