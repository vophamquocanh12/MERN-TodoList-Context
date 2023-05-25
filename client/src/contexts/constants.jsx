export const apiUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : ''

export const LOCAL_STORAGE_TOKEN_NAME = 'todo-list'

export const TODOS_LOADED_SUCCESS = 'TODOS_LOADED_SUCCESS'
export const TODOS_LOADED_FAIL = 'TODOS_LOADED_FAIL'
export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const FIND_TODO = 'FIND_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SEARCH_TODO = 'SEARCH_TODO'