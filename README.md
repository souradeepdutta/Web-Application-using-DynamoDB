# Student Management Web App

## Description
This web application demonstrates CRUD (Create, Read, Update, Delete) operations using AWS DynamoDB for managing student records. The backend integrates AWS IAM for security and AWS CLI for DynamoDB operations. Users can add, fetch, update, and delete student information via a REST API.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: AWS DynamoDB
- **AWS SDK**: `aws-sdk` for interacting with DynamoDB
- **Authentication**: AWS IAM for secure access

## Prerequisites
- AWS account with DynamoDB and IAM access
- AWS CLI installed and configured with proper IAM roles and permissions
- Node.js installed
- `npm install aws-sdk express body-parser` for backend dependencies
- Basic understanding of AWS IAM, DynamoDB, and Node.js

## How to Run the Project

1. **Clone the repository**  
   Clone the repository to your local machine using:
   ```bash
   git clone <repository_url>
   ```

2. **Install Dependencies**  
   Navigate to the project directory and install required dependencies:
   ```bash
   cd student-management-app
   npm install
   ```

3. **Configure AWS CLI and IAM Roles**  
   - Set up AWS CLI with your credentials:
     ```bash
     aws configure
     ```
   - Ensure your IAM user has the necessary permissions to interact with DynamoDB

4. **Set Up DynamoDB Table**  
   - Create a DynamoDB table named `students` with `studentId` as the partition key (String).
   - Ensure your IAM roles have sufficient permissions to perform CRUD operations on the table.

5. **Backend Configuration**  
   - The backend code uses the `aws-sdk` to perform DynamoDB operations, so ensure that the IAM credentials are set up correctly and that the SDK is configured properly.

6. **Run the Project**  
   Start the backend server:
   ```bash
   node app.js
   ```

7. **Access the App**  
   Open a web browser and navigate to `http://localhost:3000` to access the web app.

## How to Use the App

- **Create a Student**: Send a POST request to `/api/students` with student data (e.g., name, age, grade).
- **Read (Retrieve) Student**: Send a GET request to `/api/students/:id` to fetch student details by ID.
- **Update Student**: Send a PUT request to `/api/students/:id` to update student information.
- **Delete Student**: Send a DELETE request to `/api/students/:id` to remove a student by ID.

## Key Features
- Full CRUD operations on student data using AWS DynamoDB.
- Secure access to DynamoDB using AWS IAM roles and AWS CLI.
- Simple API with Express for handling HTTP requests and responses.
- Easy-to-use frontend for interacting with the API.

## Screenshots
![Student Management App Screenshot](1.jpg)
![Student Management App Screenshot](1.jpg)
