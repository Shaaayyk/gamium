import React from 'react'

export default function ReviewList(props) {
  return (
    <>
      {props.reviews && (
        props.reviews.map(review => (
          <>
            <p id='review'>{review.review}</p>
          </>
        )))}
    </>
  )
}
