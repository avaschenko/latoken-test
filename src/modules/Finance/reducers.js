import { createReducer } from 'modules/utils';
import * as types from './actionTypes';
import { converter, compose } from "modules/utils";

export const defaultState = {
  result: [],
  entities: {},
  ratio: 1.114,
  balances: {},
  activeCurrency: 'usd',
  currency: {
    entities: {
      'usd': {
        label: '$',
        id: 'usd',
      },
      'eur': {
        label: '€',
        id: 'eur',
      }
    },
    result: ['usd', 'eur'],
  }
};


const convertBalances = ({ ids, source, codes, currencySource, ratio = 1.114 }) => ids.reduce((acc, id) => {
  const {currency, amount} = source[id];
  ratio = ratio <= 0 ? 1 : ratio;
   return {
    ...acc,
    [id]: codes.map( code => {
      return {
        ...currencySource[code],
        amount: currency === code ? amount : converter(amount, code, ratio)
      }
    }, {})
  }
}, {})


const removeRecord = (state, action) => {
  const { id } = action.payload;
  delete state.entities[id];
  delete state.balances[id];

  return Object.assign({}, state, {
    result: state.result.filter(recId =>  recId !== id),
    entities: {
      ...state.entities,
    },
    balances: {
      ...state.balances,
    }
  });
}

const addRecord = (state, action) => {
  const { id, data } = action.payload;

  const balances = convertBalances({
    ids: [id],
    source: {[id]: data},
    codes: state.currency.result,
    currencySource: state.currency.entities,
    ratio: state.ratio,
  });

  return Object.assign({}, state, {
    result: state.result.concat(id),
    entities: {
      ...state.entities,
      [id]: data,
    },
    balances: {
      ...state.balances,
      ...balances,
    }
  })
}

const fetchFinancesSuccess = (state, action) => {
  const { ids, entities } = action.payload;
  const balances = convertBalances({
    ids,
    source: entities,
    codes: state.currency.result,
    currencySource: state.currency.entities,
    ratio: state.ratio,
  });

  return Object.assign({}, state, {
    entities,
    result: ids,
    balances,
  })
}

const setCurrency = (state, action) => {
  const { id } = action.payload;

  return Object.assign({}, state, {
    activeCurrency: id,
  })
}


const setRatio = (state, action) => {
  const { val } = action.payload;
  return Object.assign({}, state, {
    ratio: val,
    balances: convertBalances({
      ids: state.result,
      source: state.entities,
      codes: state.currency.result,
      currencySource: state.currency.entities,
      ratio: val,
    })
  })
}

export default createReducer(defaultState, {
  [types.DELETE_RECORD]: removeRecord,
  [types.ADD_RECORD]: addRecord,
  [types.FETCH_FINANCES_SUCCESS]: fetchFinancesSuccess,
  [types.SET_CURRENCY]: setCurrency,
  [types.SET_RATIO]: setRatio,
})
