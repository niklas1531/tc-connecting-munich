# Tech Challenge SS24 - Connecting Munich

## Introduction
We are Connectify. We have developed a new alternative for the current Ratsinformationssystem (RIS) of the city of Munich, addressing the two main challenges of the Search Engine and Proposal Creation Processes through innovative features.

## 1. The problem of the current RIS

### 1.1. Search Engine
The current RIS lacks an efficient search engine that can quickly retrieve relevant information based on user queries.

### 1.2. Proposal Upload
Uploading proposals to the RIS is cumbersome and lacks user-friendly features for seamless submission and management.

### 1.3. Relation of search and creation process
There is a disconnect between the search process (finding relevant proposals) and the creation process (uploading new proposals), leading to inefficiencies.

---

## 2. Our solution

### 2.1. Features

#### 2.1.1. Search Engine Features
- Enhanced search capabilities with advanced filtering options.
- Real-time indexing for rapid retrieval of information.

#### 2.1.2. Proposal Upload Features
- Intuitive proposal submission forms with validation checks.
- Status tracking and notification alerts for proposal authors.

### 2.2. Infrastructure

#### 2.2.1. Architecture Diagram
<img width="919" alt="TC_Architecture" src="https://github.com/niklas1531/tc-connecting-munich/assets/97844057/6b491354-879d-41aa-9c7b-2613eb3e5b8f">

#### 2.2.2. Used Frameworks and Services
- **Angular**: Frontend framework for building responsive web applications.
- **FastAPI**: Backend framework for efficient API development.
- **MongoDB**: NoSQL database for storing flexible data structures.
- **AWS Lambda**: Serverless compute service for executing code without provisioning or managing servers.
- **AWS Amplify**: Deployment service for hosting and managing web applications.

### 2.3. Step-by-step instructions to re-create our prototype
We offer two ways to utilize our prototype. Firstly, we have deployed our prototype on AWS, allowing you to use our application online without any technical setup. Secondly, we provide a detailed guide on how to run our frontend and API locally on your computer. This dual approach ensures flexibility and ease of access, catering to both those who prefer immediate online access and those who wish to explore the technical implementation in a local environment.


#### 2.3.1. Online Access
Under the following link <a href="https://main.d298mr3ct5f9js.amplifyapp.com/antraege">https://main.d298mr3ct5f9js.amplifyapp.com/antraege</a>, our frontend application, which is deployed on AWS Amplify, is accessible. This frontend is connected via API Gateway to our API deployed on AWS Lambda. Please note that, for simplification reasons during testing, we have not implemented user or access management. This means that the application and all its functionalities are accessible to any user. Additionally, the application is designed for desktop use; hence, it is not optimized for smaller devices such as smartphones.

#### 2.3.2. Run Application locally
To run the application locally, follow these steps:
- Clone the repository from [GitHub link-to-your-repository](link-to-your-repository).
- Install necessary dependencies and configure environment variables (refer to `.env` file or AWS Secrets Manager).
- Start the frontend and backend servers using appropriate commands (`npm start` for frontend, `uvicorn main:app --reload` for backend).
  **Include Mangum in app.py:**
from mangum import Mangum

handler = Mangum(app)
**Commands:** 
pip install -t dependencies -r requirements.txt
(cd dependencies; zip ../aws_lambda_artifact.zip -r .)
zip aws_lambda_artifact.zip -u app.py

**AWS Lambda Settings:**

AWS Runtime settings
Handler: app.handler

Function URL:
Allow Cors, All headers, etc.


# Run Frontend application (Angular JS with Typescript)
**Requirements**
- Node JS

**Commands**
1. npm i
2. ng s


# Run Api (FastAPI with Python and MongoDB)
**Requirements**
- Python
- Pip


**Commands**
1. python -m venv venv
2. source venv/bin/activate
3. pip install
4. fastapi dev main.py
