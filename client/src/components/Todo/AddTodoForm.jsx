import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'

import {TodoContext} from '../../contexts/TodoContext'
import {useContext, useState} from 'react'

const AddTodoForm = () => {
	const {addTodo, setShowToast} = useContext(TodoContext)

	const [newTodo, setNewTodo] = useState({
		title: '',
		level: 'LOW',
		done: false,
	})

	const {title, level} = newTodo

	const onChangeNewTodo = (event) =>
		setNewTodo({
			...newTodo,
			[event.target.name]: event.target.value,
		})

	const resetAddTodoData = () => {
		setNewTodo({
			title: '',
			level: 'LOW',
			done: false,
		})
	}

	const onSubmit = async (event) => {
		event.preventDefault()
		const {success, message} = await addTodo(newTodo)
		resetAddTodoData()
		setShowToast({show: true, message, type: success ? 'success' : 'danger'})
	}

	return (
		<Form onSubmit={onSubmit} >
			<div
				className="row"
				style={{alignItems: 'center', paddingLeft: '10px'}}>
				<div className="col-5">
					<Form.Group className="my-3">
						<Form.Control
							type="text"
							placeholder="Title"
							name="title"
							required
							aria-describedby="title-help"
							value={title}
							onChange={onChangeNewTodo}
						/>
					</Form.Group>
				</div>
				<div className="col-5">
					<Form.Group className="my-3">
						<Form.Control
							as="select"
							onChange={onChangeNewTodo}
							value={level}
							name="level">
							<option value="LOW">LOW</option>
							<option value="MEDIUM">MEDIUM</option>
							<option value="HIGH">HIGH</option>
						</Form.Control>
					</Form.Group>
				</div>
			
				<div
					className="col-1"
					style={{display: 'flex', justifyContent: 'center'}}>
					<Button
						variant="btn btn-outline-success"
						type="submit">
						Save
					</Button>
				</div>
				<div
					className="col-1"
					style={{display: 'flex', justifyContent: 'center'}}>
					<Button
						variant="btn btn-outline-danger"
						onClick={resetAddTodoData}>
						Cancel
					</Button>
				</div>
			</div>
		</Form>
	)
}

export default AddTodoForm
