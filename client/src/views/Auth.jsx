import {useContext} from 'react'
import {Redirect} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import classNames from 'classnames/bind'

import LoginForm from '../components/Auth/LoginForm'
import RegisterForm from '../components/Auth/RegisterForm'
import {AuthContext} from '../contexts/AuthContext'
import styles from '../styles/views/Auth.module.scss'

const cx = classNames.bind(styles)

const Auth = ({authRoute}) => {
	const {
		authState: {authLoading, isAuthenticated},
	} = useContext(AuthContext)

	let body

	if (authLoading)
		body = (
			<div className="d-flex justify-content-center justify-content-center mt-2">
				<Spinner
					animation="border"
					variant="info"
				/>
			</div>
		)
	else if (isAuthenticated) return <Redirect to="/todolist" />
	else
		body = (
			<>
				{authRoute === 'login' && <LoginForm />}
				{authRoute === 'register' && <RegisterForm />}
			</>
		)

	return (
		<div className={cx('landing')}>
			<div className={cx('dark-overlay')}>
				<div className={cx('landing-inner')}>
					<h1>My Todo</h1>
					<h4>Keep track of your todo list</h4>
					{body}
				</div>
			</div>
		</div>
	)
}

export default Auth
