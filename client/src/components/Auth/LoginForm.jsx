import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import {useContext, useState} from 'react'

import AlertMessage from '../AlertMessage/AlertMessage'
import {AuthContext} from '../../contexts/AuthContext'

const LoginForm = () => {
	// Context
	const {loginUser} = useContext(AuthContext)

	// Local state
	const [loginForm, setLoginForm] = useState({
		username: '',
		password: '',
	})

	const [alert, setAlert] = useState(null)

	const {username, password} = loginForm

	const onChangeLoginForm = (event) =>
		setLoginForm({...loginForm, [event.target.name]: event.target.value})

	const login = async (event) => {
		event.preventDefault()
		try {
			const loginData = await loginUser(loginForm)
			if (!loginData.success) {
				setAlert({type: 'danger', message: loginData.message})
				setTimeout(() => setAlert(null), 5000)
			}
		} catch (error) {
			console.log(error)
		}
	}
	
	
	return (
		<>
			<Form
				className="my-4"
				onSubmit={login}>
				<AlertMessage info={alert} />
				<Form.Group>
					<Form.Control
						type="text"
						placeholder="Username"
						name="username"
						value={username}
						autoComplete="username"
						onChange={onChangeLoginForm}
						required
					/>
				</Form.Group>
				<Form.Group className="mt-2">
					<Form.Control
						type="password"
						placeholder="Password"
						name="password"
						required
						autoComplete="current-password"
						value={password}
						onChange={onChangeLoginForm}></Form.Control>
				</Form.Group>
				<Button
					variant="success"
					type="submit"
					className="mt-3">
					Login
				</Button>
			</Form>
			<p>
				Don't have an account?
				<Link to="/register">
					<Button
						variant="primary"
						size="sm"
						className="ml-2">
						Register
					</Button>
				</Link>
			</p>
		</>
	)
}

export default LoginForm
