const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client')
var cors = require('cors');

dotenv.config({ path: '../.env' })

const prisma = new PrismaClient()
const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.post(`/comment`, async (req, res) => {
	const { comment, tags, flightId, userId } = req.body
	if (!comment || !flightId || !userId) {
		return res.status(400).send('Bad request!')
	} else {
		const result = await prisma.comment.create({
		data: {
			comment,
			tags,
			flight: {
				connect: {
					id: parseInt(flightId),
				},
			},
			user: {
				connect: {
					id: parseInt(userId),
				},
			},
		},
		})
		res.json(result)
	}
})

app.get('/flight/:id/comments', async (req, res) => {
	const { id } = req.params
	const comments = await prisma.comment.findMany({
		where: {
			flightId: parseInt(id),
		},
		include: { user: true }
	})
	res.json(comments)
})

app.get('/flight/:id', async (req, res) => {
	const { id } = req.params
	const flight = await prisma.flight.findFirst({
		where: {
			id: parseInt(id),
		},
		include: { 
			comments: true
		}
	})
	res.json(flight)
})

app.get('/flights', async (req, res) => {
	const flights = await prisma.flight.findMany({})
	res.json(flights)
})

app.get('/users', async (req, res) => {
	const users = await prisma.user.findMany({})
	res.json(users)
})

const server = app.listen(3001, () =>
	console.log(`🚀 Server ready at: http://localhost:3001`),
)
