import {useEffect, useState } from 'react';
import {connectWallet} from './config/web3js';
import Navbar from './components/Navbar';
import TodoForm from './components/TodoForm'
import Todo from './components/Todo'
import { fetchAllTodos, deleteTodo, createTodo, editTodo, } from './utils/web3methods';
import RefreshIcon from '@mui/icons-material/Refresh';
import Edit from './components/Edit';
function App() {
  const [Account, setAccount] = useState(null);
  const [Web3, setWeb3] = useState(null);
  const [Contract, setContract] = useState(null);
  const [processing, setprocessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [toEdit, setToEdit] = useState(null);

  const [edit, setEdit] = useState(false);

  const [todos, setTodos] = useState([]);

  const connect = async () => {
    const {web3, contract, account} = await connectWallet();
    if(!web3 || !contract || !account){
      alert('Oops! something went wrong');
      return;
    }
    setWeb3(web3);
    setAccount(account);
    setContract(contract);
    setLoading(true);
    setTodos(await fetchAllTodos({contract, account}));
    setLoading(false);
  }

  const addTodo = async(data) => {
    setprocessing(true);
    const res = await createTodo({data, contract:Contract, account: Account});
    setprocessing(false);
    if(res){
      setLoading(true);
      setTodos(await fetchAllTodos({contract: Contract, account: Account}));
      setLoading(false);
    }else{
      alert('something went wrong');
    }
  }

  const removeTodo = async() => {
    if(toEdit === null || toEdit < 0 || toEdit >= todos.length)
      return;
    setEdit(false);
    setSaving(true);
    const res = await deleteTodo({index: toEdit, contract:Contract, account: Account});
    setSaving(false);
    if(res){
      setLoading(true);
      setTodos(await fetchAllTodos({contract: Contract, account: Account}));
      setLoading(false);
    }else{
      alert('something went wrong');
    }
  }

  const enableEdit = (index) => {
    if(index < todos.length){
      setToEdit(index);
      setEdit(true);
    }
  }

  const disableEdit = () => {
    setEdit(false);
    setToEdit(null);
  }

  const editSave = async(modified) => {
    modified.index = toEdit;
    setEdit(false);
    setSaving(true);
    const res = await editTodo({data: modified, contract:Contract, account: Account});
    if(res){
      setLoading(true);
      setTodos(await fetchAllTodos({contract: Contract, account: Account}));
      setLoading(false);
    }else{
      alert('something went wrong');
    }
    setSaving(false);
    disableEdit();
  }

  return (
    <div className="bg-slate-50 min-h-screen">
    <Navbar connected={Account !== null} connect={connect}/>
    {
      Account ?
      <>
      <TodoForm addTodo={addTodo} processing={processing}/>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl mx-1 my-3 text-primary'>My Todo List</h1>
        <div className='mr-2'>
        <i>{loading ? "fetching..." : saving ? "saving...":""}</i>
        </div>

      </div>
      {
        todos.map( (todo, index) => <Todo key={todo.id} todo={{description:todo.description, deadline: todo.deadline, done: todo.done}} index={index} edit={enableEdit}/>)
      }
      {
        edit && <Edit close={disableEdit} todo={todos[toEdit]} save={editSave} remove={removeTodo}/>
      }
      </>
      :
      <div className='flex justify-center items-center h-screen'>
        <div className='flex-col'>
          <i className='text-sm mx-2'>Connect Wallet to View</i>
          <p className='text-xs mt-2 mx-2 bg-secondary p-2 rounded-md md:rounded-full'>A fully decentralized to-do application that stores no data in a database. Your tasks, your control, on the blockchain</p>
          <p className='text-xs mt-2 mx-2 bg-red-300 p-2 rounded-md md:rounded-full'>Make sure <b>Metamask Wallet</b> is installed</p>
        </div>
      </div>
    }
    </div>
  )
}

export default App
