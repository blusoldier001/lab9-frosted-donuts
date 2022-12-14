import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';
import $ from 'jquery';

const endpoint = 'https://cse204.work';
const api_key = '5b832d-2a041d-104386-3307d2-acff66';

class App extends Component {
  
  constructor() {
    super();

    this.state = {
      todos: [],   // array of our todos
      newtodo_input: "",  // input string from NewTodo input
    }
  };

  // (Native) Function called when App component mounted, use to initialize component data
  componentDidMount() {

    fetch(endpoint+'/todos', {
      method: 'GET',
      headers: {
          'x-api-key': api_key
      }
    })
    .then(res => res.json())
    .then(data => {
      // set 'todos' state
      console.log("SETTING TODOS STATE");
      this.setState({
        todos: data
      });
      console.log("==== this.state.todos ====");
      console.log(this.state.todos);
    })
    .catch(err => console.error(err));
  };

  // Listener on New TODO input to update App input state 
  inputListener = (event) => {
    this.setState({
      newtodo_input: event.target.value  // set to input target value
    });
    console.log(this.state.newtodo_input);
  };

  // Handler for making task or something
  createtodoHandler = (e) => {
    e.preventDefault();
    console.log('createtodoHandler called');
    $('#todo-creator-text').val("");
    this.setState({newtodo_input: ""})
    if (this.state.newtodo_input) {
      console.log('creating task...');

      let data = {
          text: this.state.newtodo_input
      };

      fetch(endpoint+'/todos', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'x-api-key': api_key
          },
          body: JSON.stringify(data)
      })
      .then(res => {
        if (res['status'] === 200) {
          return res.json();
        }
        else {
          console.log("Could not add todo");
          alert("Could not add todo!");
          return false;
        }
      })
      .then(data => {
          // successful, add to state
          console.log("Successfully added new todo")
          let newTodos = [...this.state.todos, data];
          console.log("New TODOs list")
          console.log(newTodos);
          this.setState({
            todos: newTodos,
          })
      })
      .catch(err => console.error(err));
    } 
    else {
      alert("Task cannot be empty!");
    }
  }

  // Handler for deleting task
  deleteTodoHandler = (e) => {
    e.preventDefault();
    console.log('deleting task...');

    let del_id = e.target.parentNode.id;

    fetch(endpoint+`/todos/${del_id}`, {
        method: 'DELETE',
        headers: {
            'x-api-key': api_key
        }
    })
    .then(res => {
        let status = res['status'];
        if (status === 200) {
            console.log("successfully deleted");
            // Update app state
            // eslint-disable-next-line
            const remainingTodos = this.state.todos.filter((todo) => {
              // Looping through all todos, if the id of the current todo DOES NOT equal the id of the todo we want to delete, keep it
              if (todo.id !== del_id) {
                return todo;
              }
            });
            this.setState({ todos: remainingTodos });
        } else {
            console.log("could not delete");
            alert("Could not delete task!");
        }
        console.log(status);
    })
    .catch(err => console.error(err));
  };


  // Handler for sorting tasks
  sortTodos = _ => {
    console.log("Caleld sort dtododeosfosi");
    this.setState({
      todos: this.state.todos.sort((a,b) => {
        if (a.text > b.text) {
          return 1;
        }
        else if (a.text == b.text) {
          return 0;
        }
        return -1;
      })
    })
  }
  

  render() {
    return (
      <div className="App">
        <h1>To - Do</h1>
      <div id="todo-wrapper">
          <div id="todo-list">
            {
              this.state.todos.map((todo) => 
                <Todo 
                  todo_id={todo.id} 
                  todo_text={todo.text}
                  todo_status={todo.completed ? "complete" : "incomplete"}
                  deleteTodoHandler={this.deleteTodoHandler}
                />
              )
            }
          </div>
          <NewTodo inputListener={this.inputListener} newTodo={this.createtodoHandler} todoHandler={this.createtodoHandler}/>
      </div>
      <button type="submit" id="todo-creator-submit" name="todo-creator-submit" onClick={this.createtodoHandler}>New TODO</button>
      <button type="submit" id="todo-sort-submit" name="todo-sort-submit" onClick={this.sortTodos}>Sort A-Z</button>
      <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
      <script src="script.js"></script>
      </div>
    );
  }
}

export default App;
