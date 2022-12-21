const form = document.querySelector("form")
const inputs = document.querySelectorAll(".field input[name=card-details]")
const cardNumber = document.querySelector(".card-front .card-num")
const cardholder = document.querySelector(".card-front .cardholder")
const cardDate = document.querySelector(".card-front .card-date")
const cardCvc = document.querySelector(".card-back .cvc")
const cardComplete = document.querySelector(".card-complete")
const buttonContinue = document.querySelector(".card-complete button")


//display any change in inputs realtime on cards
inputs.forEach((input) => {
    input.addEventListener("input", () => {     //add event to every input
        if (input.id == "cardholder") {         //find particular input with matching id 
            cardholder.textContent = input.value  //display value of that input in targeted place
        } 
        else if (input.id == "card-num") {
            cardNumber.textContent = input.value.match(/\d{1,4}/g).join(" ") 
        }
        else if (input.id == "month" || input.id == "year") {
            const month = document.querySelector(".field .month").value
            const year = document.querySelector(".field .year").value
            cardDate.textContent = `${month}/${year}`
        }
        else if (input.id == "cvc") {
            cardCvc.textContent = input.value
        }
    })
})

const cardNameCheck = () => {
    const cardNameFormat = /^[a-zA-Z]+\s?[a-zA-Z]+/g
    if (inputs[0].value == "") {
        inputs[0].parentElement.classList.add("active")
        return false
    } else {
        if (inputs[0].value.match(cardNameFormat)) {
            inputs[0].parentElement.classList.remove("active")
            return true
        } else {
            inputs[0].parentElement.lastElementChild.textContent = "Wrong format, letters only"
            inputs[0].parentElement.classList.add("active")
            return false
        }
    }
}

const cardNumberCheck = () => {
    const cardNumFormat = /(\d{4})(\d{4})(\d{4})(\d{4})/g 
    if (inputs[1].value == "") {
        inputs[1].parentElement.classList.add("active")
        return false
    } else {
        if (inputs[1].value.match(cardNumFormat)) {
            inputs[1].parentElement.classList.remove("active")
            return true
        } else {
            inputs[1].parentElement.lastElementChild.textContent = "Wrong format, numbers only"
            inputs[1].parentElement.classList.add("active")
            return false
        } 
    }
}

const monthCheck = () => {
    const monthFormat = /(0[1-9])|(1[012])/g
    if (inputs[2].value == "") {
        inputs[2].parentElement.classList.add("active")
        return false
    } else {
       if (inputs[2].value.match(monthFormat)) {
            inputs[2].style.borderColor = "hsl(279, 6%, 55%)"
            inputs[2].parentElement.lastElementChild.style.display = "none"
            return true
        } else {
            inputs[2].parentElement.lastElementChild.textContent = "Wrong format, numbers only"
            inputs[2].parentElement.lastElementChild.style.display = "block"
            return false
        } 
    }
}

const yearCheck = () => {
    const yearFormat = /[1-9]\d/g
    if (inputs[3].value == "") {
        inputs[3].parentElement.classList.add("active")
        return false
    } else {
        if (inputs[3].value.match(yearFormat)) {
            inputs[3].style.borderColor = "hsl(279, 6%, 55%)"
            inputs[3].nextElementSibling.style.display = "none"
            return true
        } else {
            inputs[3].nextElementSibling.textContent = "Wrong format, numbers only"
            inputs[3].nextElementSibling.style.display = "block"
            return false
        } 
    }
}

const cvcCheck = () => {
    const cvcFormat = /\d{3}/g
    if (inputs[4].value == "") {
        inputs[4].parentElement.classList.add("active")
        return false
    } else {
        if (inputs[4].value.match(cvcFormat)) {
            inputs[4].parentElement.classList.remove("active")
            return true
        } else {
            inputs[4].nextElementSibling.textContent = "Wrong format, numbers only"
            inputs[4].parentElement.classList.add("active")
            return false
        }
    }
}

//add event when submitting to validate value from input
form.addEventListener("submit", (e) => {
    e.preventDefault()
    cardNameCheck()
    cardNumberCheck()
    monthCheck()
    yearCheck()
    cvcCheck()

    //thankyou card can display when only all validating functions become true 
    if (cardNameCheck() === true && cardNumberCheck() === true && monthCheck() === true && yearCheck() === true && cvcCheck() === true) {
        form.style.display = "none"
        cardComplete.style.display = "flex"
    } 
})

buttonContinue.addEventListener("click", () => {
    cardholder.textContent = "Jane Appleseed"
    cardNumber.textContent = "0000 0000 0000 0000"
    cardDate.textContent = "00/00"
    cardCvc.textContent = "000"

    inputs.forEach((input) => {
        input.value = ""
    })

    cardComplete.style.display = "none"
    form.style.display = "flex"
})