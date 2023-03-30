import React from 'react'
import { MdDeleteForever } from "react-icons/md"
import { MdEditSquare } from "react-icons/md"
import { IoMdCheckmarkCircle } from "react-icons/io"

const Todo = ({ todo, deleteTodo, editTodo, handlestatus }) => {


    return (
        <div className='d-flex align-items-center text-start bg-info-subtle rounded mb-1 p-1' >
            <div className={`col ms-2 ${todo.status === true ? "text-decoration-line-through" : ""}`} >
                {todo.value}
            </div>
            <button className='btn p-1' onClick={() => handlestatus(todo.id)}>
                <IoMdCheckmarkCircle className='text-success fs-2 p-1 rounded' />
            </button>
            <button className='btn p-1' onClick={() => editTodo(todo.id)}>
                <MdEditSquare className='text-primary-subtle fs-2 p-1 rounded' />
            </button>
            <button className='btn p-1' onClick={() => deleteTodo(todo.id)}>
                <MdDeleteForever className='text-danger fs-2 p-1  rounded' />
            </button>


        </div>
    )
}

export default Todo