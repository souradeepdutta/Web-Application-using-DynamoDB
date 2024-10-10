const express = require("express");
const bodyParser = require("body-parser");
const { insertStudent, fetchStudents, deleteStudent, updateStudent, getStudentById } = require("./backend/dynamoOperations");

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Route to fetch all students
app.get("/api/students", async (req, res) => {
    try {
        const students = await fetchStudents();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: "Error fetching students" });
    }
});

// Route to fetch a single student by ID
app.get("/api/students/:id", async (req, res) => {
    try {
        const student = await getStudentById(req.params.id);
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ error: "Student not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error fetching student" });
    }
});

// Route to insert a new student
app.post("/api/students", async (req, res) => {
    try {
        await insertStudent(req.body);
        res.status(201).json({ message: "Student added successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error adding student" });
    }
});

// Route to update a student
app.put('/api/students/:id', async (req, res) => {
    const studentID = req.params.id;
    const updatedData = req.body;

    try {
        await updateStudent(studentID, updatedData);
        res.status(200).json({ message: "Student updated successfully" });
    } catch (error) {
        console.error("Error updating student: ", error);
        res.status(500).json({ error: "Error updating student" });
    }
});

// Route to delete a student
app.delete("/api/students/:id", async (req, res) => {
    try {
        await deleteStudent(req.params.id);
        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting student" });
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});