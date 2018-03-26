/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import SortableComponent from '../../components/Sortable';

export default class HomePage extends React.PureComponent {
  state = {
    items: [
      { text: 'Box 1' },
      { text: 'Box 2 has a medium text' },
      { text: 'Box 3 has a very very long text' },
      { text: 'Box 4' },
    ],
  };

  // removeItem = (key) => {
  //   // var array = this.state.people;
  //   // var index = array.indexOf(e.target.value)
  //   // array.splice(index, 1);
  //   // this.setState({people: array });

  //   // 1. make copy of state
  //   const items = { ...this.state.items };

  //   console.log(key);
  //   // 2. remove item from order
  //   // delete items[key];
  //   console.log(items);
  //   // 3. set state
  //   // this.setState({ items });
  // };

  render() {
    return (
      <div>
        <SortableComponent
          items={this.state.items}
          removeItem={this.removeItem}
        />
      </div>
    );
  }
}
