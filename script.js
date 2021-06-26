const transactionsUl = document.querySelector('#transactions')
let incomeDisplay = document.querySelector('#money-plus')
let expenseDisplay = document.querySelector('#money-minus')
let balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

/* let tes = transactions.map((a, b, c) => a.amount < 0 ? a.amount : null)
let t = tes.reduce((accumulator, a) => accumulator + a, 0)
console.log(t) */

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
  transactions = transactions.filter(transaction => transaction.id !== ID)
  init()
  updateLocalStorage()
}

const addTransactionIntoDOM = transaction => {
  const operator = transaction.amount < 0 ? '-' : '+'
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
  const amountWithoutOperator = Math.abs(transaction.amount)
  const li = document.createElement('li')
  let data = new Date();
  let dia = String(data.getDate()).padStart(2, '0');
  let mes = String(data.getMonth() + 1).padStart(2, '0');
  let ano = data.getFullYear();
  dataTransacao = dia + '/' + mes + '/' + ano;

  li.classList.add(CSSClass)
  li.innerHTML = `<small>${dataTransacao}</small> ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn" onClick="removeTransaction(${transaction.id})">X</button>`

  transactionsUl.appendChild(li)
}

const updateBalanceValues = () => {
  const transactionsAmounts = transactions.map(transaction => transaction.amount)
  const total = transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)
  const income = transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)
  const expense = Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)
  
  balanceDisplay.textContent = `R$ ${total}`
  incomeDisplay.textContent = `R$ ${income}`
  expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
  transactionsUl.innerHTML = ''
  transactions.forEach(addTransactionIntoDOM)
  updateBalanceValues()
}

init()

 const updateLocalStorage = () => {
   localStorage.setItem('transactions', JSON.stringify(transactions))
 }

form.addEventListener('submit', event => {
  event.preventDefault()

  const transactionName = inputTransactionName.value.trim()
  const transactionAmount = inputTransactionAmount.value.trim()

  if(transactionName === '' || transactionAmount === '') {
    alert('pls preencha os negocio ali embaixo')
    return
  }

  const generateID = () => Math.round(Math.random() * 1000)

  const transaction = {id: generateID(), name: transactionName, amount: Number(transactionAmount)}

  transactions.push(transaction)
  init()
  updateLocalStorage()

  inputTransactionAmount.value = ''
  inputTransactionName.value = ''
})



/*
const addTransactionsAmount = (valor) => {
  if(valor < 0){
    moneyMinus.innerHTML = eval(`${moneyMinus.innerHTML} + ${String(valor)}`)
  }else{
    moneyPlus.innerHTML = eval(`${moneyPlus.innerHTML} + ${String(valor)}`)
  }
}

const adicionar = (event) => {

  event.preventDefault()
  let nomeTransacao = document.querySelector('#text').value
  let valorTransacao = document.querySelector('#amount').value
  let transacao = {name: nomeTransacao, amount: valorTransacao};
  addTransactionIntoDOM(transacao)
  addTransactionsAmount(valorTransacao)
 }*/