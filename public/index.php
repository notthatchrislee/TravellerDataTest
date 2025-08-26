<?php
    $data = file_get_contents(__DIR__ . '/../data/travellers.json');
    $travellers = json_decode($data, true);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Traveller Data Test</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Traveller Dashboard</h1>
    
    <!-- filters -->
    <div id="filters">
        <label for="countryFilter">Filter by Country:</label>
        <select id="countryFilter">
            <option value="">All</option>
        </select>

        <label for="tripFilter">Filter by Trip Type:</label>
        <select id="tripFilter">
            <option value="">All</option>
        </select>

        <label for="nameFilter">Filter by Name:</label>
        <input id="nameFilter" type="text" placeholder="Search by name...">
        </input>
    </div>

    <!-- travellers -->
    <table id="travellerTable">
        <thead>
            <tr>
                <th data-sort="name">Name</th>
                <th data-sort="age">Age</th>
                <th data-sort="country">Country</th>
                <th data-sort="tripType">Trip Type</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>

    <!-- chart -->

    <div>
        <h2>Average Age by Country</h2>
        <div id="ageChartContainer">
            <canvas id="ageChart" ></canvas>
            <div id="ageChartLegend"></div>
        </div>
  
    </div>

    <script>
        const travellerData = <?php echo json_encode($travellers); ?>;
        // todo...
    </script>
    <script src="script.js"></script>
</body>
</html>
