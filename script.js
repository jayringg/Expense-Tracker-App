window.addEventListener('load', () => {

  const totalExpenses = document.getElementById('total-expenses-container');
  const addIncome = document.getElementById('add-income');
  const deleteIncome = document.getElementById('delete-income');
  const incomeContainer = document.getElementById('income-container');
  const incomeContainerForm = document.getElementById('income-container-form');
  const savings = document.getElementById('savings');
  const expenseForm = document.getElementById('expense-form');
  const forms = [expenseForm, incomeContainerForm];
  expenseButton = document.getElementById('expense-button');
  deleteExpenseButton = document.getElementById('delete-expense-button')
  incomeContainer.textContent = `$0.00`;
  totalExpenses.textContent = `$0.00`;
  savings.textContent = `$0.00`;
function loadItems() {
  try {
      const data = JSON.parse(localStorage.getItem('myData'));
      if (data) { 
        const { items, items2, income, expenses} = data;
      
              incomeContainer.textContent = income;
              totalExpenses.textContent = expenses;
        
              items.forEach(item => {
                const input1 = document.createElement('div');
                input1.classList.add('income-container-div');
                const input2 = document.createElement('input');
                input2.type = 'text';
                input2.value = item.name;
                input2.addEventListener('blur', handleInputBlur);
                input2.addEventListener('keydown', handleKeyDown);
                const input3 = document.createElement('input');
                input3.type = 'text';
                input3.value = item.value;
                input3.addEventListener('blur', handleInputBlur);
                input3.addEventListener('keydown', handleKeyDown);
                incomeContainerForm.appendChild(input1);
                input1.appendChild(input2);
                input1.appendChild(input3);
              });
             
              items2.forEach(item => {
                  const input1 = document.createElement('div');
                  input1.classList.add('expense-form-div');
                  const input2 = document.createElement('input');
                  input2.type = 'text';
                  input2.value = item.name;
                  input2.addEventListener('blur', handleInputBlur);
                  input2.addEventListener('keydown', handleKeyDown);
                  const input3 = document.createElement('input');
                  input3.type = 'text';
                  input3.value = item.value;
                  input3.addEventListener('blur', handleInputBlur);
                  input3.addEventListener('keydown', handleKeyDown);
                  expenseForm.appendChild(input1);
                  input1.appendChild(input2);
                  input1.appendChild(input3);
                });
              
            } else {
          
          for (let i = 0; i < 5; i++) {
              const input1 = document.createElement('div');
              input1.classList.add('income-container-div');
              const input2 = document.createElement('input');
              input2.type = 'text';
              input2.addEventListener('blur', handleInputBlur);
              input2.addEventListener('keydown', handleKeyDown);
              const input3 = document.createElement('input');
              input3.type = 'text';
              input3.value = '$';
              input3.addEventListener('blur', handleInputBlur);
              input3.addEventListener('keydown', handleKeyDown);
              incomeContainerForm.appendChild(input1);
              input1.appendChild(input2);
              input1.appendChild(input3);
          }
          for (let i = 0; i < 5; i++) {
              const input1 = document.createElement('div');
              input1.classList.add('expense-form-div');
              const input2 = document.createElement('input');
              input2.type = 'text';
              input2.addEventListener('blur', handleInputBlur);
              input2.addEventListener('keydown', handleKeyDown);
              const input3 = document.createElement('input');
              input3.type = 'text';
              input3.value = '$';
              input3.addEventListener('blur', handleInputBlur);
              input3.addEventListener('keydown', handleKeyDown);
              expenseForm.appendChild(input1);
              input1.appendChild(input2);
              input1.appendChild(input3);
          }
      }

    } catch (error) {
          console.error('Error loading items from local storage:', error);
        }
  };

loadItems();

function saveItems() {
const items = [];
const items2 = [];
const itemList = incomeContainerForm.querySelectorAll('input[type="text"]');
for (let i = 0; i < itemList.length; i += 2) {
  const incomeName = itemList[i].value;
  const incomeValue = itemList[i + 1].value;
  const income = { name: incomeName, value: incomeValue };
  items.push(income);
}
const itemList2 = expenseForm.querySelectorAll('input[type="text"]');
for (let i = 0; i < itemList2.length; i += 2) {
  const expenseName = itemList2[i].value;
  const expenseValue = itemList2[i + 1].value;
  const expense = { name: expenseName, value: expenseValue };
  items2.push(expense);
}
const income = incomeContainer.textContent;
const expenses = totalExpenses.textContent;
localStorage.setItem('myData', JSON.stringify({ items, items2, income, expenses}));
};

function calculateTotalIncome() {
let total = 0;
const inputs = incomeContainerForm.querySelectorAll('div > *:nth-child(2)');
for (let i = 0; i < inputs.length; i++) {
  const value = inputs[i].value.replace(/\s+/g, '').replace(/[^0-9\.]/g, '');
  if (value) {
    total += parseFloat(value);
  }
}
incomeContainer.textContent = '$' + total.toLocaleString('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
calculateSavings();
};

function calculateTotalExpenses() {
let total = 0;
const inputs = expenseForm.querySelectorAll('div > *:nth-child(2)');
for (let i = 0; i < inputs.length; i++) {
  const value = inputs[i].value.replace(/\s+/g, '').replace(/[^0-9\.]/g, '');
  if (value) {
    total += parseFloat(value);
  }
}
totalExpenses.textContent = '$' + total.toLocaleString('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
calculateSavings();
};
 
  function calculateSavings() {
    const income2 = incomeContainer.textContent.replace(/\s+/g, '').replace(/[^0-9.]/g, "");
    expenses2 = totalExpenses.textContent.replace(/\s+/g, '').replace(/[^0-9.]/g, "");
    parseFloat(income2.match(/\d+\.\d+/)[0]);
    parseFloat(expenses2.match(/\d+\.\d+/)[0]);
    const savings2 = (income2 - expenses2).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  });
    savings.textContent = `$${savings2}`;
    return savings2;
    };

forms.forEach(form => {
form.addEventListener('blur', handleInputBlur);
form.addEventListener('keydown', handleKeyDown);
});

function handleKeyDown(event) {
const input = event.target;
if (event.keyCode === 13) {
event.preventDefault(); 
  const div = input.parentElement;
  const inputs = div.children;
  const input1 = inputs[0];
  const input2 = inputs[1];
  if (input1.value === '' && input2.value === '') {
    div.remove();
    calculateTotalIncome()
    calculateTotalExpenses();
    saveItems();
    clearStorage();
  } else {
    calculateTotalIncome()
    calculateTotalExpenses();
    saveItems();
    clearStorage();
  }
}
};

function handleInputBlur(event) {
const input = event.target;
if (input.tagName === 'INPUT') {
setTimeout(() => {
  const div = input.parentElement;
  const inputs = div.children;
  const input1 = inputs[0];
  const input2 = inputs[1];
  if (input1.value === '' && input2.value === '') {
    div.remove();
    calculateTotalIncome();
    calculateTotalExpenses();
    saveItems();
    clearStorage();
  } else {
    calculateTotalIncome();
    calculateTotalExpenses();
    saveItems();
    clearStorage();
  }
}, 100);
}
};

addIncome.addEventListener('click', (e) =>{
e.preventDefault();
const input1 = document.createElement('div')
input1.classList.add('income-container-div');
const input2 = document.createElement('input');
input2.type = 'text';
input2.addEventListener('blur', handleInputBlur);
input2.addEventListener('keydown', handleKeyDown);
const input3 = document.createElement('input');
input3.type = 'text';
input3.value = "$";
input3.addEventListener('blur', handleInputBlur);
input3.addEventListener('keydown', handleKeyDown);
incomeContainerForm.appendChild(input1);
input1.appendChild(input2);
input1.appendChild(input3);

});

deleteIncome.addEventListener('click', (e) => {
  e.preventDefault();
  const lastItem = incomeContainerForm.lastChild;
  if (lastItem) {
    incomeContainerForm.removeChild(lastItem);
    calculateTotalIncome();
    calculateTotalExpenses();
    calculateSavings();
    saveItems();
    clearStorage();
  } else {
    console.error('No income to delete.');
    alert('No income to delete.');
  }
});

expenseButton.addEventListener('click', (e) => {
e.preventDefault();
const input1 = document.createElement('div')
input1.classList.add('expense-form-div');
const input2 = document.createElement('input');
input2.type = 'text';
input2.addEventListener('blur', handleInputBlur);
input2.addEventListener('keydown', handleKeyDown);
const input3 = document.createElement('input');
input3.type = 'text';
input3.value = "$";
input3.addEventListener('blur', handleInputBlur);
input3.addEventListener('keydown', handleKeyDown);
expenseForm.appendChild(input1);
input1.appendChild(input2);
input1.appendChild(input3);
});

deleteExpenseButton.addEventListener('click', (e) => {
e.preventDefault();
const lastItem = expenseForm.lastChild;
if (lastItem) {
  expenseForm.removeChild(lastItem);
  calculateTotalExpenses();
  calculateSavings();
  saveItems();
  clearStorage();
} else {
  console.error('No expenses to delete.');
  alert('No expenses to delete.');
}
});

    function clearStorage() {
      const initialData = {
        items: [],
        items2: [],
        income: "$0.00",
        expenses: "$0.00"
      };
    
      const data = JSON.parse(localStorage.getItem('myData'));
    
      if (
        JSON.stringify(data) === JSON.stringify(initialData) ||
        data === null
      ) {
        localStorage.clear();
      } else {
        return;
      }
    };
    calculateSavings();
});