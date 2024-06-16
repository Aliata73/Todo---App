import tick from '../assets/tick.png';
import del from '../assets/del.png'
import not_tick from '../assets/not-tick.png'

function TodoItems({text, id, isComplete, deleteTodo, toggle}) {
  return (
    <div className="flex items-center my-3 gap-2">
        <div onClick={()=> {toggle(id)}} className='flex flex-1 items-center cursor-pointer'>
            <img className='w-7' src={isComplete? tick : not_tick} alt="" />
            <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isComplete? "line-through" : ""} `}>{text}</p>
        </div>
        <img onClick={()=> deleteTodo(id)} src={del} alt="" className='w-5 cursor-pointer' />
    </div>
  )
}

export default TodoItems