document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const type = document.getElementById('type').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;

    let totalSavings = parseFloat(document.getElementById('total-savings').innerText);
    let totalExpenses = parseFloat(document.getElementById('total-expenses').innerText);

    if (type === 'savings') {
        totalSavings += amount;
    } else {
        totalExpenses += amount;
    }

    document.getElementById('total-savings').innerText = totalSavings.toFixed(2);
    document.getElementById('total-expenses').innerText = totalExpenses.toFixed(2);

    // Generate a unique transaction ID
    const transactionId = 'T' + Date.now();

    // Add transaction to the table
    const tableBody = document.getElementById('transaction-table-body');
    const row = tableBody.insertRow();
    row.insertCell(0).innerText = transactionId;
    row.insertCell(1).innerText = name;
    row.insertCell(2).innerText = type;
    row.insertCell(3).innerText = category;
    row.insertCell(4).innerText = amount.toFixed(2);
    row.insertCell(5).innerText = new Date().toLocaleDateString();

    // Send transaction to the server
    fetch('/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ transactionId, name, type, amount, category })
    })
    .then(response => response.json())
    .then(data => console.log('Transaction added:', data))
    .catch(error => console.error('Error:', error));

    document.getElementById('transaction-form').reset();
});

// Fetch summary data from the server
fetch('/api/summary')
    .then(response => response.json())
    .then(data => {
        document.getElementById('total-savings').innerText = data.savings.toFixed(2);
        document.getElementById('total-expenses').innerText = data.expenses.toFixed(2);
    })
    .catch(error => console.error('Error:', error));

// Fetch transactions from the server with optional filtering
document.getElementById('filter-button').addEventListener('click', function() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    fetch(`/api/transactions?start=${startDate}&end=${endDate}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('transaction-table-body');
            tableBody.innerHTML = ''; // Clear existing rows
            data.forEach(transaction => {
                const row = tableBody.insertRow();
                row.insertCell(0).innerText = transaction.transactionId;
                row.insertCell(1).innerText = transaction.name;
                row.insertCell(2).innerText = transaction.type;
                row.insertCell(3).innerText = transaction.category;
                row.insertCell(4).innerText = transaction.amount.toFixed(2);
                row.insertCell(5).innerText = new Date(transaction.date).toLocaleDateString();
            });
        })
        .catch(error => console.error('Error:', error));
});

// Initial fetch of transactions and summary
fetch('/api/transactions')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('transaction-table-body');
        data.forEach(transaction => {
            const row = tableBody.insertRow();
            row.insertCell(0).innerText = transaction.transactionId;
            row.insertCell(1).innerText = transaction.name;
            row.insertCell(2).innerText = transaction.type;
            row.insertCell(3).innerText = transaction.category;
            row.insertCell(4).innerText = transaction.amount.toFixed(2);
            row.insertCell(5).innerText = new Date(transaction.date).toLocaleDateString();
        });
    })
    .catch(error => console.error('Error:', error));
