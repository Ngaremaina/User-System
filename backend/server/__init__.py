from flask import Flask, render_template, send_from_directory
from dotenv import load_dotenv
import os
from flask_migrate import Migrate
from models import db
from flask_cors import CORS
from flask_jwt_extended import JWTManager
load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db.init_app(app)
migrate = Migrate(app, db)

jwt = JWTManager(app)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000",}})
