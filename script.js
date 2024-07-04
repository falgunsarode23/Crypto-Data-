// Fetch data using async/await
async function fetchDataAsync() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fetch data using .then
function fetchDataThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            renderTable(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Render table
function renderTable(data) {
    const tableBody = document.querySelector('#cryptoTable tbody');
    tableBody.innerHTML = '';

    data.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${coin.image}" alt="${coin.name}" width="30"></td>
            <td>${coin.name}</td>
            <td>${coin.symbol}</td>
            <td>${coin.current_price}</td>
            <td>${coin.total_volume}</td>
            <td>${coin.market_cap}</td>
            <td>${coin.price_change_percentage_24h}%</td>
        `;
        tableBody.appendChild(row);
    });
}

// Search functionality
function searchTable() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const rows = document.querySelectorAll('#cryptoTable tbody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const name = cells[1].textContent.toLowerCase();
        const symbol = cells[2].textContent.toLowerCase();

        if (name.includes(filter) || symbol.includes(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Sort functionality
function sortTableByMarketCap() {
    const table = document.getElementById('cryptoTable');
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    
    rows.sort((a, b) => {
        const marketCapA = parseFloat(a.children[5].textContent);
        const marketCapB = parseFloat(b.children[5].textContent);
        return marketCapB - marketCapA;
    });

    const tableBody = table.querySelector('tbody');
    tableBody.innerHTML = '';
    rows.forEach(row => tableBody.appendChild(row));
}

function sortTableByPercentageChange() {
    const table = document.getElementById('cryptoTable');
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    
    rows.sort((a, b) => {
        const changeA = parseFloat(a.children[6].textContent);
        const changeB = parseFloat(b.children[6].textContent);
        return changeB - changeA;
    });

    const tableBody = table.querySelector('tbody');
    tableBody.innerHTML = '';
    rows.forEach(row => tableBody.appendChild(row));
}

// Fetch data on load using async/await
fetchDataAsync();

// Optionally, you can also call fetchDataThen() if you want to demonstrate both methods
// fetchDataThen();
