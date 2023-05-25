const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	done: {
		type: Boolean,
		default: false,
	},
	level: {
		type: String,
		enum: ['LOW', 'MEDIUM', 'HIGH'],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
	},
})

module.exports = mongoose.model('Todo', TodoSchema)
