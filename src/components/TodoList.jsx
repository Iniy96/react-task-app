import React, { useEffect, useState } from 'react'
import { SiTodoist } from "react-icons/si"
import { TfiWrite } from "react-icons/tfi"
import { BiBookAdd } from "react-icons/bi"
import { BiEditAlt } from "react-icons/bi"
import Todo from './Todo'

const getInitialList = () => {
    if (localStorage.getItem("Todo App")) {
        const initialList = JSON.parse(localStorage.getItem("Todo App"))
        return initialList
    } else {
        return []
    }
}

const TodoList = () => {

    const [todoinput, settodoinput] = useState("")
    const [todoList, settodoList] = useState(getInitialList())
    const [editId, seteditId] = useState("")

    function updateTodoList() {
        if (editId) {
            const updatedList = todoList.map((todo) => {
                if (todo.id === editId) {
                    return todo = { id: todo.id, value: todoinput, status: todo.status }
                } else {
                    return todo = { id: todo.id, value: todo.value, status: todo.status }
                }
            })
            settodoList(updatedList)
            settodoinput("")
            seteditId("")
            return
        }
        if (todoinput) {
            const updateUsers = [
                {
                    id: todoList.length + 1,
                    value: todoinput,
                    status: false
                }, ...todoList
            ];
            settodoList(updateUsers);
        }
        settodoinput("")
    }

    const deletetodo = (id) => {
        const deletedList = todoList.filter(todo => todo.id !== id)
        settodoList(deletedList)
    }

    const editTodo = (id) => {
        seteditId(id)
        const editingTodo = todoList.find((item) => item.id === id)
        settodoinput(editingTodo.value)
    }

    const handlestatus = (statusid) => {

        const updatedList = todoList.map((todo) => {
            if (todo.id === statusid) {
                return todo = { id: todo.id, value: todo.value, status: !todo.status }
            } else {
                return todo = { id: todo.id, value: todo.value, status: todo.status }
            }
        })
        settodoList(updatedList)
        settodoinput("")
    }

    useEffect(() => {
        localStorage.setItem("Todo App", JSON.stringify(todoList))
    }, [todoList])

    return (
        <>
            <div className='container mt-5 text-center' >
                <div style={{width:"500px",minHeight:"550px"}} className="mx-auto rounded border p-4">
                    <h2 className='d-flex align-items-center justify-content-center gap-2'>
                        <SiTodoist className='text-primary fs-2 ' /> TODO List</h2>
                    <div>(This app Stores your Todo Lists in your Local Storage)</div>
                    <div className='mx-auto' style={{ width: "386px" }}>
                        <div className='d-flex align-items-center justify-content-center mt-5  mx-auto mb-3 border rounded'  >
                            <TfiWrite className='mx-1 fs-3  text-muted' />
                            <input type="text" style={{ width: "300px", border: "none", backgroundColor: '#e4eeeb', height: "45px", margin: "1px", paddingLeft: "5px" }}
                                placeholder="Enter Todo..."
                                onChange={(e) => settodoinput(e.target.value)} value={todoinput}
                            />
                            <button className='border bg-success text-white d-flex align-items-center justify-content-center fs-1 rounded-end ' style={{ height: "47px", width: "47px" }}

                                onClick={updateTodoList}
                            > {editId ? <BiEditAlt /> : <BiBookAdd />}</button>
                        </div>

                        <div  >
                            {
                                todoList.map((todo, i) => {
                                    return <Todo key={i} todo={todo} deleteTodo={deletetodo} editTodo={editTodo} handlestatus={handlestatus} />
                                })
                            }
                        </div>
                    </div>
                </div></div>
        </>
    )
}

export default TodoList