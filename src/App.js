import TodoList from './modules/TodoList';
import './App.css';
import React, { useEffect } from "react";
import Context from './context'
// import AddTodo from './modules/AddTodo'
import Loader from './Loader.js'
import Modal from './modules/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Nav
} from 'react-bootstrap'

const AddTodo = React.lazy(() => import('./modules/AddTodo'))

function App() {
  let [todos, setTodos] = React.useState([])
  let [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(response => response.json())
    .then(todos => {
      setTimeout(() => {
        setTodos(todos)
        setLoading(false)
      }, 2000
    )
      
    })
  }, [])

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
      if (todo.id===id) {
        todo.completed=!todo.completed
      }
      return todo
    }))
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="App">
        <Nav>
          <Container className="navigation">
            <h1 className="headtext">Todo List</h1>
            <Modal />
          </Container>
        </Nav>
        <div className="list-wrapper">
          <Container>
              <React.Suspense fallback={<p>Loading...</p>}>
                <AddTodo onCreate={addTodo}/>
              </React.Suspense>
            {loading && <Loader />}
            {todos.length ? 
            (<TodoList todos={todos} onToggle={toggleTodo} />
              ) : (
                loading ? null: <p>List is empty</p>
              )
            }
          </Container>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
