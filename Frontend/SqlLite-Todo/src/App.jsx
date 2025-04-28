import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const API = 'http://localhost:5000';


  useEffect(() => {
      fetchTodos();
  }, []);



  const fetchTodos = async () => {
      const res = await axios.get(`${API}/todos`);
      setTodos(res.data);
      console.log(res);
  };

  const addTodo = async () => {
      if (text.trim() === '') return;
      await axios.post(`${API}/todos`, { text });
      setText('');
      fetchTodos();
  };

  const toggleTodo = async (id) => {
      await axios.put(`${API}/todos/${id}`);
      fetchTodos();
  };

  const deleteTodo = async (id) => {
      await axios.delete(`${API}/todos/${id}`);
      fetchTodos();
  };
  

  return (
    <>
    <div style={{ padding: 20 }}>
            <h1>Todo List</h1>
            <input 
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="New Todo"
            />
            <button onClick={addTodo}>Add</button>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span 
                            style={{ 
                                textDecoration: todo.done ? 'line-through' : 'none', 
                                cursor: 'pointer' 
                            }}
                            onClick={() => toggleTodo(todo.id)}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: 10 }}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    
    </>
  )
}

export default App
