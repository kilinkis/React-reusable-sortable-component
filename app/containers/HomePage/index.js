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
import SortableComponent from '../../components/Sortable';

export default class HomePage extends React.PureComponent {
  state = {
    items: [
      { text: 'Box 1' },
      { text: 'Box 2 has a medium text' },
      { text: 'Box 3 has a very very long text' },
      { text: 'Box 4' },
    ],
    items2: [
      { text: 'aBox 1' },
      { text: 'aBox 2 has a medium text' },
      { text: 'aBox 3 has a very very long text' },
      { text: 'aBox 4' },
    ],
  };

  render() {
    return (
      <div>
        <SortableComponent items={this.state.items} />
        <SortableComponent items={this.state.items2} />
      </div>
    );
  }
}
