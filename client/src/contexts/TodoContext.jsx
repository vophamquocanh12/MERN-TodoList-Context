import {createContext, useReducer, useState} from 'react'
import {todoReducer} from '../reducers/todoReducer'
import {
	apiUrl,
	TODOS_LOADED_SUCCESS,
	TODOS_LOADED_FAIL,
	ADD_TODO,
	UPDATE_TODO,
	DELETE_TODO,
	FIND_TODO,
	TOGGLE_TODO,
} from './constants'
import axios from 'axios'

export const TodoContext = createContext()

const TodoContextProvider = ({children}) => {
	const [todoState, dispatch] = useReducer(todoReducer, {
		todo: null,
		todos: [],
		todosLoading: true,
	})
	// state

	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null,
	})

	const [showUpdateTodo, setShowUpdateTodo] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [searchValue, setSearchValue] = useState('')
	const [searchLoading, setSearchLoading] = useState(false)

	// get all todo
	const getTodos = async () => {
		try {
			const response = await axios.get(`${apiUrl}/todos`)
			if (response.data.success) {
				dispatch({
					type: TODOS_LOADED_SUCCESS,
					payload: response.data.todos,
				})
			}
		} catch (error) {
			dispatch({
				type: TODOS_LOADED_FAIL,
			})
		}
	}

	// add todo
	const addTodo = async (newTodo) => {
		try {
			const response = await axios.post(`${apiUrl}/todos`, newTodo)
			if (response.data.success) {
				dispatch({type: ADD_TODO, payload: response.data.todo})
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: {success: false, message: 'Server error'}
		}
	}

	// find todo when user is updating todo
	const findTodo = (todoId) => {
		const todo = todoState.todos.find((todo) => todo._id === todoId)
		dispatch({type: FIND_TODO, payload: todo})
	}

	// update todo
	const updateTodo = async (updatedTodo) => {
		try {
			const response = await axios.put(`${apiUrl}/todos/${updatedTodo._id}`, updatedTodo)
			if (response.data.success) {
				dispatch({type: UPDATE_TODO, payload: response.data.todo})
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: {success: false, message: 'Server error'}
		}
	}

	// delete todo
	const deleteTodo = async (todoId) => {
		try {
			const response = await axios.delete(`${apiUrl}/todos/${todoId}`)
			if (response.data.success) {
				dispatch({type: DELETE_TODO, payload: todoId})
			}
		} catch (error) {
			console.log(error)
		}
	}

	// toggle todo
	const toggleTodo = async (todoId) => {
		try {
			const response = await axios.put(`${apiUrl}/todos/${todoId}/toggle`)
			if (response.data.success) {
				dispatch({type: TOGGLE_TODO, payload: todoId})
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: {success: false, message: 'Server error'}
		}
	}

	// search todo
	const searchTodo = async (title) => {
		try {
			const response = await axios.get(`${apiUrl}/todos/question/search?title=${title}`)
			if (response.data.success) {
				dispatch({
					type: TODOS_LOADED_SUCCESS,
					payload: response.data.todos,
				})
			}
		} catch (error) {
			dispatch({
				type: TODOS_LOADED_FAIL,
			})
		}
	}

	// todo context data
	const todoContextData = {
		todoState,
		getTodos,
		addTodo,
		updateTodo,
		deleteTodo,
		findTodo,
		toggleTodo,
		searchTodo,
		showToast,
		setShowToast,
		showUpdateTodo,
		setShowUpdateTodo,
		searchTerm,
		setSearchTerm,
		searchValue,
		setSearchValue,
		searchLoading,
		setSearchLoading,
	}

	return <TodoContext.Provider value={todoContextData}>{children}</TodoContext.Provider>
}

export default TodoContextProvider
