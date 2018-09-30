import {createSelector} from "reselect"

const getEntities = state => state.entities;
const getIds = state => state.result;
const getRatio = state => state.ratio;

const getCurrenciesIds = state => state.currency.result;
const getCurrenciesData = state => state.currency.entities;


export const getActiveCurrency = state => state.activeCurrency;
export const getBalances = state => state.balances;

const getLoading = state => state.loadings;

export const records = createSelector(
  getEntities,
  getIds,
  (data, ids) => ({data, ids})
)

export const currencies = createSelector(
  [getCurrenciesData, getCurrenciesIds],
  (entities, result) => ({ entities, result }),
)

export const currenciesList = createSelector(
  currencies,
  ({ entities, result }) => result.map(id => entities[id]),
)

export const ratio = createSelector(
  getRatio,
  val => val,
)

export const activeCurrency = createSelector(
  getActiveCurrency,
  id => id,
)

export const getActiveCurrencyLabel = createSelector(
  currencies,
  activeCurrency,
  ({ entities, result }, code) => entities[code].label,
)

export const balances = createSelector(
  getBalances,
  obj => obj,
)

export const calculateBalance = createSelector(
  getEntities,
  balances,
  activeCurrency,
  (entity, source, code) => Object.keys(source).reduce((acc, key) => {
    console.log(entity[key]);
    let amount = source[key].filter(item => item.id === code)[0].amount;
    return entity[key].type === 'income' ? +acc + +amount : acc - amount;
  }, 0)
)

export const total = createSelector(
  calculateBalance,
  val => val,
)

export const loading = createSelector(
  getLoading,
  source => source.list,
)

export const formLoading = createSelector(
  getLoading,
  source => source.form,
)



