
import { useEffect, useRef } from 'react'
import todo from '../assets/todo.png'
import TodoItems from './TodoItems'
import { useState } from 'react'

function ToDo() {

    const [ todoList, setTodoList] = useState(
        localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    )

    const inputRef = useRef()

    const add = () => {
        const textInput = inputRef.current.value.trim();

        if (textInput === ""){
            return null
        }
        const newTodo = {
            id: Date.now(),
            text: textInput,
            isComplete: false,
        }
        setTodoList((prev) => [...prev, newTodo])
        inputRef.current.value = ""
    }

    const deleteTodo = (id) => {
        setTodoList((prevTodo) => {
           return prevTodo.filter((todo) => todo.id !== id)
        })
    }

    const toggle = (id) => {
        setTodoList((prevTodos) => {
           return prevTodos.map((todo) => {
                if (todo.id === id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo
            })
        })
    }

    useEffect(()=> {
        localStorage.setItem("todos", JSON.stringify(todoList))
    }, [todoList])
  return (
    <div className="flex flex-col bg-white place-self-center w-11/12 max-w-md
    p-7 min-h-[550px] rounded-xl">
        {/* -----title----- */}
        <div className="flex items-center mt-7 gap-2">
        <img src={todo} className="w-8" alt="" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
        </div>
        {/* ------input------- */}
        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input ref={inputRef} className='bg-transparent border-0 outline-none 
            flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600
            '  type="text" placeholder='Add your task ...' />
            <button onClick={add} className='border-none rounded-full
            bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer
            '>ADD +</button>
        </div>
        {/* -------todo-------- */}
        <div>
            {todoList.map((item, index) => {
                return <TodoItems key={index} text={item.text} id={item.id} 
                  deleteTodo={deleteTodo}  isComplete={item.isComplete} toggle={toggle}
                />
            })}
        </div>
    </div>
  )
}

export default ToDo