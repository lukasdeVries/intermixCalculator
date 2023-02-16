let $calculatorValueA = ''
let $calculatorValueB = ''
let $operator = null
let result = ''
let $calculatorValueScreen

/* Code uitvoeren wanneer de pagina geladen is. Anders kan de JavaScript bijv. het element 'HTML' niet vinden. */
window.addEventListener( 'DOMContentLoaded', () => {
    
    $calculatorValueScreen = getElement('.calculator__monitor--result')
    
    const $numberButtons = getElements('button[data-number]')
    
    const $operatorButtons = getElements('button[data-operator]')
    
    /* Functie uitvoeren die ervoor zorgt dat wanneer je op de knoppen klikt het thema gewijzigd wordt. */
    addOnclickAction() 
    
    // functie die de slider werkend maakt 
    slider()
    
    // geeft alle buttons met het element van numberButtons een eventlistener 
    Array.from( $numberButtons ).forEach( $numberButton => {
        $numberButton.addEventListener( 'click', () => {
            // voert bij een klik een functie uit waarbij de attribut van de knop wordt toegevoegd en weergegeven op het scherm 
            addNumber( getValue($numberButton, 'data-number'), $calculatorValueScreen )
        } ) 
    } )
                
    // maakt een lijst met operator knoppen             
    Array.from( $operatorButtons ).forEach( $operatorButton => {
        // wacht tot een van de knoppen wordt geklikt 
        $operatorButton.addEventListener( 'click', () => {
            // haalt het attrubuut van de knop op en stelt hem in als de operator en laat de nieuwe som zien 
            setOperator( getValue($operatorButton, 'data-operator') )
        })
        
    })
                
    
    // zoekt in het document naar het element dat enter heet en wachtop een klik 
    document.getElementById('enter').addEventListener('click', () => {

        // functie die de waardes samenstelt en uitrekend 
        result = calculate($calculatorValueA, $operator, $calculatorValueB)

        //geeft het resultaat weer op het scherm 
        $calculatorValueScreen.innerText = result
        // zet alle waardes weer naar nul maar laat het resultaat op het scherm staan 
        reset()

    })

    // zoekt naar het element delete en wacht op een klik 
    document.getElementById('delete').addEventListener('click', () => {
        // voert een functie uit die het laatste nummer uit de string verwijderd  
        deleteNumber( $calculatorValueScreen )
    })

    // zoekt naar een element dat reset heet en wacht op een klik 
    document.getElementById('reset').addEventListener('click', () => {
        reset( $calculatorValueScreen )
    })

} )


// ---------------------------------functions-------------------------!

// stelt de operator in op de meegegeven waarde 
function setOperator( operator ) {
    $operator = operator 

    showCalculation( $calculatorValueScreen )
}

// voegt een nummer toe aan een string afhankelijk van de operator status
function addNumber( value, screen ) {

    if ( $operator === null ) {
        $calculatorValueA = $calculatorValueA + '' + value 
    } else {
        $calculatorValueB = $calculatorValueB + '' + value 
    }

    showCalculation( screen )

}

// maakt alle waardes leeg 
function reset( screen = '' ) 
{
    $calculatorValueA = ''
    $calculatorValueB = ''
    $operator = null
    if ( screen !== '' ) {
        screen.innerText = ''
    }
}

// laat huidige calculatie zien op het scherm op basis van de operator status  
function showCalculation( screen )
{
    // als er geen operator is ingevuld wordt alleen de eerste string weergegeven 
    if ( $operator === null ) {
        screen.innerText = $calculatorValueA
    } else {
        screen.innerText = $calculatorValueA + ' ' + $operator + ' ' + $calculatorValueB 
    }
}

// haalt de waarde op die is verbonden aan de knop die is geklikt 
function getValue(button, attribute) 
{
    return button.getAttribute( attribute )
}
// haalt het element op met de naam die is meegegeven 
function getElement(query) {
    variableName = document.querySelector(query)
    if ( variableName === null ){
        return false 
    } 
    else{
        return variableName
    }
}
// haalt de elementen op die de naam hebben die is meegegeven 
function getElements(query) {
    variableName = document.querySelectorAll(query)
    if ( variableName === null ){
        return false 
    } 
    else{
        return [...variableName]
    }

}

// verwijderd het laatste nummer van een string 
function deleteNumber( $calculatorValueScreen ) {
    // als de operator nog niet is bepaald word er van de eerste string weggenomen
    if ( $operator === null ) {
        $calculatorValueA = $calculatorValueA.substring(0, $calculatorValueA.length -1)
    } else {
        $calculatorValueB = $calculatorValueB.substring(0, $calculatorValueB.length -1)
    }
    showCalculation( $calculatorValueScreen )
}


// voegt de strings die zijn verzameld samen en rekent ze uit 
function calculate( calculatorvalueA, operator, calculatorvalueB) 
{
    let equasion = calculatorvalueA + operator + calculatorvalueB
    console.log(equasion)
    result = eval(equasion) 
    return result
    
}


function addOnclickAction()
{
    /* Het element 'HTML' opzoeken om straks de class van te wijzigen. */
    const $html = document.querySelector( 'html' )
    /* Controleren of het element bestaat, zo niet, stop de code (anders krijg je een error). */
    if ( $html === null ) return false 

    /* De buttons ophalen. */
    const $buttons = document.querySelectorAll( 'input[data-theme]' )
    console.log( $buttons )
    /* Een array maken van de buttons en hierna door alle buttons heen loopen. */
    Array.from( $buttons ).forEach( $button => {
        
        /* Een actie toevoegen die luistert naar de 'klik'. */
        $button.addEventListener( 'click', () => {
            /* De classnaam bepalen aan de hand van de waarde die 'data-theme' heeft bij de button. */
            let className = 'theme-' + $button.getAttribute( 'data-theme' )
            /* Classnaam bij de HTML leegmaken. */
            $html.className = ''
            /* Juiste en nieuwe classnaam toevoegen. */
            $html.classList.add( className )
        } )

    } )

}

function slider() {
    const buttons = document.getElementsByClassName("toggle__button")
    const arr = [...buttons] // = hetzelfde 
    const arr2 = Array.from( buttons ) // = hetzelfde  

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
/*
2 type variabelen:
- const 
- let

const: veranderd NOOIT
let: kan veranderen 
*/


// 1 === 1 = true 
// 1 == 1 = true 
// 1 === '1' = false 
// 1 == '1' = true 
// true === '1' = false
// true == '1' = true 

let number = 5;

number = 4;