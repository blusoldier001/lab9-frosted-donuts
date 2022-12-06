import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (
    <form name="todo-creator" id="todo-creator">
        <label for="todo-text">Write a Task...</label>
        <input type="text" id="todo-text" name="todo-text" placeholder="New TODO" onChange={this.props.inputListener} />
    </form>
    );
  }
}

export default NewTodo;




