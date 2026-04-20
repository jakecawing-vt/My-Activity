document.addEventListener('DOMContentLoaded', () => {
    const gradesTableBody = document.querySelector('#gradesTable tbody');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const showPresentButton = document.getElementById('showPresent');
    const showAbsentButton = document.getElementById('showAbsent');
    const showPassedButton = document.getElementById('showPassed');
    const showFailedButton = document.getElementById('showFailed');

    // Sample data (you would likely fetch this from a database or API in a real application)
    let studentData = [
        { name: 'Jake', g1: 85, g2: 90, g3: 88, present: true },
        { name: 'Gerald', g1: 70, g2: 75, g3: 72, present: true },
        { name: 'John Dexi', g1: 95, g2: 92, g3: 94, present: true },
        { name: 'Jamaica', g1: 60, g2: 65, g3: 70, present: false },
        { name: 'Jolina', g1: 88, g2: 85, g3: 90, present: true },
        { name: 'Sarah', g1: 78, g2: 80, g3: 82, present: false },
        { name: 'Czeahamford', g1: 92, g2: 89, g3: 94, present: true },
        { name: 'Mc Kenneth', g1: 73, g2: 70, g3: 68, present: true },
        { name: 'Kaye', g1: 81, g2: 84, g3: 79, present: true },
        { name: 'Lian Mallari', g1: 99, g2: 99, g3: 99, present: true }
    ];

    // Function to calculate average and remarks
    function calculateGradeData(student) {
        const average = (student.g1 + student.g2 + student.g3) / 3;
        const remarks = average >= 75 ? 'Passed' : 'Failed'; // Assuming 75 is passing
        return { ...student, average: average.toFixed(1), remarks: remarks };
    }

    // Function to render the table with filtered data
    function renderTable(dataToRender) {
        gradesTableBody.innerHTML = ''; // Clear existing rows
        dataToRender.forEach(student => {
            const row = gradesTableBody.insertRow();
            row.insertCell().textContent = student.name;
            row.insertCell().textContent = student.g1;
            row.insertCell().textContent = student.g2;
            row.insertCell().textContent = student.g3;
            row.insertCell().textContent = student.average;
            const remarksCell = row.insertCell();
            remarksCell.textContent = student.remarks;
            remarksCell.classList.add(student.remarks.toLowerCase()); // Add class for styling
        });
    }

    // Initialize the table with all calculated data
    let processedData = studentData.map(calculateGradeData);
    renderTable(processedData);

    // Event Listeners for filter buttons
    showPresentButton.addEventListener('click', () => {
        const filtered = processedData.filter(student => student.present);
        renderTable(filtered);
    });

    showAbsentButton.addEventListener('click', () => {
        const filtered = processedData.filter(student => !student.present);
        renderTable(filtered);
    });

    showPassedButton.addEventListener('click', () => {
        const filtered = processedData.filter(student => student.remarks === 'Passed');
        renderTable(filtered);
    });

    showFailedButton.addEventListener('click', () => {
        const filtered = processedData.filter(student => student.remarks === 'Failed');
        renderTable(filtered);
    });

    // Event Listener for search
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filtered = processedData.filter(student =>
            student.name.toLowerCase().includes(searchTerm) ||
            String(student.g1).includes(searchTerm) ||
            String(student.g2).includes(searchTerm) ||
            String(student.g3).includes(searchTerm) ||
            String(student.average).includes(searchTerm) ||
            student.remarks.toLowerCase().includes(searchTerm)
        );
        renderTable(filtered);
    });

    // Allow pressing Enter in search bar to trigger search
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });
});