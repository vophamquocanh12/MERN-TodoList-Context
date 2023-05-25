import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import {useState, useContext} from 'react'

import AlertMessage from '../AlertMessage/AlertMessage'
import {AuthContext} from '../../contexts/AuthContext'

const RegisterForm = () => {
	// Context
	const {registerUser} = useContext(AuthContext)

	// Local state
	const [registerForm, setRegisterForm] = useState({
        nickName: '',
		username: '',
		password: '',
		confirmPassword: '',
	})

	const [alert, setAlert] = useState(null)

	const {nickName, username, password, confirmPassword} = registerForm

	const onChangeRegisterForm = (event) =>
		setRegisterForm({...registerForm, [event.target.name]: event.target.value})

	const register = async (event) => {
		event.preventDefault()

		if (password !== confirmPassword) {
			setAlert({type: 'danger', message: 'Password do not match'})
			setTimeout(() => setAlert(null), 5000)
			return
		}

		try {
			const registerData = await registerUser(registerForm)
			if (!registerData.success) {
				setAlert({type: 'danger', message: registerData.message})
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
				onSubmit={register}>
				<AlertMessage info={alert} />
				<Form.Group>
					<Form.Control
						type="text"
						placeholder="Nick name"
						name="nickName"
						value={nickName}
						autoComplete="nickName"
						onChange={onChangeRegisterForm}
						required
					/>
				</Form.Group>
                <Form.Group className="mt-2">
					<Form.Control
						type="text"
						placeholder="Username"
						name="username"
						value={username}
						autoComplete="username"
						onChange={onChangeRegisterForm}
						required
					/>
				</Form.Group>
				<Form.Group className="mt-2">
					<Form.Control
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						autoComplete="current-password"
						onChange={onChangeRegisterForm}
						required
					/>
				</Form.Group>
				<Form.Group className="mt-2">
					<Form.Control
						type="password"
						placeholder="Confirm password"
						name="confirmPassword"
						value={confirmPassword}
						autoComplete="current-password"
						onChange={onChangeRegisterForm}
						required
					/>
				</Form.Group>
				<Button
					variant="success"
					type="submit"
					className="mt-3">
					Register
				</Button>
			</Form>
			<p>
				Already have an account?
				<Link to="/login">
					<Button
						variant="primary"
						size="sm"
						className="ml-2">
						Login
					</Button>
				</Link>
			</p>
		</>
	)
}

export default RegisterForm
