import { useState } from 'react'
import { toggleTodo,updateTodo,deleteTodo } from '../redux/actions';
import { useDispatch } from "react-redux";
import { Draggable } from 'react-beautiful-dnd';


export default function Todo(props) {
  const [editing, setEditing] = useState(false);
  const [text,setText] = useState(props.todo.data);

  const dispatch = useDispatch();
  const onFormSubmit = (e)=>{
    e.preventDefault();
    setEditing(prevState => !prevState);
    dispatch(updateTodo(props.todo._id, text));
  }

  return (

    <Draggable key={props.todo._id} draggableId={props.todo._id} index={props.index}>
    {(provided)=>(
      <li {...provided.draggableProps}  {...provided.dragHandleProps} ref={provided.innerRef} className='task' onClick={() => dispatch(toggleTodo(props.todo._id))} style={{
      textDecoration: props.todo.done ? 'line-through' : '',
      color: props.todo.done ? '#bdc3c7' : '#34495e'
    }}>
      
      <span style={{ display: editing ? 'none' : '' }}>{props.todo.data}</span>

      <form  style={{ display: editing ? 'inline' : 'none' }} onSubmit={onFormSubmit}>
        <input
          type="text"
          value={text}
          className="edit-todo"
          onChange={(e)=> setText(e.target.value)}
        />
      </form>
      
      <span className='icon'>
        <i className='fas fa-trash' onClick={()=>dispatch(deleteTodo(props.todo._id))}/>
      </span>
      <span className='icon'>
        <i className='fas fa-pen' onClick={() => setEditing(prevState => !prevState)} />
      </span>
    </li>
    )}
    
    </Draggable>

  )
}
