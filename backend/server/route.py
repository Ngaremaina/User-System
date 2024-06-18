from server import app
from routes.departments import departments
from routes.tasks import tasks
from routes.users import users
from routes.authentication import authentication
from flask import render_template

app.register_blueprint(departments)
app.register_blueprint(tasks)
app.register_blueprint(authentication)
app.register_blueprint(users)



