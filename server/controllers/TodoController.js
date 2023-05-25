const {Todo} = require('../models/model')

const TodoController = {
	//todos
	createTodo: async (req, res) => {
		const {title, level} = req.body

		if (!title) return res.status(400).json({success: false, message: 'Todo is required!'})
		try {
			const newTodo = await Todo.create({
				title,
				createdAt: Date.now(),
				level: level || 'LOW',
				user: req.userId,
			})
			await newTodo.save()
			res.json({success: true, message: 'Add todo successfully!', todo: newTodo})
		} catch (error) {
			res.status(500).json({success: false, message: 'Internal server error!'})
		}
	},

	//todos
	getAllTodo: async (req, res) => {
		try {
			const todos = await Todo.find({user: req.userId})
				.populate('user', ['username'])
				.sort({createdAt: -1})
			res.json({success: true, todos})
		} catch (error) {
			res.status(500).json({success: false, message: 'Internal server error!'})
		}
	},

	//todos/done : not done
	getAllTodoDone: async (req, res) => {
		try {
			const todos = await Todo.find({user: req.userId, done: true})
				.populate('user', ['username'])
				.sort({createdAt: -1})
			res.json({success: true, todos})
		} catch (error) {
			res.status(500).json({success: false, message: 'Internal server error!'})
		}
	},

	//todos/question/level : not done
	getAllTodoLevel: async (req, res) => {
		try {
			const level = req.query.level

			const filter = {user: req.userId}
			if (level) {
				filter.level = {$regex: new RegExp(level, 'i')}
			}

			const todos = await Todo.find(filter)
				.populate('user', ['username'])
				.sort({createdAt: -1})

			res.json({success: true, todos})
		} catch (error) {
			res.status(500).json({success: false, message: 'Internal server error!'})
		}
	},

	//todos/:id
	updateTodo: async (req, res) => {
		const {title, level, done} = req.body
		// Simple validation
		if (!title) return res.status(400).json({success: false, message: 'Title is required'})

		try {
			let updatedTodo = {
				title,
				done,
				level: level || 'LOW',
			}

			const todoUpdateCondition = {_id: req.params.id, user: req.userId}

			updatedTodo = await Todo.findOneAndUpdate(todoUpdateCondition, updatedTodo, {new: true})

			// User not authorised to update todo or todo not found
			if (!updatedTodo)
				return res.status(401).json({
					success: false,
					message: 'Todo not found or user not authorised!',
				})

			res.json({
				success: true,
				message: 'Update todo successfully!',
				todo: updatedTodo,
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({success: false, message: 'Internal server error'})
		}
	},

	//todos/:id
	deleteTodo: async (req, res) => {
		try {
			const todoDeleteCondition = {_id: req.params.id, user: req.userId}
			const deleteTodo = await Todo.findOneAndDelete(todoDeleteCondition)

			//user not authorized or todo not found
			if (!deleteTodo)
				return res
					.status(401)
					.json({success: false, message: 'Todo not found or user authorized!'})
			res.json({success: true, message: 'Delete todo successfully!', todo: deleteTodo})
		} catch (error) {
			res.status(500).json({success: false, message: 'Internal server error!'})
		}
	},

	//todos/:id/toggle
	toggleTodo: async (req, res) => {
		try {
			const todoUpdateCondition = {_id: req.params.id, user: req.userId}
			const todo = await Todo.findOne(todoUpdateCondition)

			if (!todo) {
				return res.status(404).json({success: false, message: 'Todo not found!'})
			}

			todo.done = !todo.done
			const updatedTodo = await Todo.findOneAndUpdate(todoUpdateCondition, todo, {new: true})

			res.json({
				success: true,
				message: `Todo ${updatedTodo.done ? 'done' : 'undone'} successfully!`,
				todo: updatedTodo,
			})
		} catch (error) {
			res.status(500).json({success: false, message: 'Internal server error!'})
		}
	},

	//todos/question/search
	searchTodo: async (req, res) => {
		const title = req.query.title

		try {
			const todos = await Todo.find({
				user: req.userId,
				$or: [{title: {$regex: title, $options: 'i'}}],
			}).sort({createdAt: -1})

			res.json({success: true, todos})
		} catch (error) {
			console.log(error)
			res.status(500).json({success: false, message: 'Internal server error'})
		}
	},
}
module.exports = TodoController
