//Wait for window to load before starting
window.addEventListener('load', () => {
  //Create variables to work with our buttons and input value
  const addItem = document.getElementById('add-item');
  const deleteItem = document.getElementById('delete-item');
  const valuesContainer = document.getElementById('expenses-container');
  const addIncome = document.getElementById('add-income');
  
  // Load any items that are stored in the local storage 
  function loadItems() {
    try {
      const items = JSON.parse(localStorage.getItem('items'));
      if (items) {
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

  //Save items to local Storage
  function saveItems() {
    const items = [];
    const itemList = valuesContainer.querySelectorAll('p');
    itemList.forEach(item => {
      items.push(item.textContent);
    });
    localStorage.setItem('items', JSON.stringify(items));
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
    totalExpenses.textContent = `Total Expenses = $${total.toFixed(2)}`;
  }

  //Add Income
  addIncome.addEventListener('click', (e) =>{
    e.preventDefault();
    let income = document.getElementById('input-income').value;
    const totalIncome = document.getElementById('income-container');
    totalIncome.textContent = `Total Income = $${income}`;
  });

  //add new items to our list with commas, decimals, and $ 
  addItem.addEventListener('click', (e) => {
    e.preventDefault();
    let inputValue = document.getElementById('input-value').value.trim();
    if (inputValue.includes(',')) {
      inputValue = inputValue.replace(/,/g, '');
    }
    if (!inputValue) {
      console.error('Invalid input:', inputValue);
      alert('Please enter a valid value.');
      document.getElementById('input-value').value = ''; // clear input box
      return;
    }
    let formattedValue = parseFloat(inputValue);
    if (!formattedValue) {
      console.error('Invalid input:', inputValue);
      alert('Please enter a valid number.');
      document.getElementById('input-value').value = ''; // clear input box
      return;
    }
    let formattedString = formattedValue.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    const newItem = document.createElement('p');
    newItem.textContent = `$${formattedString}`;
    valuesContainer.appendChild(newItem);
    saveItems();
    document.getElementById('input-value').value = ''; // clear input box
    calculateTotalExpenses();
  });
  
  //Delete the last item from our list
  deleteItem.addEventListener('click', (e) => {
    e.preventDefault();
    const lastItem = valuesContainer.lastChild;
    if (lastItem) {
      valuesContainer.removeChild(lastItem);
      saveItems();
    } else {
      console.error('No items to delete.');
      alert('No items to delete.');
    }
    calculateTotalExpenses();
  });
  
  // Edit Expenses
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
            } else {
              valuesContainer.removeChild(e.target);
              saveItems();
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
            } else {
              valuesContainer.removeChild(e.target);
              saveItems();
            }
            e.target.removeChild(input);
          } else if (event.key === 'Escape') {
            inputStillInDom = false;
            e.target.removeChild(input);
          }
        });
      }
    });
    
});