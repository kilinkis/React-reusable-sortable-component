import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';
import styled from 'styled-components';

import 'font-awesome/css/font-awesome.min.css';
import './style.css';

const Wrapper = styled.div`
  max-width: 300px;
`;

const DragHandle = SortableHandle(() => (
  <img src="https://i.imgur.com/ZGOYDIg.png" />
)); // This can be any component you want

const SortableItem = SortableElement(
  ({ value, index_value, oneUp, oneDown, removeItem }) => (
    <li className="draggable">
      <span className="first-area">
        <DragHandle />
        <div className="content">{value.text}</div>
      </span>
      <span className="buttons">
        <i onClick={() => oneDown(index_value)} className="fa fa-arrow-down" />
        <i onClick={() => oneUp(index_value)} className="fa fa-arrow-up" />
        <i
          onClick={() => removeItem(index_value)}
          className="remove fa fa-times"
        />
      </span>
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
    items: PropTypes.array,
  };

  state = {
    items: this.props.items,
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
    let content;
    // console.log(this.state.items);
    if (this.state.items.length > 0) {
      const { items } = this.state;
      content = (
        <Wrapper>
          <SortableList
            items={items}
            oneUp={(index) => this.oneUp(index)}
            oneDown={(index) => this.oneDown(index)}
            removeItem={(index) => this.removeItem(index)}
            onSortEnd={this.onSortEnd}
            useDragHandle
          />
        </Wrapper>
      );
    } else {
      content = <p> This list has no items </p>;
    }

    return <div>{content}</div>;
  }
}

export default SortableComponent;
