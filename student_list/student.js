
// IMPORTANT: Update this to your actual API base URL
const API_BASE_URL = 'http://localhost/api';

document.addEventListener('DOMContentLoaded', () => {
    fetchStudents(); // Initial fetch when the page loads

    // Event listener for the Add Student button
    document.getElementById('addStudentBtn').addEventListener('click', () => {
        alert('Add New Student functionality will be implemented here!');
        // As per your instructions, you would redirect to an "add student" form or open a modal.
        // Example: window.location.href = 'add-student.html';
    });
});

/**
 * Fetches student data from the API and populates the table.
 */
async function fetchStudents() {
    const studentTableBody = document.querySelector('#studentTable tbody');
    // Display a loading message
    studentTableBody.innerHTML = '<tr class="message-row"><td colspan="6" class="loading-message">Loading student data...</td></tr>';

    try {
        // --- INTEGRATE YOUR ACTUAL API CALL HERE ---
        // Replace '/student-list.php' with the correct endpoint that lists students.
        // Add any necessary headers (e.g., authentication tokens from your login activity).
        const response = await fetch(${API_BASE_URL}/student-list.php, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Example if you have an authentication token after login:
                // 'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
        });

        if (!response.ok) {
            // Handle HTTP errors (e.g., 404 Not Found, 500 Internal Server Error)
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            throw new Error(HTTP error! Status: ${response.status} - ${errorData.message || response.statusText});
        }

        // Assuming your API returns a JSON array of student objects
        const students = await response.json();

        // --- OPTIONAL: Placeholder Data for local testing if API is not yet available ---
        /*
        const students = [
            { student_id: 'S001', first_name: 'Juan', last_name: 'Dela Cruz', email: 'juan.dc@example.com', course: 'BSIT', year_level: '3rd Year' },
            { student_id: 'S002', first_name: 'Maria', last_name: 'Santos', email: 'maria.s@example.com', course: 'BSSW', year_level: '2nd Year' },
            { student_id: 'S003', first_name: 'Pedro', last_name: 'Reyes', email: 'pedro.r@example.com', course: 'BSCS', year_level: '4th Year' },
            { student_id: 'S004', first_name: 'Anna', last_name: 'Garcia', email: 'anna.g@example.com', course: 'BSED', year_level: '1st Year' },
            { student_id: 'S005', first_name: 'Crispin', last_name: 'Balagtas', email: 'crispin.b@example.com', course: 'BSCpE', year_level: '4th Year' }
        ];
        */
        // --- END OPTIONAL Placeholder Data ---


        studentTableBody.innerHTML = ''; // Clear loading message

        if (students && students.length > 0) {
            students.forEach(student => {
                const row = studentTableBody.insertRow();
                // Display the required student details
                row.insertCell().textContent = student.student_id;
                row.insertCell().textContent = ${student.first_name || ''} ${student.last_name || ''};
                row.insertCell().textContent = student.email;
                row.insertCell().textContent = student.course;
                row.insertCell().textContent = student.year_level;

                // Create action buttons (Edit and Delete)
                const actionsCell = row.insertCell();
                actionsCell.className = 'action-buttons';

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.className = 'edit-btn';
                // Attach event listener with the student's ID
                editButton.addEventListener('click', () => handleEdit(student.student_id));
                actionsCell.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete-btn';
                // Attach event listener with the student's ID
                deleteButton.addEventListener('click', () => handleDelete(student.student_id));
                actionsCell.appendChild(deleteButton);
            });
        } else {
            // Display a message if no students are found
            const row = studentTableBody.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 6;
            cell.textContent = 'No student records found. Add a new student to get started!';
            cell.className = 'message-row';
        }

    } catch (error) {
        console.error('Error fetching students:', error);
        studentTableBody.innerHTML = ''; // Clear loading message
        const row = studentTableBody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 6;
        cell.textContent = Error loading student data: ${error.message}. Please check your API connection and try again.;
        cell.className = 'message-row error-message';
    }
}

/**
 * Placeholder function for handling Edit button click.
 * You will implement the actual edit logic here.
 * @param {string} studentId The ID of the student to edit.
 */
function handleEdit(studentId) {
    alert(You clicked Edit for Student ID: ${studentId});
    // TODO: Implement the actual logic for editing a student.
    // This will typically involve:
    // 1. Fetching the specific student's data using their ID.
    // 2. Redirecting to an "edit student" form (e.g., 'edit-student.html?id=' + studentId)
    //    or opening a modal/dialog with a form pre-filled with the student's data.
    // 3. Handling the form submission to send a PUT request to the API: http://localhost/api/edit-student.php
    //    Make sure to handle requirements like pre-filling data, allowing updates, refreshing list, and showing messages.
}

/**
 * Placeholder function for handling Delete button click.
 * You will implement the actual delete API call here.
 * @param {string} studentId The ID of the student to delete.
 */
async function handleDelete(studentId) {
    // Show confirmation dialog as required
    if (confirm(Are you sure you want to delete student with ID: ${studentId}? This action cannot be undone.)) {
        try {
            // Send a DELETE request to your API
            const response = await fetch(${API_BASE_URL}/student-delete.php, {
                method: 'DELETE', // As specified in your instructions
                headers: {
                    'Content-Type': 'application/json',
                    // Add any necessary authentication headers here
                    // 'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                },
                // Send the student_id in the request body as JSON
                body: JSON.stringify({ student_id: studentId })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Unknown error during deletion' }));
                throw new Error(HTTP error! Status: ${response.status} - ${errorData.message || response.statusText});
            }

            // Assuming the API returns a success message
            const result = await response.json();
            alert(result.message || Student with ID ${studentId} successfully deleted.);
            fetchStudents(); // Refresh the student list after successful deletion (as required)

        } catch (error) {
            console.error('Error deleting student:', error);
            alert(Failed to delete student with ID ${studentId}: ${error.message});
        }
    }
}
