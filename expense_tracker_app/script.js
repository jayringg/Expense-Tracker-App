const addItem = document.getElementById('add-item');
const deleteItem = document.getElementById('delete-item');
const valuesContainer = document.getElementById('values-container');

function loadItems() {
  const items = JSON.parse(localStorage.getItem('items'));
  if (items) {
    items.forEach(item => {
      const newItem = document.createElement('p');
      newItem.textContent = item;
      valuesContainer.appendChild(newItem);
    });
  }
}

loadItems();

function saveItems() {
  const items = [];
  const itemList = valuesContainer.querySelectorAll('p');
  itemList.forEach(item => {
    items.push(item.textContent);
  });
  localStorage.setItem('items', JSON.stringify(items));
}

addItem.addEventListener('click', (e) => {
  e.preventDefault();
  const inputValue = document.getElementById('input-value').value;
  if (!inputValue) {
    return;
  }
  const newItem = document.createElement('p');
  newItem.textContent = inputValue;
  valuesContainer.appendChild(newItem);
  saveItems();
})

deleteItem.addEventListener('click', (e) => {
  e.preventDefault();
  const lastItem = valuesContainer.lastChild;
  if (lastItem) {
    valuesContainer.removeChild(lastItem);
    saveItems();
  }
});
