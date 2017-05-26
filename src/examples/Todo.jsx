/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';

function TodoList(props) {
  const items = props.items;
  const handleDelete = props.handelDelete;
  return (
    <ul>
      {items.map((item, index) => (
        <li onDoubleClick={() => handleDelete(index)} key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

// TodoList.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.object).isRequired,
//   handelDelete: PropTypes.func.isRequired
// };

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: ''
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handledeleteItem = this.handledeleteItem.bind(this);
  }
  handleChange = (e) => {
    this.setState({
      text: e.target.value
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  };
  handledeleteItem = (index) => {
    const newItems = this.state.items.splice(0);
    newItems.splice(index, 1);
    this.setState({
      items: newItems
    });
  };
  render() {
    return (
      <div className="todo">
        <h3>Todo</h3>
        <TodoList items={this.state.items} handelDelete={this.handledeleteItem} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} />
          <input type="submit" value={`Add #${this.state.items.length + 1}`} />
        </form>
      </div>
    );
  }
}
