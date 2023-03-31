import './App.css';
import Header from './components/Header';
import ToDoForm from './components/ToDoForm';
import Todos from './components/Todos';


function App() {
  return (
    <div className="App">
      <Header />
      <ToDoForm />
      <Todos/>
    </div>
  );
}

export default App;
