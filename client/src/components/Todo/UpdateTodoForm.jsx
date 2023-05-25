import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'

import {TodoContext} from '../../contexts/TodoContext'
import {useContext, useEffect, useState} from 'react'

const UpdateTodoForm = () => {
	const {
		todoState: {todo},
		setShowUpdateTodo,
        updateTodo,
        setShowToast
	} = useContext(TodoContext)

    const [updatedTodo, setUpdatedTodo] = useState(todo)

    useEffect(() => {
        setUpdatedTodo(todo)
    }, [todo])

    const {title, level} = updatedTodo

    const onChangeUpdateTodo = (event) => setUpdatedTodo({
        ...updatedTodo,
        [event.target.name]: event.target.value
    })

    const onSubmit = async event =>{
        event.preventDefault()
        const { success, message } = await updateTodo(updatedTodo)
        setShowUpdateTodo(false)
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
    }

    const closeUpdate = () => {
        setUpdatedTodo(todo)
        setShowUpdateTodo(false)
    }

	return (
		<Form onSubmit={onSubmit}>
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
                            defaultValue={title}
							onChange={onChangeUpdateTodo}
						/>
					</Form.Group>
				</div>
				<div className="col-5">
					<Form.Group className="my-3">
						<Form.Control
							as="select"
							name="level"
                            value={level}
                            onChange={onChangeUpdateTodo}
							 
                            >
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
						Update
					</Button>
				</div>
				<div
					className="col-1"
					style={{display: 'flex', justifyContent: 'center'}}>
					<Button variant="btn btn-outline-danger" onClick={closeUpdate}>Cancel</Button>
				</div>
			</div>
		</Form>
	)
}

export default UpdateTodoForm
