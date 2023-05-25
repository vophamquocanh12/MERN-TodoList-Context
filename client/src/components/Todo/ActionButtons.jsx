import {useContext} from 'react'
import classNames from 'classnames/bind'

import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import {TodoContext} from '../../contexts/TodoContext'

import styles from '../../styles/components/Todo/ActionButtons.module.scss'

const cx = classNames.bind(styles)

const ActionButtons = ({_id}) => {
	const {deleteTodo, findTodo, setShowToast, setShowUpdateTodo} = useContext(TodoContext)

	const onDelete = async (event) => {
		event.preventDefault()
		const {success} = deleteTodo(_id)
		setShowToast({
			show: true,
			message: 'Delete successfully!',
			type: success ? 'success' : 'danger',
		})
	}

	const chooseTodo = (todoId) => {
		findTodo(todoId)
		setShowUpdateTodo(true)
	}

	return (
		<>
			<button
				className={cx('todo-button')}
				onClick={chooseTodo.bind(this, _id)}>
				<img
					src={editIcon}
					alt="edit"
					with="24"
					height="24"
				/>
			</button>

			<button
				className={cx('todo-button')}
				onClick={onDelete}>
				<img
					src={deleteIcon}
					alt="delete"
					with="24"
					height="24"
				/>
			</button>
		</>
	)
}

export default ActionButtons
