const { Router } = require('express');
const { getDogs, getDogsById, getDogsByQuery, postDog, getTemperaments } = require('../controllers/index')

const router = Router();

router.get('/dogs', async (req, res) => {
    try {
        const allDogs = await getDogs()
        if (allDogs.length > 0) {
            res.status(200).json(allDogs)
        } else {
            res.status(400).json({ error: "Dogs not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/dogs/search?', async (req, res) => {
    const { name } = req.query
    if (!name || name === "") {
        return res.status(400).json({ message: "Missing data" })
    }
    try {
        const dogFound = await getDogsByQuery(name)
        res.status(200).json(dogFound)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/dogs/:id', async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: "Missing data" })
    try {
        const dogFound = await getDogsById(id)
        if (dogFound.length > 0) {
            res.status(200).json(dogFound)
        } else {
            res.status(400).json({ error: "Dog not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/dogs', async (req, res) => {
    const { name, image, height, weight, life_span, temperaments } = req.body
    if (![name, image, height, weight, life_span].every(Boolean)) {
        return res.status(400).json({ error: "Missing data" })
    }
    try {
        const dogPosted = await postDog(name, image, height, weight, life_span, temperaments)
        res.status(200).json(dogPosted)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/temperaments', async (req, res) => {
    try {
        const allTemperaments = await getTemperaments()
        if (allTemperaments.length > 0) {
            res.status(200).json(allTemperaments)
        } else {
            res.status(400).json({ error: "Temperaments not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;