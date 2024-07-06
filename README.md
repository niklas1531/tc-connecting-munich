# Connecting Munich - Tech Challenge Summer Term 2024 - TUM

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




#AWS Deployment

##Frontend



##API

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