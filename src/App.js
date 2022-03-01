import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

const URL = 'http://localhost:8888/todo2022/';

function App() {
  const [task,setTask] = useState('');
  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setTasks(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      });
  }, [])
  
  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:task});
    axios.post(URL + 'add.php',json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setTasks(tasks => [...tasks,response.data]);
      setTask('');
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    })
  }


  return (
    <div className='container'>
      <form onSubmit={save}>
        <label>New task</label>
        <input value={task} placeholder='Add a new task' onChange={e => setTask(e.target.value)} />
        <button>Save</button>
      </form>
      <ol>
        {tasks?.map(task =>(
          <li key={task.id}>{task.description}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
