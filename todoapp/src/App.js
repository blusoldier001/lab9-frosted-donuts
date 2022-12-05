import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

// const endpoint = 'https://cse204.work';
// const api_key = '5b832d-2a041d-104386-3307d2-acff66';

class App extends Component {
  
  constructor() {
    super();

    this.state = {
      todos: []   // array of our todos
    }
  }

  componentDidMount() { // called whenever component is loaded into page
    
  }

  onChange(event) { // called whenever the App component state changes TODO use this function to update view when state changes

  }

  // Handler for deleting task
  deleteTodoHandler = _ => { // move
    console.log('deleting task...');

    let del_id = this.props.todo_id;

    fetch(endpoint+`/todos/${del_id}`, {
        method: 'DELETE',
        headers: {
            'x-api-key': api_key
        }
    })
    .then(res => {
        let status = res['status'];
        if (status == 200) {
            console.log("successfully deleted");
            renderList();
        } else {
            console.log("could not delete");
            alert("Could not delete task!");
        }
        console.log(status);
    })
    .catch(err => console.error(err));
  };

  

  render() {
    return (
      <div className="App">
        <h1>To - Do</h1>
      <div id="todo-wrapper">
          <div id="todo-list">
            <Todo todo_id="yadada" todo_text="sleep" todo_status="incomplete" />
          </div>
          <NewTodo />
      </div>
      <input type="button" id="todo-creator-submit" name="todo-creator-submit" value="New TODO" />

      <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
      <script src="script.js"></script>
      </div>
    );
  }
}

export default App;
