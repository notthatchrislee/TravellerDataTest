const tableBody = document.querySelector('#travellerTable tbody');
const countryFilter = document.querySelector('#countryFilter');
const tripFilter = document.querySelector('#tripFilter');

// init filters
function initFilters(data) {
    const countries = [...new Set(data.map(d => d.country))];
    const trips = [...new Set(data.map(d => d.tripType))];

    countries.forEach(c => {
        let opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        countryFilter.appendChild(opt);
    });

    trips.forEach(t => {
        let opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        tripFilter.appendChild(opt);
    });
}

// render table
function renderTable(data) {
    tableBody.innerHTML = '';
    data.forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${t.name}</td>
            <td>${t.age}</td>
            <td>${t.country}</td>
            <td>${t.tripType}</td>
        `;
        tableBody.appendChild(tr);
    });
}

function applyFilters() {
    let filtered = travellerData.filter(t => {
        return (!countryFilter.value || t.country === countryFilter.value) &&
            (!tripFilter.value || t.tripType === tripFilter.value);
    });
    renderTable(filtered);
}

document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
        const key = th.dataset.sort;
        travellerData.sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        applyFilters();
    });
});

// init
initFilters(travellerData);
applyFilters();

// listeners and events
countryFilter.addEventListener('change', applyFilters);
tripFilter.addEventListener('change', applyFilters);
