import React from 'react'

export default function ReviewList(props) {
  return (
    <>
      {props.reviews.gameId === props.gameId ?
        props.reviews.map(review => (
          <div id='review-box'>
            <p id='review'>{review.review}</p>
            <button id='delete-review' onClick={() => props.destroyReview(review.gameId, review.id)}>Delete</button>
          </div>
        ))
        : 'shit'
      }
    </>
  )
}
