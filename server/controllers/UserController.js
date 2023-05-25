const {User} = require('../models/model')

const express = require('express')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const UserController = {
	checkUserLoggedIn: async (req, res) => {
		try {
			const user = await User.findById(req.userId).select('-password')
			if (!user) return res.status(400).json({message: 'User not found!'})
			res.json({success: true, user})
		} catch (error) {
			console.log(error)
			res.status(500).json({success: false, message: 'Server error!'})
		}
	},

	register: async (req, res) => {
		const {nickName, username, password} = req.body

		// simple validation
		if (!username || !password || !nickName)
			return res
				.status(400)
				.json({success: false, message: 'Missing nick name, username and/or password!'})

		try {
			//check for existing user
			const user = await User.findOne({username})
			if (user) return res.status(400).json({success: false, message: 'User already taken!'})

			//all good
			const hashedPassword = await argon2.hash(password)
			const newUser = new User({
				nickName,
				username,
				password: hashedPassword,
			})
			await newUser.save()

			// Return token
			const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
			res.json({success: true, message: 'User created successfully!', accessToken})
		} catch (error) {
			console.log(error)
			res.status(500).json({success: false, message: 'Internal server error!'})
		}
	},

	login: async (req, res) => {
		const {username, password} = req.body

		// Simple validation
		if (!username || !password)
			return res
				.status(400)
				.json({success: false, message: 'Missing username and/or password!'})

		try {
			// Check for existing user
			const user = await User.findOne({username})
			if (!user) res.status(400).json({success: false, message: 'Incorrect username!'})

			// Username found
			const passwordValid = await argon2.verify(user.password, password)
			if (!passwordValid)
				return res.status(400).json({success: false, message: 'Incorrect password!'})

			// All good
			const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)

			res.json({success: true, message: 'Logged in successfully!', accessToken})
		} catch (error) {
			console.log(error)
			res.status(500).json({success: false, message: 'Internal server error!'})
		}
	},
}

module.exports = UserController