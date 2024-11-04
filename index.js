const form = document.getElementById('form')

const mortgage_amount = document.getElementById('mortgage-Amount')
const mortgage_Term = document.getElementById('mortgage-Term')
const interest_Rate = document.getElementById('Interest-Rate')

const mortgage_Amount_Str = document.getElementById('mortgage-Amount-Msg')
const mortgage_Term_Str = document.getElementById('mortgage-Term-Msg')
const interest_Rate_Str = document.getElementById('Interest-Rate-Msg')

const allInputs = [mortgage_amount, mortgage_Term, interest_Rate]



form.addEventListener('submit', (e) =>{
    //creating error list
    let errors = []

        //check if day input has been added
    errors = getAgeCalculatorErrors(mortgage_amount.value, mortgage_Term.value, interest_Rate.value)
    
    if(errors.length > 0){ 
        e.preventDefault()
    }
    else{
        
    
    }
})

function getAgeCalculatorErrors(amount,Term,Rate){
    let errors = []

    if( amount === '' || amount == null){
        errors.push('this field is required')
        mortgage_Amount_Str.innerText = 'this field is required'
    }
    if( Term === '' || Term == null){
        errors.push('this field is required')  
        mortgage_Term_Str.innerText = 'this field is required'
    }
    if( Rate === '' || Rate == null){
        errors.push('this field is required')
        interest_Rate_Str.innerText = 'this field is required' 
    }

    return errors;
}
//This code will remove error class when keyUp
allInputs.forEach(input => {
    input.addEventListener('input', () =>{
        if(input.classList.contains('error')){
            input.classList.remove('error');
            mortgage_Amount_Str.innerText = ''
            mortgage_Term_Str.innerText = ''
            interest_Rate_Str.innerText = ''
        }
    })
})

//This code prevents letters and special characters
function numbersOnly(interest_Rate,mortgage_Term){
    var regex = /[^\d*\.?\d*$]/
    interest_Rate.value = interest_Rate.value.replace(regex,"")
    mortgage_Term.value = mortgage_Term.value.replace(regex,"")
}