import React, { Component } from 'react';
import s from './Currencies.css';
import { truncated } from 'modules/utils';

class Currencies extends Component {

  shouldComponentUpdate(nextProps) {
    const { currentCurrency, isEmpty, ratio } = nextProps;
    if(isEmpty) {
      return false;
    }

    if (ratio !== this.props.ratio) {
      return true;
    }

    if (currentCurrency !== this.props.currentCurrency) {
      return true;
    }

    return false;
  }

  render() {
    const { currenciesList, currentCurrency } = this.props;
    return (
      <div>
        {this.props.isEmpty ? '--' : (
          <div>
            {currenciesList
              .sort((a, b) => {
                if(a.id === currentCurrency) return -1;
                return 1;
              })
              .map((item, index) => (
              <div key={`${item.id}-value-${index}`} className={s.currency}>
                {item.label} {truncated(+item.amount, 2)}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default Currencies;
