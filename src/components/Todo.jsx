import { useEffect } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Todo = ({todo, edit, index}) => {
    const classShadow = "shadow-slate-800 shadow-lg rounded-lg p-2 bg-secondary m-1 flex justify-between";
    const classNoShadow = "rounded-lg p-2 bg-secondary grayscale  m-1 flex justify-between";

    return <>
        <div className={todo.done ? classNoShadow:classShadow}>
            <h3 className="text-primary overflow-hidden text-ellipsis w-3/4">{todo.description}</h3>
            <div onClick={() => {
                edit(index);
            }} className="flex text-lg">
                <MoreHorizIcon />
            </div>
        </div>
        <div className="text-primary mr-2 text-xs text-end px-1" style={{filter:todo.done ?"grayscale(100%)":"none"}}>Deadline: {todo.deadline}</div>
    </>
}
export default Todo;