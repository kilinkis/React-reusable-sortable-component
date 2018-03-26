import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';

import 'font-awesome/css/font-awesome.min.css';

const DragHandle = SortableHandle(() => (
  <span>
    <i className="fa fa-bars" aria-hidden="true" />
  </span>
)); // This can be any component you want

const SortableItem = SortableElement(
  ({ value, index_value, oneUp, oneDown, removeItem }) => (
    <li>
      <DragHandle />
      <i className="fa fa-smile-o" />
      {value.text}
      <i onClick={() => oneUp(index_value)} className="fa fa-arrow-circle-up" />
      <i
        onClick={() => oneDown(index_value)}
        className="fa fa-arrow-circle-down"
      />
      <i onClick={() => removeItem(index_value)} className="fa fa-times" />
    </li>
  )
);

const SortableList = SortableContainer(
  ({ items, oneUp, oneDown, removeItem }) => (
    <ul>
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          index_value={index}
          value={value}
          oneUp={oneUp}
          oneDown={oneDown}
          removeItem={removeItem}
        />
      ))}
    </ul>
  )
);

class SortableComponent extends Component {
  static propTypes = {
    removeItem: PropTypes.func,
  };

  state = {
    items: [
      { text: 'Box 1' },
      { text: 'Box 2 has a medium text' },
      { text: 'Box 3 has a very very long text' },
      { text: 'Box 4' },
    ],
  };

  oneUp = (index) => {
    // if it's not the first
    if (index > 0) {
      // 1. make copy of state
      const items = this.state.items;
      // 2. reorder
      const temp = items[index - 1];
      items[index - 1] = items[index];
      items[index] = temp;
      // 3. set state
      this.setState({ items });
    }
  };

  oneDown = (index) => {
    // if it's not the last
    if (index < this.state.items.length - 1) {
      // 1. make copy of state
      const items = this.state.items;
      // 2. reorder
      const temp = items[index + 1];
      items[index + 1] = items[index];
      items[index] = temp;
      // 3. set state
      this.setState({ items });
    }
  };

  removeItem = (index) => {
    // 1. make copy of state
    const items = this.state.items;
    // 2. remove item from order
    items.splice(index, 1);
    // 3. set state
    this.setState({ items });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { items } = this.state;

    this.setState({
      items: arrayMove(items, oldIndex, newIndex),
    });
  };
  render() {
    const { items } = this.state;

    return (
      <SortableList
        items={items}
        oneUp={(index) => this.oneUp(index)}
        oneDown={(index) => this.oneDown(index)}
        removeItem={(index) => this.removeItem(index)}
        onSortEnd={this.onSortEnd}
        useDragHandle
      />
    );
  }
}

export default SortableComponent;
