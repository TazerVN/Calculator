const instructor = document.querySelector(".instructor")
const container = document.querySelector(".container")
const numberContainer = document.createElement("div")
const display = document.createElement("div")

const previousNumber = document.createElement("div")
previousNumber.classList.add("previous")



numberContainer.classList.add("numberContainer")

instructor.appendChild(previousNumber)
container.appendChild(numberContainer)

// let firstNumber = ""
// let operator = ""
// let secondNumber = ""


const calArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "+", "-", "x", "/", "=", "CLEAR", "DELETE"]
const operatorArray = ["+", "-", "x", "/"]
const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const storedNumber = []
const storedOperator = []
const displayArray = []
let isReset = false

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

        switch (true){
            case numberArray.includes(array[i]):
                button.addEventListener("click", () =>{
                    displayNumber(button.textContent)
                })  
                break

            case operatorArray.includes(array[i]):
                button.addEventListener("click", () =>{
                    activateOperator(button.textContent)
                })  
                break

            case array[i] === "=":
                button.addEventListener("click", equalFunction)
                break

            case array[i] === "CLEAR":
                button.addEventListener("click", clearFunction)
                break

            case array[i] === "DELETE":
                button.addEventListener("click", deleteFunction)
                break
        }
    
        
    }
}

function displayNumber(content){
    if(display.textContent === "ERROR"){
        display.textContent = ""
    }
    if(isReset === true){
        display.textContent = ''
        previousNumber.textContent = ''
        displayArray.length = 0
        isReset = false
    }
        isReset = false;
        display.textContent += content
        console.log(display.textContent)
        instructor.appendChild(display)
}

function activateOperator(operator){
    if(display.textContent.length === 0 || display.textContent === "ERROR"){
        return
    }
    if(isReset === true){
        previousNumber.textContent = ''
        displayArray.length = 0;
        isReset = false;
    }
    storedNumber.push(display.textContent)
    displayArray.push(display.textContent)
    displayArray.push(operator)
    storedOperator.push(operator)

    previousNumber.textContent = displayArray.join("")
    const displayOperator = document.createElement("div")
    displayOperator.textContent = operator

    display.textContent = ""
    console.table(storedNumber)
    console.table(displayArray)
    console.table(storedOperator)
}

function equalFunction(){
    isReset = true
    storedNumber.push(display.textContent) 
    displayArray.push(display.textContent)
    previousNumber.textContent = displayArray.join("")
    display.textContent = ""
    console.table(storedNumber)
    calculate(storedNumber,storedOperator)
}

function clearFunction(){
    display.textContent = ""
    previousNumber.textContent =""
    storedNumber.length = 0
    storedOperator.length = 0
    displayArray.length = 0

}

function deleteFunction(){
    if(display.textContent === "ERROR"){
        return
    }
    const currentText = display.textContent.substring(0,display.textContent.length - 1)
    display.textContent = currentText
}

function calculate(numberArray,operatorArray){

    for(i = numberArray.length; i > -1; i--){
        if(operatorArray[i] === "x" || operatorArray[i] === "/"){
            console.log("loop")
            const storedOperator = operatorArray[i]
            operatorArray.splice([i],1)
            operatorArray.unshift(storedOperator)

            const storedNumberCalculation1 = numberArray[i]
            const storedNumberCalculation2 = numberArray[i+1]
            numberArray.splice([i],2)
            numberArray.unshift(storedNumberCalculation1, storedNumberCalculation2)
        }
        else{
            continue
        }
    }

    console.table(operatorArray)
    console.table(numberArray)
    while(numberArray.length > 1){
        const first = Number(numberArray[0])
        const operator = operatorArray[0]
        const second = Number(numberArray[1])

        numberArray.splice(0,2)
        operatorArray.splice(0,1)
        const result = operate(first, operator, second)
        if (result === "ERROR"){
            display.textContent = "ERROR"
            break
        }
        numberArray.unshift(result)
        console.table(numberArray)
        display.textContent = numberArray[0]
        if (numberArray.length === 1){
            numberArray.splice(0,1)
        }
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
            if(second === 0){
                return "ERROR"
            }
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
