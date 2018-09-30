export const createReducer = (initialState, handlers) => function reducer(state = initialState, action) {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export const roundNumber = (num, symbolsCount = 2) => +num.toFixed(symbolsCount)

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

export const normalizeNumber = (str) => {
  str = str + '';
  let parts = (str + '').split('.'),
    main = parts[0],
    len = main.length,
    output = '',
    i = len - 1;

  while (i >= 0) {
    output = main.charAt(i) + output;
    if ((len - i) % 3 === 0 && i > 0) {
      output = ' ' + output;
    }
    --i;
  }

  if (parts.length > 1) {
    output += '.' + parts[1];
  } else {
    output += '.00';
  }
  return output;

}
