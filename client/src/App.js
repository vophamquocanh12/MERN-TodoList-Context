import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './views/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'
import TodoContextProvider from './contexts/TodoContext'
import TodoList from './views/TodoList'
import ProtectedRoute from './routing/ProtectedRoute'

function App() {
	return (
		<AuthContextProvider>
			<TodoContextProvider>
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							component={Landing}
						/>
						<Route
							exact
							path="/login"
							render={(props) => (
								<Auth
									{...props}
									authRoute="login"
								/>
							)}
						/>
						<Route
							exact
							path="/register"
							render={(props) => (
								<Auth
									{...props}
									authRoute="register"
								/>
							)}
						/>
						<ProtectedRoute
							exact
							path="/todolist"
							component={TodoList}
						/>
					</Switch>
				</Router>
			</TodoContextProvider>
		</AuthContextProvider>
	)
}

export default App
