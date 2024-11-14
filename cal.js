const instructor = document.querySelector(".instructor")
const container = document.querySelector(".container")
const numberContainer = document.createElement("div")
const display = document.createElement("h2")


numberContainer.classList.add("numberContainer")

container.appendChild(numberContainer)

let firstNumber
let operator
let secondNumber



const calArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "+", "-", "x", "/", "=", "CLEAR"]
const operatorArray = ["+", "-", "x", "/", "=", "CLEAR"]
const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

generateCal(calArray)



function generateCal(array){
    let newRow = document.createElement("div")
    newRow.classList.add("row")
    numberContainer.appendChild(newRow)
    for(i = 0; i < array.length; i++){
        const button = document.createElement("button")
        button.textContent = array[i]
        button.classList.add("number")


        if (i % 3 == 0 && i !== 0){
            newRow = document.createElement("div")
            newRow.classList.add("row")
            numberContainer.appendChild(newRow)
        }

        newRow.appendChild(button)
        button.addEventListener("click", () =>{
            displayNumber(button.textContent)

        })
        
    }
}

function displayNumber(content){
    const int = Number(content)
    if(numberArray.includes(int)){
        firstNumber += int
        console.log(firstNumber)
        display.textContent += int
        
        instructor.appendChild(display)
        
    }
}






function operate(first, operator, second){
    switch (operator){
        case "+":
            return addFunc(first,second);
        case "-":
            return minusFunc(first,second);
        case "x":
            return multiplyFunc(first,second);
        case "/":
            return divideFunc(first,second);
    }
}




function addFunc(first, second){
    return first + second
}

function minusFunc(first, second){
    return first - second
}

function multiplyFunc(first, second){
    return first * second
}

function divideFunc(first, second){
    return first/second
}
