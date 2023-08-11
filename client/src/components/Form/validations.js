export default function validate(dogData) {
    let errors = {}

    const onlyNumbers = /^[0-9]*$/
    const onlyLettersAndSpaces = /^[A-Za-z\s]*$/
    const image = /(https?:\/\/.*\.(?:png|jpg))/i

    const min = 1
    const max = 99

    if (!onlyLettersAndSpaces.test(dogData.name)) {
        errors = { ...errors, name: 'Breed Name must contain only letters and spaces' }
    } else if (dogData.name.length > 25 || dogData.name.length < 2) {
        errors = { ...errors, name: 'Breed Name must contain between 2 and 25 characters' }
    } else {
        errors = { ...errors, name: "" }
    }

    if (!onlyNumbers.test(dogData.min_height) || !onlyNumbers.test(dogData.max_height)) {
        errors = { ...errors, height: 'Height must contain only numbers' }
    } else if (dogData.min_height < min || dogData.min_height > max || dogData.max_height < min || dogData.max_height > max) {
        errors = { ...errors, height: 'Height must be between 1 and 99' }
    } else if (Number(dogData.min_height) > Number(dogData.max_height) || Number(dogData.min_height) === Number(dogData.max_height)) {
        errors = { ...errors, height: 'Incorrect Height range' }
    } else {
        errors = { ...errors, height: "" }
    }

    if (!onlyNumbers.test(dogData.min_weight) || !onlyNumbers.test(dogData.max_weight)) {
        errors = { ...errors, weight: 'Weight must contain only numbers' }
    } else if (dogData.min_weight < min || dogData.min_weight > max || dogData.max_weight < min || dogData.max_weight > max) {
        errors = { ...errors, weight: 'Weight must be between 1 and 99' }
    } else if (Number(dogData.min_weight) > Number(dogData.max_weight) || Number(dogData.min_weight) === Number(dogData.max_weight)) {
        errors = { ...errors, weight: 'Incorrect Weight range' }
    } else {
        errors = { ...errors, weight: "" }
    }

    if (!onlyNumbers.test(dogData.min_life_span) || !onlyNumbers.test(dogData.max_life_span)) {
        errors = { ...errors, life_span: 'Life Span must contain only numbers' }
    } else if (dogData.min_life_span < min || dogData.min_life_span > max || dogData.max_life_span < min || dogData.max_life_span > max) {
        errors = { ...errors, life_span: 'Life Span must be between 1 and 99' }
    } else if (Number(dogData.min_life_span) > Number(dogData.max_life_span) || Number(dogData.min_life_span) === Number(dogData.max_life_span)) {
        errors = { ...errors, life_span: 'Incorrect Life Span range' }
    } else {
        errors = { ...errors, life_span: "" }
    }

    if (!image.test(dogData.image)) {
        errors = { ...errors, image: "Incorrect image URL" }
    } else {
        errors = { ...errors, image: "" }
    }

    if (dogData.temperaments.length < 1 || dogData.temperaments.length > 15) {
        errors = { ...errors, temperaments: "Must contain between 1 and 10 temperaments" }
    } else {
        errors = { ...errors, temperaments: "" }
    }

    return errors
}

