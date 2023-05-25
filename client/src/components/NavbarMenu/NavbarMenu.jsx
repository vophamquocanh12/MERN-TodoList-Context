import React, {useContext} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

import myTodo from '../../assets/logo.png'
import logoutIcon from '../../assets/logout.svg'
import {AuthContext} from '../../contexts/AuthContext'

const NavbarMenu = () => {
	const {
		authState: {
			user: {nickName},
		},
		logoutUser,
	} = useContext(AuthContext)

	const logout = () => logoutUser()

	return (
		<Navbar
			expand="lg"
			bg="light"
			variant="light"
			className="shadow px-3 py-1">
			<Navbar.Brand className="font-weight-bolder text-dask">
				<img
					src={myTodo}
					alt="myTodo"
					width="32"
					height="32"
					className="mr-2"
				/>
				My Todo
			</Navbar.Brand>

			<Navbar.Toggle aria-controls="basic-navbar-nav" />

			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link
						className="font-weight-bolder text-dask"
						to="/todolist"
						as={Link}>
						Todo List
					</Nav.Link>
					<Nav.Link
						className="font-weight-bolder text-dask"
						to="/about"
						as={Link}>
						About
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			<Navbar.Collapse className="justify-content-end">
				<Nav>
					<Nav.Link
						className="font-weight-bolder text-dask"
						disabled>
						Welcome {nickName}
					</Nav.Link>
					<Button
						variant="danger"
						className="font-weight-bolder text-dask py-0"
						style={{width: '120px'}}
						onClick={logout}>
						<img
							src={logoutIcon}
							alt="logoutIcon"
							width="32"
							height="32"
							className="mr-2"
						/>
						Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavbarMenu
