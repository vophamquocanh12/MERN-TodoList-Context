import {
	TODOS_LOADED_SUCCESS,
	TODOS_LOADED_FAIL,
	ADD_TODO,
	UPDATE_TODO,
	DELETE_TODO,
	FIND_TODO,
	TOGGLE_TODO,
	SEARCH_TODO,
} from '../contexts/constants'

export const todoReducer = (state, action) => {
	const {type, payload} = action

	switch (type) {
		case TODOS_LOADED_SUCCESS:
			return {
				...state,
				todos: payload,
				todosLoading: false,
			}

		case TODOS_LOADED_FAIL:
			return {
				...state,
				todos: [],
				todosLoading: false,
			}

		case TOGGLE_TODO:
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo._id === payload ? {...todo, done: !todo.done} : todo
				),
			}
		case ADD_TODO:
			return {
				...state,
				todos: [...state.todos, payload],
			}

		case FIND_TODO:
			return {
				...state,
				todo: payload,
			}

		case UPDATE_TODO:
			const newTodos = state.todos.map((todo) => (todo._id === payload._id ? payload : todo))

			return {
				...state,
				todos: newTodos,
			}

		case DELETE_TODO:
			return {
				...state,
				todos: state.todos.filter((todo) => todo._id !== payload),
			}

		case SEARCH_TODO:
			return {
				...state,
				todos: payload,
			}

		default:
			return state
	}
}
