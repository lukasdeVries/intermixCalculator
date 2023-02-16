// maakt alle velden aan om later te kunnen gebruiken 
let $calculatorValueA = ''
let $calculatorValueB = ''
let $operator = null
let $result = ''

let $calculatorValueScreen
let $numberButtons
let $operatorButtons


window.addEventListener( 'DOMContentLoaded', () => {
    
    $calculatorValueScreen = getElement('.calculator__monitor--result')
    $numberButtons = getElements('button[data-number]')
    $operatorButtons = getElements('button[data-operator]')

    addOnClickAction()
    slider()

    Array.from( $numberButtons ).forEach( $numberButton => {
        $numberButton.addEventListener( 'click', () => {
            addNumber( getValue( $numberButton, 'data-Number') )
        })
    })

    Array.from( $operatorButtons ).forEach( $operatorButton => {
        $operatorButton.addEventListener( 'click', () => {
            setOperator( getValue($operatorButton, 'data-operator'))
            showCalculation()
        })
    })

    document.getElementById( 'enter' ).addEventListener( 'click', () => {
        result = calculate( $calculatorValueA, $operator, $calculatorValueB)
        showResult(result)
        console.log(result)
        reset()
    })

    document.getElementById( 'delete' ).addEventListener( 'click', () => {
        deleteNumber()
    })

    document.getElementById( 'reset' ).addEventListener( 'click', () => {
        reset('screen')
    })
})

// ------------------------functions-----------------------!


function showCalculation() {
    if ($operator === null ) {
        $calculatorValueScreen.innerText = $calculatorValueA
    } else {
        $calculatorValueScreen.innerText = $calculatorValueA + ' ' + $operator + ' ' + $calculatorValueB
    }
}
function showResult(result){
    $calculatorValueScreen.innerText = result
}

function setOperator( operator ) {
    $operator = operator
}

function addNumber ( value ) {
    if ( $operator === null ){
        $calculatorValueA = $calculatorValueA + '' + value
    }else {
        $calculatorValueB = $calculatorValueB + '' + value
    }
    showCalculation()
}

function reset( screen = '' ) {
    $calculatorValueA = ''
    $calculatorValueB = ''
    $operator = null
    if (screen !== ''){
        $calculatorValueScreen.innerText = ''
    }
}

function getValue( button, attribute ){
    return button.getAttribute( attribute )
} 

function getElement( query ) {
    variableName = document.querySelector(query)
    if (variableName === null){
        return false
    }else {
        return variableName
    }
}

function getElements( query ) {
    variableName = document.querySelectorAll(query)
    if (variableName === null){
        return false
    }else {
        return [...variableName]
    }
}

function deleteNumber() {
    if ( $operator === null ){
        $calculatorValueA = $calculatorValueA.substring(0, $calculatorValueA.length -1)
    }else {
        $calculatorValueB = $calculatorValueB.substring(0, $calculatorValueB.length -1)
    }
    showCalculation()
}

function calculate( ) {
    equasion = $calculatorValueA + $operator + $calculatorValueB
    result = eval(equasion) 
    return result
}

function addOnClickAction () {
    $html = getElement('html')
    $buttons = getElements('input[data-theme]')
    $buttons.forEach( $button => {
        $button.addEventListener( 'click', () => {
            className = 'theme-' + $button.getAttribute('data-theme')
            $html.className = ''
            $html.classList.add( className )
        })
    })
}

function slider() {
    const buttons = document.getElementsByClassName("toggle__button")
    const arr = [...buttons] // = hetzelfde 
    
    arr.forEach((element, index) => {
    element.addEventListener("click", () => {
        element.style.opacity = "1"
    
        arr
        .filter(function (item) {
            return item !== element
        })
        .forEach((item) => {
            item.style.opacity = "0"
        });
    });
    });

}

