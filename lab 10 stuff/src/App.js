import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoHeader from './TodoHeader'
import TodoBody from './TodoBody'

function App() {
  return (
    <div>
      <TodoHeader />
      <TodoBody />
    </div>
  );
}

export default App;
