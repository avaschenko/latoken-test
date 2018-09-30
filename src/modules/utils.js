export const createReducer = (initialState, handlers) => function reducer(state = initialState, action) {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export const roundNumber = (num, symbolsCount = 10) => +num.toFixed(symbolsCount)

export const converter = (num, code, ratio) => {
  switch(code) {
    case 'usd':
      return +roundNumber(num * ratio);
    case 'eur':
      return +roundNumber(num / ratio);
    default:
      return +num;
  }
}

export const dateConverter = (mills, local = 'ru', config = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
}) => {
  const date = new Date(mills);
  return date.toLocaleString(local, config);
}

export const truncated = (num, decimalPlaces) => {
  let numPowerConverter = Math.pow(10, decimalPlaces);
  return ~~(num * numPowerConverter) / numPowerConverter;
}

