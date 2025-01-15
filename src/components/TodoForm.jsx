import {useState} from "react";

const TodoForm = ({addTodo, processing}) => {

    const [data, setData] = useState({
        description:"", deadline:""
    });

    const handleSubmit = async() => {
        if(processing)
            return;
        if(data.description === "" || data.deadline === ""){
            alert('enter all fields')
            return;
        }
        try {
            const res = await addTodo(data);
        } catch (error) {
            console.log('create todo error: ', error);
            alert(error.message);
        }finally{
            setData({description:"", deadline:""});
        }
    }

    return <div>
            <div className="flex-col gap-x-1">
                <input placeholder="description..." className="todo-input" type="text" name="description" value={data.description} onChange={(e) => setData({...data, description:e.target.value})}/>
                <input className="todo-input sm:w-2/3" type="date" name="deadline" value={data.deadline} onChange={(e) => setData({...data, deadline:e.target.value})}/>
            </div>
            <div>
            </div>
            <div onClick={handleSubmit} className="my-2 header-btn text-center bg-primary text-white border-0 sm:w-1/3 px-2 py-1">{processing ? 'processing...':'Add New Item'}</div>
    </div>
}
export default TodoForm;