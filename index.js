const form = document.getElementById('form')

const Static_Panel = document.getElementById('Static-Panel')
const Results_Panel = document.getElementById('Results-Panel')

const mortgage_amount = document.getElementById('mortgage-Amount')
const mortgage_Term = document.getElementById('mortgage-Term')
const interest_Rate = document.getElementById('Interest-Rate')

const repayment = document.getElementById('Repayment')
const interest_Only = document.getElementById('Interest-Only')
const checkboxes = document.querySelector('input[type="radio"]')

const mortgage_Amount_Str = document.getElementById('mortgage-Amount-Msg')
const mortgage_Term_Str = document.getElementById('mortgage-Term-Msg')
const interest_Rate_Str = document.getElementById('Interest-Rate-Msg')
const mortgage_Type_Str = document.getElementById('mortgage-Type-Msg')

const monthly_Payments = document.getElementById('monthly-Payments')
const repayTerm = document.getElementById('repayTerm')

const clearAll = document.getElementById('clearAll')


const allInputs = [mortgage_amount, mortgage_Term, interest_Rate]

ClearAll.addEventListener("click", () => {
    mortgage_amount.value = "";
    mortgage_Term.value = "";
    interest_Rate.value = "";
    repayment.checked = false;
    interest_Only.checked = false;
    Static_Panel.style.display ="block"
    Results_Panel.style.display ="none"
});

form.addEventListener('submit', (e) =>{
    //creating error list
    let errors = []

    //change format of output
    let format = new Intl.NumberFormat('en-SA',{
        style: 'currency',
        currency: 'ZAR'
    })

    errors = getErrors(mortgage_amount.value, mortgage_Term.value, interest_Rate.value,repayment.value,interest_Only.value)
    m = getMonthlyPayment(mortgage_amount.value, mortgage_Term.value, interest_Rate.value)
    pmv = getTotalPayment(m, mortgage_Term.value)
    
    if(errors.length > 0){ 
        e.preventDefault()
        
    }
    else{   
    monthly_Payments.innerText = format.format(m)
    repayTerm.innerText = format.format(pmv)
    Static_Panel.style.display ="none"
    Results_Panel.style.display ="block"
    }
})

//This code will calculate the monthly mortgage payment
function getMonthlyPayment(mortgage_Amount,mortgage_Term,interest_Rate){
    var p = mortgage_Amount
    var i = (interest_Rate /100) / 12
    var n = mortgage_Term * 12

    return  p * (i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));
}
function getTotalPayment(m, mortgage_Term){
    var n = mortgage_Term * 12
    
    return  pmv = m * n 

}

//This code will find errors in the program
function getErrors(amount,Term,Rate,){
    let errors = []

    if( amount === '' || amount == null){
        errors.push('this field is required')
        mortgage_amount.classList.add('error')
        mortgage_Amount_Str.innerText = 'this field is required'
    }
    if( Term === '' || Term == null){
        errors.push('this field is required')
        mortgage_Term.classList.add('error')  
        mortgage_Term_Str.innerText = 'this field is required'
    }
    if( Rate === '' || Rate == null){
        errors.push('this field is required')
        interest_Rate.classList.add('error')
        interest_Rate_Str.innerText = 'this field is required' 
    }
    if(!repayment.checked && !interest_Only.checked) {
        errors.push('this field is required')
        repayment.classList.add('error')
        mortgage_Type_Str.innerText = 'this field is required'
      }else{
        mortgage_Type_Str.innerText = ''
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
            mortgage_Type_Str.innerText = ''
        }
    })
})

//This code will clear all inputs


//This code prevents letters and special characters
function numbersOnly(interest_Rate,mortgage_Term){
    var regex = /[^\d*\.?\d*$]/
    interest_Rate.value = interest_Rate.value.replace(regex,"")
    mortgage_Term.value = mortgage_Term.value.replace(regex,"")
}