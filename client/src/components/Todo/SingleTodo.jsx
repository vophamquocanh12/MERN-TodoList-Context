import {useContext} from 'react'
import classNames from 'classnames/bind'
import Form from 'react-bootstrap/Form'

import styles from '../../styles/components/Todo/SingleTodo.module.scss'
import ActionButtons from './ActionButtons'
import {TodoContext} from '../../contexts/TodoContext'

const cx = classNames.bind(styles)

const SingleTodo = ({todo: {_id, title, level, done}, index}) => {
	const {toggleTodo} = useContext(TodoContext)

	const handleToggleTodo = (e, todoId) => {
		toggleTodo(todoId)
	}

	return (
		<tr>
			<td>{index}</td>
			<td>{title}</td>
			<td>
				<p className={cx(level === 'LOW' ? 'low' : level === 'MEDIUM' ? 'medium' : 'high')}>
					{level}
				</p>
			</td>
			<td>
				<Form.Check
					className={cx('check-box')}
					type="checkbox"
					name="done"
					label={<p className={cx(done ? 'done' : 'not-done')}>Done</p>}
					checked={done}
					onChange={(e) => handleToggleTodo(e, _id)}
				/>
			</td>
			<td>
				<ActionButtons _id={_id} />
			</td>
		</tr>
	)
}
export default SingleTodo
