import React, { Component } from 'react';
import './Todo.css';

export default class Todo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isComplete: false,
    }
  }

  // Handler for toggling task completeness
  completeTodoHandler = _ => {
    this.state.isComplete ? 
    this.props.todo_status="incomplete" : this.props.todo_status="complete";
    this.setState({isComplete: !this.state.isComplete});
    
    // Make fetch request to PUT
  };

  // Handler for deleting task
  deleteTodoHandler = _ => {
    console.log("u delete me!")
    // Make fetch request to DELETE
  };

  render() {
    return (
    <div className={`task ${this.props.status}`} todoID={this.props.todo_id}>
        <input type="checkbox" todoID={this.props.todo_id} onClick={completeTodoHandler}/>
        <p>
          {this.props.todo_text}
        </p>
        <input type="button" class="delete-button" value="🗑️" todoID={this.props.todo_id} onClick={deleteTodoHandler}/>
    </div>
    );
  }
}
