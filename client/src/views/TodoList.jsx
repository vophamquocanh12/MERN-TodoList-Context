/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind'
import {useContext, useEffect} from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Toast from 'react-bootstrap/Toast'

import styles from '../styles/views/TodoList.module.scss'
import {TodoContext} from '../contexts/TodoContext'
import AddTodoForm from '../components/Todo/AddTodoForm'
import UpdateTodoForm from '../components/Todo/UpdateTodoForm'
import SingleTodo from '../components/Todo/SingleTodo'
import SearchForm from '../components/Todo/SearchForn'
import useDebounce from '../hook/useDebounce'

const cx = classNames.bind(styles)

const TodoList = () => {
	//context
	const {
		todoState: {todos, todosLoading},
		getTodos,
		searchTodo,
		showToast: {show, message, type},
		setShowToast,
		showUpdateTodo,
		searchTerm,
		setSearchTerm,
		searchValue,
		setSearchValue,
		searchLoading,
		setSearchLoading,
	} = useContext(TodoContext)

	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	const search = async () => {
		if(debouncedSearchTerm){
			setSearchLoading(true)
			await searchTodo(debouncedSearchTerm)
			setSearchLoading(false)
		}else{
			getTodos()
		}
	}

	//Start: Get all todo
	// useEffect(() => {
	// 	search()
	// }, [searchTerm])

	useEffect(() => {
		search()
	}, [debouncedSearchTerm]);

	let filteredTodos = todos

	if (searchTerm) {
		filteredTodos = todos.filter((todo) =>
			todo.title.toLowerCase().includes(searchTerm.toLowerCase())
		)
	}

	let body

	if (todosLoading) {
		body = (
			<tr className="spinner-container">
				<td colSpan={5}>
					<Spinner
						animation="border"
						variant="info"
					/>
				</td>
			</tr>
		)
	} else if (filteredTodos.length === 0) {
		body = (
			<tr
				style={{alignItems: 'center'}}
				className="table table-active">
				<td colSpan={5}>No data available in table</td>
			</tr>
		)
	} else {
		body = (
			<>
				{filteredTodos.map((todo, index) => (
					<SingleTodo
						key={todo._id}
						index={index + 1}
						todo={todo}
					/>
				))}
			</>
		)
	}

	return (
		<div className={cx('todo-list')}>
			<div className="row">
				<div className="col">
					<h1 className={cx('title-h1')}>Todo List</h1>
				</div>
			</div>

			<SearchForm
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				isLoading={searchLoading}
			/>
			{showUpdateTodo ? <UpdateTodoForm /> : <AddTodoForm />}

			<table className="table table-hover mt-5">
				<thead style={{textAlign: 'center'}}>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Level</th>
						<th scope="col">Status</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody style={{textAlign: 'center'}}>{body}</tbody>
			</table>

			<Toast
				show={show}
				style={{position: 'fixed', top: '9%', right: '10px'}}
				className={`bg-${type} text-white`}
				delay={3000}
				autohide
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null,
				})}>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
		</div>
	)
}
export default TodoList
