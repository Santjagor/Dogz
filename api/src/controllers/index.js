const axios = require('axios')
const API_KEY = process.env.API_KEY;

// const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
const URL = `https://api.thedogapi.com/v1/breeds?api_key=live_Uoa8WU6t3ZJ6QmKKFQ8hi10VsCe5o1CgqM2QxPG2UBSZKz7oPUa56FdkibFnlHnK`

const { Dog, Temperament } = require(".././db")

const getDogs = async () => {
    const allDogs = []
    try {
        const apiResponse = await axios(`${URL}`)
        const dbResponse = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            },
        })
        allDogs.push(...dbResponse)
        allDogs.push(...apiResponse.data)
        return allDogs
    } catch (error) {
        throw Error(error.message)
    }
}

const getDogsByQuery = async (name) => {
    try {
        const allDogs = await getDogs()
        const dogsFound = allDogs.filter(dog => dog.name.toLowerCase().startsWith(name.toLowerCase()))
        return dogsFound
    } catch (error) {
        throw Error(error.message)
    }
}

const getDogsById = async (id) => {
    try {
        const allDogs = await getDogs()
        const dogFound = allDogs.filter(dog => dog.id.toString() === id)
        return dogFound
    } catch (error) {
        throw Error(error.message)
    }
}

const postDog = async (name, image, height, weight, life_span, temperaments) => {
    try {
        const dogCreated = await Dog.findOrCreate({
            where: {
                name,
                image,
                height,
                weight,
                life_span,
            },
        })
        if (!dogCreated[1]) {
            return `Dog breed already exist`
        }
        await dogCreated[0].addTemperaments(temperaments)
        return dogCreated[0]
    } catch (error) {
        throw Error(error.message)
    }
}

const deleteDog = async (id) => {
    try {
        const dogDeleted = await Dog.destroy({
            where: {
                id
            }
        })
        return dogDeleted
    } catch (error) {
        throw Error(error.message)
    }
}

const getTemperaments = async () => {
    try {
        const response = await axios(`${URL}`)
        if (response.data.length > 0) {
            response.data.map(async dog => {
                if (dog.temperament) {
                    const temperament = dog.temperament.split(", ")
                    for (let i = 0; i < temperament.length; i++) {
                        const name = temperament[i]
                        await Temperament.findOrCreate({
                            where: {
                                name,
                            }
                        })
                    }
                }
            })
            const allTemperaments = await Temperament.findAll()
            return allTemperaments
        } else {
            throw Error("No response")
        }
    } catch (error) {
        throw Error(error.message)
    }
}

module.exports = {
    getDogs,
    getDogsById,
    getDogsByQuery,
    postDog,
    deleteDog,
    getTemperaments,
}