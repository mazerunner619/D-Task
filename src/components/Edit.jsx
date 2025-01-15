import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
const Edit = ({close, todo, save, remove}) => {

  const [currTodo, setCurrTodo] = useState(null); 

    useEffect(() => {
        if(todo === null)
            close();
        setCurrTodo(todo);
    }, [todo]);

    const closeModal = (e) => {
        if(e.target?.id === 'modal-bg')
            close();
    }

    const saveEdit = () => {
        if(currTodo?.description !== "" && currTodo.deadline !== "" && (currTodo.done !== todo.done || currTodo.description !== todo.description || currTodo.deadline !== todo.deadline))
            save(currTodo);
        else{
            alert('no changes made')
            close();
        }
    }

  return (
    <div onClick={closeModal} id='modal-bg' className='z-10 fixed w-screen h-screen top-0 left-0 flex justify-center items-center backdrop-blur-sm'>
        <form className="flex-col justify-between w-fit h-fit rounded-xl p-3 bg-white">
            <div className='flex justify-between mb-2 text-primary'>
                <ModeEditIcon />
                <div>
                    
                    {/* <input type="checkbox" checked={currTodo.done} onChange={e => setCurrTodo({...currTodo, done: e.checked})}/> */}
                    {
                        currTodo?.done ?
                        <CheckCircleIcon onClick={() => setCurrTodo({...currTodo, done:false})} className='text-green-400'/> : <CheckBoxOutlineBlankIcon onClick={() => setCurrTodo({...currTodo, done:true})} className='text-red-400'/>
                    }
                    <DeleteIcon onClick={remove} className='text-red-400 cursor-pointer'/>
                </div>
            </div>
            <hr />
            <div className="flex-col gap-x-1">
                <input onChange={e => setCurrTodo({...currTodo, description: e.target.value})} placeholder="description..." className="todo-input" type="text" value={currTodo?.description}/>
                <input onChange={e => setCurrTodo({...currTodo, deadline: e.target.value})} className="todo-input" type="date" name="deadline" value={currTodo?.deadline}/>
            </div>
            <div>
            </div>
            <div onClick={saveEdit} className="my-2 header-btn text-center bg-primary text-white border-0 px-2 py-1 w-full">
                Save
            </div>
        </form>
    </div>
  )
}

export default Edit