import { useState } from "react";
import {useDispatch} from 'react-redux';
import { addNewTodo } from "../redux/actions";


const ToDoForm = ()=>{
    const[text,setText] = useState("");
    const dispatch = useDispatch();

    const onFormSubmit = (e)=>{
        e.preventDefault();
        dispatch(addNewTodo(text));
        setText("");
    }

    const onInputChange = (e)=>{
        setText(e.target.value);
    }

    return(
        <form className="form" onSubmit={onFormSubmit} >
            <input placeholder="Enter New todo.." className="input" onChange={onInputChange} value={text}></input>
        </form>
    )
}
export default ToDoForm;