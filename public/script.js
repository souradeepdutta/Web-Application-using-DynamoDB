// Fetch and display students on page load
window.onload = async () => {
    await fetchStudents();
};

// Handle form submission to add a new student
document.getElementById('studentForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const studentData = {
        StudentID: document.getElementById('studentID').value,
        Name: document.getElementById('name').value,
        Age: parseInt(document.getElementById('age').value),
        Department: document.getElementById('department').value,
        GPA: parseFloat(document.getElementById('gpa').value),
        YearOfStudy: parseInt(document.getElementById('yearOfStudy').value),
    };

    // Insert the student data by calling the backend API
    try {
        const response = await fetch('/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData),
        });

        if (response.ok) {
            alert('Student added successfully!');
            // Clear the form
            document.getElementById('studentForm').reset();
            // Refresh student list after insertion
            await fetchStudents();
        } else {
            alert('Failed to add student.');
        }
    } catch (error) {
        console.error('Error adding student:', error);
        alert('An error occurred while adding the student.');
    }
});

// Fetch all students from the backend
async function fetchStudents() {
    try {
        const response = await fetch('/api/students');
        const students = await response.json();
        const studentTableBody = document.getElementById('studentTableBody');

        // Clear previous rows
        studentTableBody.innerHTML = '';

        // Populate table with student records
        students.forEach((student) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${student.StudentID}</td>
                <td>${student.Name}</td>
                <td>${student.Age}</td>
                <td>${student.Department}</td>
                <td>${student.GPA}</td>
                <td>${student.YearOfStudy}</td>
                <td>
                    <button class="update" onclick="showUpdateForm('${student.StudentID}')">Update</button>
                    <button class="delete" onclick="deleteStudent('${student.StudentID}')">Delete</button>
                </td>
            `;

            studentTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching students:', error);
        alert('An error occurred while fetching students.');
    }
}

// Show the update form and populate it with student data
async function showUpdateForm(studentID) {
    try {
        const response = await fetch(`/api/students/${studentID}`);
        const student = await response.json();

        // Populate the update form fields
        document.getElementById("updateStudentID").value = student.StudentID;
        document.getElementById("updateName").value = student.Name;
        document.getElementById("updateAge").value = student.Age;
        document.getElementById("updateDepartment").value = student.Department;
        document.getElementById("updateGPA").value = student.GPA;
        document.getElementById("updateYearOfStudy").value = student.YearOfStudy;

        // Show the update form
        document.getElementById("updateForm").style.display = "block";
    } catch (error) {
        console.error('Error fetching student data for update:', error);
        alert('An error occurred while fetching student data for update.');
    }
}

// Handle the update student functionality
document.getElementById("updateButton").addEventListener("click", async (event) => {
    event.preventDefault();

    const studentID = document.getElementById("updateStudentID").value;
    const updatedData = {
        Name: document.getElementById("updateName").value,
        Age: parseInt(document.getElementById("updateAge").value),
        Department: document.getElementById("updateDepartment").value,
        GPA: parseFloat(document.getElementById("updateGPA").value),
        YearOfStudy: parseInt(document.getElementById("updateYearOfStudy").value),
    };

    try {
        const response = await fetch(`/api/students/${studentID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        if (response.ok) {
            alert("Student updated successfully!");
            await fetchStudents();  // Refresh the list after update
            document.getElementById("updateForm").style.display = "none"; // Hide the update form
        } else {
            alert("Failed to update student.");
        }
    } catch (error) {
        console.error("Error updating student: ", error);
        alert("An error occurred while updating the student.");
    }
});

// Delete a student
async function deleteStudent(StudentID) {
    try {
        const response = await fetch(`/api/students/${StudentID}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Student deleted successfully!');
            // Refresh student list after deletion
            await fetchStudents();
        } else {
            alert('Failed to delete student.');
        }
    } catch (error) {
        console.error('Error deleting student:', error);
        alert('An error occurred while deleting the student.');
    }
}