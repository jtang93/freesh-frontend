export function fetchListings() {
  return function(dispatch) {
    dispatch({type: "FETCH_LISTINGS"})
    fetch('http://localhost:4000/api/v1/listings')
    .then(r => r.json())
    .then(parsedJSON => {
      dispatch({type: "FETCH_LISTINGS_FULFILLED", payload: parsedJSON})
    })
  }
}

export function updateListings() {
  return function(dispatch) {
    dispatch({type: "UPDATE_LISTINGS"})
  }
}
