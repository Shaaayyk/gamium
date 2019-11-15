import React from 'react'

export default function ReviewList(props) {
  return (
    <>
      {props.currentUser &&
        props.reviews.map(review => (
          <div id='review-container'>
            {review.user &&
              <h2 id='display-name'>{review.user.username}</h2>
            }
            <div id='review-box'>
              <h4 id='review'>{review.review}</h4>
              {
                props.currentUser.id === review.userId &&
                <h5 id='delete-review' onClick={() => props.destroyReview(review.gameId, review.id)}>Delete</h5>
              }
            </div>
          </div>
        ))
      }
    </>
  )
}
