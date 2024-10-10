const { 
  DynamoDBClient, 
  PutItemCommand, 
  ScanCommand, 
  DeleteItemCommand, 
  UpdateItemCommand,
  GetItemCommand 
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const dynamoClient = new DynamoDBClient({ region: "ap-south-1" }); // Change region if needed

// Function to insert a student
async function insertStudent(student) {
  const params = {
      TableName: "StudentRecords", // Make sure this matches your table name
      Item: marshall(student),
  };

  try {
      await dynamoClient.send(new PutItemCommand(params));
      console.log("Student inserted successfully.");
  } catch (err) {
      console.error("Error inserting student: ", err);
      throw err;
  }
}

// Function to fetch all students
async function fetchStudents() {
  const params = {
      TableName: "StudentRecords", // Make sure this matches your table name
  };

  try {
      const data = await dynamoClient.send(new ScanCommand(params));
      return data.Items.map((item) => unmarshall(item));
  } catch (err) {
      console.error("Error fetching students: ", err);
      throw err;
  }
}

// Function to delete a student
async function deleteStudent(StudentID) {
  const params = {
      TableName: "StudentRecords", // Make sure this matches your table name
      Key: marshall({ StudentID }),
  };

  try {
      await dynamoClient.send(new DeleteItemCommand(params));
      console.log("Student deleted successfully.");
  } catch (err) {
      console.error("Error deleting student: ", err);
      throw err;
  }
}

// Function to update a student
async function updateStudent(studentID, updatedData) {
  const params = {
      TableName: "StudentRecords",
      Key: marshall({ StudentID: studentID }),
      UpdateExpression: "set #name = :name, #age = :age, #department = :department, #gpa = :gpa, #yearOfStudy = :yearOfStudy",
      ExpressionAttributeNames: {
          "#name": "Name",
          "#age": "Age",
          "#department": "Department",
          "#gpa": "GPA",
          "#yearOfStudy": "YearOfStudy"
      },
      ExpressionAttributeValues: marshall({
          ":name": updatedData.Name,
          ":age": updatedData.Age,
          ":department": updatedData.Department,
          ":gpa": updatedData.GPA,
          ":yearOfStudy": updatedData.YearOfStudy
      }),
      ReturnValues: "UPDATED_NEW"
  };

  try {
      await dynamoClient.send(new UpdateItemCommand(params));
      console.log("Student updated successfully");
  } catch (error) {
      console.error("Error updating student: ", error);
      throw error;
  }
}

// Function to get a student by ID
async function getStudentById(studentID) {
  const params = {
      TableName: "StudentRecords",
      Key: marshall({ StudentID: studentID }),
  };

  try {
      const { Item } = await dynamoClient.send(new GetItemCommand(params));
      return Item ? unmarshall(Item) : null;
  } catch (err) {
      console.error("Error fetching student by ID: ", err);
      throw err;
  }
}

module.exports = { insertStudent, fetchStudents, deleteStudent, updateStudent, getStudentById };