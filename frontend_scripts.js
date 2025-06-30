const output = document.getElementById('output');

function displayData(data) {
  if (!Array.isArray(data) || data.length === 0) {
    output.innerHTML = '<p class="text-red-600">Nicio înregistrare găsită.</p>';
    return;
  }

  const columns = Object.keys(data[0]);

  let html = '<table class="min-w-full table-auto border border-gray-300 bg-white text-black">';
  html += '<thead><tr>';
  columns.forEach(col => {
    html += `<th class="border px-4 py-2 bg-gray-100">${col}</th>`;
  });
  html += '</tr></thead><tbody class="divide-y divide-gray-200">';

  data.forEach(row => {
    html += '<tr>';
    columns.forEach(col => {
      html += `<td class="border px-4 py-2">${row[col]}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  output.innerHTML = html;
}

async function loadCustomers() {
  const res = await fetch('http://localhost:3000/customers');
  const data = await res.json();
  displayData(data);
}

async function loadAccounts() {
  const res = await fetch('http://localhost:3000/accounts');
  const data = await res.json();
  displayData(data);
}

async function loadEmployees() {
  const res = await fetch('http://localhost:3000/employees');
  const data = await res.json();
  displayData(data);
}

async function fetchAndShow(endpoint) {
  const res = await fetch(`http://localhost:3000/${endpoint}`);
  const data = await res.json();
  displayData(data);
}

// Interogări SQL:

function showCustomerNames() {
  fetchAndShow('customers/names');
}

function accountsOver1000() {
  fetchAndShow('accounts/over1000');
}

function sortedCustomers() {
  fetchAndShow('customers/sorted');
}

function accountsBetween() {
  fetchAndShow('accounts/between');
}

function employeesGrouped() {
  fetchAndShow('employees/byPosition');
}

function customersJoinAccounts() {
  fetchAndShow('accounts/join');
}

function employeesJoinBranches() {
  fetchAndShow('employees/branchinfo');
}

function customersWithHighBalance() {
  fetchAndShow('customers/highBalance');
}

function uppercaseNames() {
  fetchAndShow('customers/uppercase');
}

function totalBalance() {
  fetchAndShow('accounts/totalBalance');
}

// Operații:

function showModal(title, fields, onSubmit) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const submitBtn = document.getElementById('modalSubmitBtn');

  modalTitle.innerText = title;
  modalContent.innerHTML = '';

  fields.forEach(field => {
    modalContent.innerHTML += `
      <input id="modal-${field.id}" placeholder="${field.placeholder}" type="${field.type || 'text'}"
        class="w-full px-2 py-1 border rounded" />
    `;
  });

  submitBtn.onclick = async () => {
    const values = {};
    fields.forEach(field => {
      values[field.id] = document.getElementById(`modal-${field.id}`).value;
    });
    await onSubmit(values);
    closeModal();
  };

  modal.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

// Funcție: Adaugă Client
function addCustomer() {
  showModal('Adaugă Client', [
    { id: 'name', placeholder: 'Nume' },
    { id: 'email', placeholder: 'Email' },
    { id: 'phone', placeholder: 'Telefon' },
    { id: 'address', placeholder: 'Adresă' }
  ], async (data) => {
    const res = await fetch('http://localhost:3000/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    alert('Client adăugat!');
	await loadCustomers();
    console.log(result);
  });
}

// Funcție: Actualizează Sold
function updateBalance() {
  showModal('Actualizează Sold', [
    { id: 'accountId', placeholder: 'ID cont' },
    { id: 'balance', placeholder: 'Sold nou' }
  ], async (data) => {
    const res = await fetch(`http://localhost:3000/accounts/${data.accountId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ balance: data.balance })
    });
    const result = await res.json();
    alert('Sold actualizat!');
	//await loadBalance();
    console.log(result);
  });
}

// Funcție: Șterge Tranzacție
function deleteTransaction() {
  showModal('Șterge Tranzacție', [
    { id: 'transactionId', placeholder: 'ID tranzacție' }
  ], async (data) => {
    const res = await fetch(`http://localhost:3000/transactions/${data.transactionId}`, {
      method: 'DELETE'
    });
    const result = await res.json();
    alert('Tranzacție ștearsă!');
	//await loatransaction();
    console.log(result);
  });
}


