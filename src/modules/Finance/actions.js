import * as types from './actionTypes';
import db from 'src/firebase';

export const deleteRecord = ({ id }) => dispatch => {
  dispatch({
    type: types.DELETE_RECORD_START,
  })
  const rootRef = db.ref().child('finances');
  rootRef.child(id).remove().then(() => dispatch({
    type: types.DELETE_RECORD,
    payload: { id },
  }));
}

export const addRecord = (data) => dispatch => {
  dispatch({
    type: types.ADD_RECORD_START,
  })
  const rootRef = db.ref().child('finances');
  let item = rootRef.push();
  let id = item.key;
  item.set({
    id,
    amount: data.amount,
    type: data.type,
    currency: data.currency,
    date: Date.now(),
    description: data.description,
  })
    .then(() => dispatch({
      type: types.ADD_RECORD,
      payload: {
        data: {
          ...data,
          id,
        },
        id,
      }
    }))
}

export const fetchFinaces = () => dispatch => {
  dispatch({
    type: types.FETCH_FINANCES_START,
  })

  const ref = db.ref().child('finances');
  ref.once('value', snap => {
    dispatch({
      type: types.FETCH_FINANCES_SUCCESS,
      payload: {
        entities: snap.val(),
        ids: Object.keys(snap.val() || {}),
      }
    })
  })
}

export const setCurrency = (id) => ({
  type: types.SET_CURRENCY,
  payload: { id }
})

export const setRatio = (val) => ({
  type: types.SET_RATIO,
  payload: {val},
})
