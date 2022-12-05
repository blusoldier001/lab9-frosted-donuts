import React, { Component } from 'react';
import $ from 'jquery';
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
    let completedBool = this.props.todo_status;

    let chk_id = e.target.value;
    let data = {};

    if (completedBool == 'complete') {
        // update with completed status
        $(`#${this.props.todo_id}`).removeClass('incomplete').addClass('complete');
        data['completed'] = true;
    } else {
        // update with incomplete status
        data['completed'] = false;
        $(`#${this.props.todo_id}`).removeClass('complete').addClass('incomplete');
    }
    fetch(endpoint+`/todos/${chk_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': api_key,
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => console.error(err));
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
