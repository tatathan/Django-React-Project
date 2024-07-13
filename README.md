# Django-React-Project
Develop and integrate RESTful APIs using Django REST Framework to connect React front-end applications with back-end services

## backend setup and run

```Shell
# clone repository
git clone https://github.com/tatathan/Django-React-Project.git
cd Django-React-Project/backend

# create a virtual environment and activate
python -m venv .venv
./.venv/scripts/activate

# install packages
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate

# backend runserver
python manage.py runserver
```
## frontend setup and run
```Shell
cd Django-React-Project/frontend
npm i
# frontend runserver
npm run dev
```