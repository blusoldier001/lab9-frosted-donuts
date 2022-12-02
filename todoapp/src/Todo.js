import React, { Component } from 'react';
import './Todo.css';

/* Props:
  - todo_id
  - todo_text
  - todo_status
*/

export default class Todo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isComplete: false,
    }
  }

  // Handler for toggling task completeness
  completeTodoHandler = _ => {
    console.log("u toggle me!");
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
    <div className={`task ${this.props.todo_status}`} todo_id={this.props.todo_id}>
        <input type="checkbox" todo_id={this.props.todo_id} onClick={this.completeTodoHandler}/>
        <p>
          {this.props.todo_text}
        </p>
        <input type="button" className="delete-button" value="🗑️" todo_id={this.props.todo_id} onClick={this.deleteTodoHandler}/>
    </div>
    );
  }
}
