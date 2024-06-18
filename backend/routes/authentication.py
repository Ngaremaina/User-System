from flask import Blueprint, request, jsonify, make_response
from werkzeug.security import check_password_hash, generate_password_hash
from schemas import UserSchema
from models import db, User
from flask_jwt_extended import create_access_token
authentication = Blueprint("authentication", __name__)

@authentication.route("/login", methods = ["POST"])
def login_user():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    user = User.query.filter_by(email = email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify(message = "Incorrect email/password")
    access_token = create_access_token(identity=email)
    return make_response(jsonify({
        "email":user.email,
        "access_token":access_token,
        "username":user.username,
        "id":user.id,
        "is_manager":user.is_manager
    }), 200)

@authentication.route("/register", methods = ["POST"])
def register_user():
    data = request.get_json()
    email = data["email"]
    username = data["username"]
    password = data["password"]
    is_manager = data["is_manager"]
    department_id = data["department_id"]

    hashed_password = generate_password_hash(password)

    if User.query.filter_by(email = email).first():
        return jsonify(message = "Email exists")
    
    else:
        new_user = User(
            email = email,
            password = hashed_password,
            is_manager = is_manager,
            username = username,
            department_id = department_id
        )

        db.session.add(new_user)
        db.session.commit()

    # added_user = UserSchema.dump(new_user)
    return make_response(jsonify(message = "added successfully"), 201)

    

