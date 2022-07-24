const { PrismaClient } = require('@prisma/client')
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient()

const userData = [
  {
    fullname: 'Demo User',
  },
  {
    fullname: 'Demo User 2',
  },
  {
    fullname: 'Demo User 3',
  },
]

const flightsData = [
	{
	  name: 'Paris - Cairo',
	},
	{
	  name: 'New York - Dublin',
	},
	{
	  name: 'Madrid - Dubai',
	},
	{
	  name: 'LA - Sydney',
	},
	{
	  name: 'Tokyo - Seattle',
	}
  ]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }

  for (const f of flightsData) {
    const flight = await prisma.flight.create({
      data: f,
    })
    console.log(`Created flight with id: ${flight.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
