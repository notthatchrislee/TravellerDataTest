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

    const minAge = Math.min(...data.map(person => person.age));
    const youngest = data.filter(person => person.age === minAge);
    const youngestIds = youngest.map(person => person.id);


    data.forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${t.name}</td>
            <td>${t.age}</td>
            <td>${t.country}</td>
            <td>${t.tripType}</td>
        `;
        if (youngestIds.includes(t.id)) {
            tr.classList.add('highlight');
        }

        tableBody.appendChild(tr);
    });
}

function applyFilters() {
    
    let filtered = travellerData.filter(t => {
        return (!countryFilter.value || t.country === countryFilter.value) &&
        (!nameFilter.value || t.name.toLowerCase().includes(nameFilter.value.toLowerCase())) &&
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

//draw chart
function drawChart(data){
    const countries = [...new Set(data.map(d => d.country))];

    const avgAgeByCountry = getAverageAgeByCountry(data);
    var ageChartLegend = document.getElementById('ageChartLegend');

    var canvas = document.getElementById('ageChart');
    ctx = canvas.getContext('2d');

    currX = 25;

    countries.forEach(c => {
        //draw legend
        const div = document.createElement('div');
        div.classList.add('country-legend');
        div.innerHTML = `
            ${c}
        `;
        ageChartLegend.appendChild(div);


        //draw bar
        ctx.fillStyle = '#4e79a7';
        const barWidth = 50;
        const gap = 50;
        ctx.fillRect(currX, canvas.height - avgAgeByCountry[c], barWidth, avgAgeByCountry[c]); // Clear the canvas
        currX += barWidth + gap;


        var ageChartContainer = document.getElementById('ageChartContainer');
        const label = document.createElement('div');
        label.classList.add('bar-label');
        label.style.position = 'absolute';
        label.style.left = (currX - barWidth - gap) + 'px';
        label.style.top = (canvas.height - avgAgeByCountry[c] - 20) + 'px';
        label.innerHTML = `
          ${avgAgeByCountry[c]}
        `;
        ageChartContainer.appendChild(label);

    });


}

//get average age by country
function getAverageAgeByCountry(data){

    const countryAgeMap = {};
    data.forEach(t => {
        if (!countryAgeMap[t.country]) {
            countryAgeMap[t.country] = { totalAge: 0, count: 0 };
        }
        countryAgeMap[t.country].totalAge += t.age;
        countryAgeMap[t.country].count += 1;
    });

    const avgAgeByCountry = {};
    for (const country in countryAgeMap) {
        avgAgeByCountry[country] = (countryAgeMap[country].totalAge / countryAgeMap[country].count).toFixed(2);
    }

    return avgAgeByCountry;
}

// init
initFilters(travellerData);
drawChart(travellerData)
applyFilters();


// listeners and events
countryFilter.addEventListener('change', applyFilters);
tripFilter.addEventListener('change', applyFilters);
nameFilter.addEventListener('keyup', applyFilters);
