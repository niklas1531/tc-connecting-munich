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

#### 2.1.3 Screenshots of Prototype
<table>
  <tr>
    <td><img width="300" alt="Overview" src="https://github.com/niklas1531/tc-connecting-munich/assets/97844057/cc9f65b7-2db3-4f39-a3c8-2871043dcfac"></td>
    <td><img width="300" alt="Proposals" src="https://github.com/niklas1531/tc-connecting-munich/assets/97844057/26db3456-c903-4db1-b3e4-4e44df2e0b08"></td>
    <td><img width="300" alt="SearchEngine" src="https://github.com/niklas1531/tc-connecting-munich/assets/97844057/7eb68e37-ece5-48f2-9b0a-d388e23a1fe2"></td>
    <td><img width="300" alt="Glossar" src="https://github.com/niklas1531/tc-connecting-munich/assets/97844057/f838320a-74cd-4a69-bcf9-fee1743490ae"></td>
  </tr>
  <tr>
    <td><img width="300" alt="CreationProcess_01" src="https://github.com/niklas1531/tc-connecting-munich/assets/97844057/d15bba2a-7f8c-4d4a-9470-f7e1e80470be"></td>
    <td><img width="300" alt="CreationProcess_02" src="https://github.com/niklas1531/tc-connecting-munich/assets/97844057/94f68011-d36d-4898-940d-36f63cf566e9"></td>
    <td><img width="300" alt="CreationProcess_03" src="https://github.com/niklas1531/tc-connecting-munich/assets/97844057/be2eae09-a48c-42d7-b0e3-560ca0649d55"></td>
    <td><img width="300" alt="CreationProcess_04" src="https://github.com/niklas1531/tc-connecting-munich/assets/97844057/296b698a-24f7-49de-adae-3ad67784722b"></td>
  </tr>
  <tr>
    <td><img width="300" alt="CreationProcess_05" src="https://github.com/niklas1531/tc-connecting-munich/assets/97844057/17e2e767-d077-4dc2-a5dd-ec69304a3ab2"></td>
    <td><img width="300" alt="CreationProcess_06" src="https://github.com/niklas1531/tc-connecting-munich/assets/97844057/e8415a0e-2904-41b2-ae87-17a64939e0a6"></td>
    <td><img width="300" alt="CreationProcess_07" src="https://github.com/niklas1531/tc-connecting-munich/assets/97844057/68cae162-4108-45e3-b095-f01f13cdf56c"></td>
    <td></td>
  </tr>
</table>

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
**Requirements Frontend Application**
- Node JS

**Requirements Backend Application**
- Python
- Pip
  
To run the application locally, follow these steps:
- Clone the repository from https://github.com/niklas1531/tc-connecting-munich 
- Run Frontend Application:
  - Open a new Terminal in your cloned project
  - Navigate into the frontend folder: cd frontend
  - Install dependencies: npm i
  - Start Application: ng s
  - The frontend application should now run on the port 4200 (http://localhost:4200) 
- Run Backend Application:
  - Open a new Terminal in your cloned project
  - Navigate into the api folder: cd api
  - Create a new virtual environment: python -m venv venv
  - Activate the environment: source venv/bin/activate
  - Install dependencies: pip install
  - Create .env file for secret keys and store two variables in it:
    - MONGO_URI=link to the MongoDB
    - ANTROPHIC_SECRET_KEY=secret key to the antrophic account    
    - If you would like to use our existing accounts please reach out to niklas.minth@tum.de and we will make them available to you.
  - Start Application: fastapi dev app.py
  - The backend application should now run on the port 8000 (http://localhost:8000)
  - The documentation with all existing routes is available on http://localhost:8000/docs) 
