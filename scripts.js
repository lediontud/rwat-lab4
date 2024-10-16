async function fetchJson(file) {
    const response = await fetch(file);
    if (!response.ok) {
        console.error(`Failed to fetch ${file}: ${response.statusText}`);
        return null;
    }
    return response.json();
}

function processData(data) {
    return data.map(item => {
        const [name, surname] = item.name.split(' ');
        return { name, surname, id: item.id };
    });
}

function displayData(data) {
    const tbody = document.querySelector('#data-table tbody');
    tbody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.name}</td><td>${item.surname}</td><td>${item.id}</td>`;
        tbody.appendChild(row);
    });
}

function updateStatusMessage(message) {
    const statusMessageDiv = document.getElementById('status-message');
    statusMessageDiv.innerText = message;
}

async function fetchDataSync() {
    try {
        const referenceData = await fetchJson('data/reference.json');
        if (!referenceData) return;

        const data1 = await fetchJson(`data/${referenceData.data_location}`);
        if (!data1) return;

        const data2 = await fetchJson(`data/${data1.data_location}`);
        if (!data2) return;

        const data3 = await fetchJson('data/data3.json');
        if (!data3) return;

        const combinedData = [
            ...processData(data1.data),
            ...processData(data2.data),
            ...processData(data3.data)
        ];

        displayData(combinedData);
        updateStatusMessage('Fetched data using Sync!');
    } catch (error) {
        console.error('Error fetching data synchronously:', error);
    }
}

async function fetchDataAsync() {
    try {
        const referenceData = await fetchJson('data/reference.json');
        if (!referenceData) return;

        const data1Promise = fetchJson(`data/${referenceData.data_location}`);
        const data3Promise = fetchJson('data/data3.json');

        const data1 = await data1Promise;
        if (!data1) return;

        const data2Promise = fetchJson(`data/${data1.data_location}`);

        const data2 = await data2Promise;
        if (!data2) return;

        const data3 = await data3Promise;
        if (!data3) return;

        const combinedData = [
            ...processData(data1.data),
            ...processData(data2.data),
            ...processData(data3.data)
        ];

        displayData(combinedData);
        updateStatusMessage('Fetched data using Async!');
    } catch (error) {
        console.error('Error fetching data asynchronously:', error);
    }
}

async function fetchDataFetch() {
    try {
        const referenceData = await fetchJson('data/reference.json');
        if (!referenceData) return;

        const data1Response = await fetch(`data/${referenceData.data_location}`);
        const data1 = await data1Response.json();
        if (!data1) return;

        const data2Response = await fetch(`data/${data1.data_location}`);
        const data2 = await data2Response.json();
        if (!data2) return;

        const data3Response = await fetch('data/data3.json');
        const data3 = await data3Response.json();
        if (!data3) return;

        const combinedData = [
            ...processData(data1.data),
            ...processData(data2.data),
            ...processData(data3.data)
        ];

        displayData(combinedData);
        updateStatusMessage('Fetched data using Fetch API!');
    } catch (error) {
        console.error('Error fetching data with Fetch API:', error);
    }
}