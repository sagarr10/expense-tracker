// write javascript here

"use strict";

const list = document.querySelector(".list");

const balance = document.querySelector(".balance");

const incomes = document.querySelector(".money_add");
const expenses = document.querySelector(".money_sub");

balance.textContent = "$0.00";
incomes.textContent = "$0.00";
expenses.textContent = "$0.00";
// list.innerHTML = "";

let transactions = [];
console.log(transactions);
const localStorageTrans = JSON.parse(localStorage.getItem("transactions"));
if (localStorageTrans !== null) {
  transactions = [...localStorageTrans];
} else {
  transactions = [];
}

// Delet the trans btn

// To add the new trasn by user
const addTransBtn = document.querySelector(".form-btn");
const textArea = document.getElementById("text");
const amountArea = document.getElementById("amount");

//
const form = document.querySelector(".form");

const addTrans = function (e) {
  e.preventDefault();

  if (textArea.value === "" || amountArea.value === "" || date.value === "") {
    alert(`Please enter text and amount`);
  } else {
    const t = {
      id: generateID(),
      text: textArea.value,
      amount: +amountArea.value,
      dateel: date.value,
    };
    transactions.push(t);
    addTransaction(t);
    updateLocalStorage();
    updateUI();

    textArea.value = "";
    amountArea.value = "";
    date.value = "";
  }
};

// For the generation of random id
const generateID = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

// To add the transaction

const addTransaction = function (transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const dateel = document.getElementById("date").value;

  const addClass = transaction.amount < 0 ? "sub" : "add";
  const addElementss = document.createElement("li");
  // console.log(addElementss);
  const add = (addElementss.innerHTML = `<li class=${addClass}>
  ${transaction.text} <span class="date">"${
    transaction.dateel
  }"</span>  <span>${sign}$${Math.abs(transaction.amount)} </span
  ><button class="btn--delet">
    <ion-icon class="delet-icon" onClick = "delet(${
      transaction.id
    })" name="trash-outline"></ion-icon>
  </button>
</li>`);

  list.insertAdjacentHTML("afterbegin", add);
};

// To update the balance and at income

const updateUI = function () {
  const amounts = transactions.map((t) => t.amount);
  const totalBalance = amounts.reduce((acc, i) => acc + i, 0).toFixed(2);
  const income = amounts
    .filter((i) => i > 0)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);
  const expense = (
    amounts.filter((e) => e < 0).reduce((acc, curr) => acc + curr, 0) * -1
  ).toFixed(2);

  balance.textContent = `$${totalBalance}`;
  incomes.textContent = `$${income}`;
  expenses.textContent = `$${expense}`;

  // console.log(amounts, totalBalance, income, expense);
};

// Delet
const delet = function (id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  Init();
};

function Init() {
  list.innerHTML = "";
  transactions.forEach(addTransaction);
  updateUI();
}
Init();

form.addEventListener("submit", addTrans);

// Update local storage

const updateLocalStorage = function () {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};
updateLocalStorage();
