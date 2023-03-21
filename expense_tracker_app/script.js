//Wait for window to load before starting
window.addEventListener('load', () => {
//Create variables to work with our buttons and input value
  const addItem = document.getElementById('add-item');
  const deleteItem = document.getElementById('delete-item');
  const valuesContainer = document.getElementById('expenses-container');
  const totalExpenses = document.getElementById('total-expenses-container');
  const addIncome = document.getElementById('add-income');
  const deleteIncome = document.getElementById('delete-income');
  const incomeContainer = document.getElementById('income-container');
  const savings = document.getElementById('savings');
  incomeContainer.textContent = `Total Income = $0.00`;
  totalExpenses.textContent = `Total Expenses = $0.00`;
  savings.textContent = `Total Savings = $0.00`;
//Load items from local storage
  function loadItems() {
    try {
      const data = JSON.parse(localStorage.getItem('myData'));
      if (data) {
        const { items, income, expenses} = data;
        
        incomeContainer.textContent = income;
        
        totalExpenses.textContent = expenses;

        items.forEach(item => {
          const newItem = document.createElement('p');
          newItem.textContent = item;
          valuesContainer.appendChild(newItem);
        });
      }
    } catch (error) {
      console.error('Error loading items from local storage:', error);
    }
  }
  
  
  loadItems();
//Save items to local storage
 function saveItems() {
    const items = [];
    const itemList = valuesContainer.querySelectorAll('p');
    itemList.forEach(item => {
      items.push(item.textContent);
    });
    const income = incomeContainer.textContent;
    const expenses = totalExpenses.textContent;
    localStorage.setItem('myData', JSON.stringify({ items, income, expenses}));
  }

  // Calculate Total Expenses
  function calculateTotalExpenses() {
    let total = 0;
    const expenseList = valuesContainer.querySelectorAll('p');
    expenseList.forEach(item => {
      const value = item.textContent.replace('$', '').replace(/,/g, '');
      total += parseFloat(value);
    });
    const totalExpenses = document.getElementById('total-expenses-container');
    const formattedTotal = total.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    totalExpenses.textContent = `Total Expenses = $${formattedTotal}`;
    saveItems();
  }
  
  //Add Income
  addIncome.addEventListener('click', (e) =>{
    e.preventDefault();
    let income = document.getElementById('input-income').value.trim().replace(/\s+/g, '').replace(/[^0-9.]/g, "");
    if (!income) {
      console.error('Invalid input:', income);
      alert('Please enter a valid income.');
      document.getElementById('input-income').value = ''; // clear input box
      return;
    }
    if (income.includes('.')) {
      let formattedValue = parseFloat(income);
      let formattedString = formattedValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const totalIncome = document.getElementById('income-container');
      if (totalIncome.textContent !== 'Total Income = $0.00') {
        totalIncome.textContent = '';
      }
      totalIncome.textContent = `Total Income = $${formattedString}`;
    } else {
      let formattedValue = parseFloat(income);
      let formattedString = formattedValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const totalIncome = document.getElementById('income-container');
      if (totalIncome.textContent !== 'Total Income = $0.00') {
        totalIncome.textContent = '';
      }
      totalIncome.textContent = `Total Income = $${formattedString}`;
    }
    document.getElementById('input-income').value = ''; // clear input box
    saveItems();
    calculateSavings();
});

  // Delete Income
  deleteIncome.addEventListener('click', (e) => {
    e.preventDefault();
    if(incomeContainer.textContent === 'Total Income = $0.00') {
      console.error('No income to delete.');
      alert('No income to delete.');
    }
    incomeContainer.textContent = 'Total Income = $0.00';
    saveItems();
    calculateSavings();
    return;
  });
  

  //Add New Items To Our List With Commas, Decimals, and $ 
  addItem.addEventListener('click', (e) => {
    e.preventDefault();
    let inputValue = document.getElementById('input-value').value.trim().replace(/\s+/g, '').replace(/[^0-9.]/g, "");
    if (!inputValue) {
        console.error('Invalid input:', inputValue);
        alert('Please enter a valid expense.');
        document.getElementById('input-value').value = ''; 
        return;
    }
    let formattedValue = parseFloat(inputValue);
    let formattedString = formattedValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const newItem = document.createElement('p');
    newItem.textContent = `$${formattedString}`;
    valuesContainer.appendChild(newItem);
    saveItems();
    document.getElementById('input-value').value = ''; 
    calculateTotalExpenses();
    calculateSavings();
});

  
  //Delete The Last Item From Our List
  deleteItem.addEventListener('click', (e) => {
    e.preventDefault();
    const lastItem = valuesContainer.lastChild;
    if (lastItem) {
      valuesContainer.removeChild(lastItem);
      saveItems();
    } else {
      console.error('No expenses to delete.');
      alert('No expenses to delete.');
    }
    calculateTotalExpenses();
    calculateSavings();
  });
  
  //Edit Expenses
  valuesContainer.addEventListener('click', (e) => {
      if (e.target.tagName === 'P') {
        const oldValue = e.target.textContent;
        e.target.textContent = '';
        const input = document.createElement('input');
        input.type = 'text';
        input.value = oldValue;
        e.target.appendChild(input);
        input.focus();
    
        let inputStillInDom = true;
    
        input.addEventListener('blur', () => {
          if (inputStillInDom) {
            inputStillInDom = false;
            e.target.removeChild(input);
            if (input.value.trim() !== '') {
              e.target.textContent = input.value;
              saveItems();
              calculateTotalExpenses();
              calculateSavings();
            } else {
              valuesContainer.removeChild(e.target);
              saveItems();
              calculateTotalExpenses();
              calculateSavings();
            }
          }
        });
    
        input.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            inputStillInDom = false;
            if (input.value.trim() !== '') {
              e.target.textContent = input.value;
              saveItems();
              calculateTotalExpenses();
              calculateSavings();
            } else {
              valuesContainer.removeChild(e.target);
              saveItems();
              calculateTotalExpenses();
              calculateSavings();
            }
            e.target.removeChild(input);
          } else if (event.key === 'Escape') {
            inputStillInDom = false;
            e.target.removeChild(input);
          }
        });
      }
    });
  //Calculate The Total Savings    
    function calculateSavings() {
      const income2 = incomeContainer.textContent.replace(/\s+/g, '').replace(/[^0-9.]/g, "");
      expenses2 = totalExpenses.textContent.replace(/\s+/g, '').replace(/[^0-9.]/g, "");
      parseFloat(income2.match(/\d+\.\d+/)[0]);
      parseFloat(expenses2.match(/\d+\.\d+/)[0]);
      const savings2 = (income2 - expenses2).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
      savings.textContent = `Total Savings = $${savings2}`;
      return savings2;
      }

      calculateSavings();

});
