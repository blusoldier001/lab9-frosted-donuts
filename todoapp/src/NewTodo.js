import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
    
  render() {
    return (
    <form name="todo-creator" id="todo-creator" onSubmit={this.props.todoHandler}>
        <label for="todo-creator-text">Write a Task...</label>
        <input type="text" id="todo-creator-text" name="todo-creator-text" placeholder="New TODO" onChange={this.props.inputListener} />
    </form>
    );
  }
}

export default NewTodo;




