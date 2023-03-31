import { useEffect } from 'react';
import { deleteTodo, getAllTodos } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable} from "react-beautiful-dnd";
import { ALL_TODOS, DONE_TODOS, ACTIVE_TODOS } from '../redux/actions/type';

//components
import Todo from './Todo';
import Tabs from './Tabs';

export default function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const currentTab = useSelector(state => state.currentTab);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [])

  const getTodos = () => {
    if (currentTab === ALL_TODOS) {
      return todos;
    }
    else if (currentTab === ACTIVE_TODOS) {
      return todos.filter(todo => !todo.done)
    }
    else if (currentTab === DONE_TODOS) {
      return todos.filter(todo => todo.done)
    }
  }

  const removeDoneTodos = () => {
    todos.forEach(({ done, _id }) => {
      if (done) {
        dispatch(deleteTodo(_id));
      }
    })
  }
  return (

    <article>
      <div>
        <Tabs currentTab={currentTab} />
        {
          todos.some(todo => todo.done) ? (
            <button className='button clear' onClick={removeDoneTodos}>
              Remove Done ToDo's
            </button>) : null
        }
      </div>
      <DragDropContext>
        <Droppable droppableId='todos'>
          {
            (provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {
                  getTodos().map((todo,index)=> (

                    <Todo key={todo._id} todo={todo} index={index}/>

                  ))
                }
                {provided.placeholder}
              </ul>
              )}
      </Droppable>
      </DragDropContext>
    </article>
  )
}
