from models import User, db
from schemas import UserSchema
from flask import request, make_response, jsonify, Blueprint
from marshmallow import ValidationError
from werkzeug.security import generate_password_hash

users = Blueprint("users", __name__)

@users.route("/users", methods = ["GET", "POST"])
def user_details():
    if request.method == "POST":
        data = request.get_json()
        
        # Validate and deserialize the input data
        user_schema = UserSchema()
        try:
            new_user = user_schema.load(data)
        except ValidationError as err:
            return make_response(jsonify(err.messages), 400)
        
        # Add new user to the database
        db.session.add(new_user)
        db.session.commit()
        
        # Serialize the created user
        user_data = user_schema.dump(new_user)
        return make_response(jsonify(user_data), 201)
    
    if request.method == "GET":
        user_list = User.query.all()
        user_data = UserSchema(many = True).dump(user_list)  
        return make_response(jsonify(user_data), 200)
  

@users.route("/users/<int:id>", methods = ["GET","PATCH","DELETE"])
def user_details_by_id(id):
    if request.method == "GET":
        user = User.query.filter_by(id = id).first()
        user_data = UserSchema().dump(user)
        return make_response(jsonify(user_data), 200)
    
    if request.method == "DELETE":
        user = User.query.filter_by(id = id).first()
        db.session.delete(user)
        db.session.commit()
        return make_response(jsonify(message = "user deleted successfully"), 200)
    
    if request.method == "PATCH":
        user = User.query.get(id)
        if not user:
            return make_response(jsonify({"message": "User not found"}), 404)

        data = request.get_json()

        # Validate and deserialize the input data
        user_schema = UserSchema()
        try:
            user_data = user_schema.load(data, partial=True)  # Use partial=True for partial updates
        except ValidationError as err:
            return make_response(jsonify(err.messages), 400)

        # Update the user object with the provided data
        if 'password' in data:
            # Encrypt the password if provided
            hashed_password = generate_password_hash(data['password'])
            user.password = hashed_password

        # Update other fields
        if 'username' in data:
            user.username = data['username']
        if 'email' in data:
            user.email = data['email']
        if 'is_manager' in data:
            user.is_manager = data['is_manager']
        if 'department_id' in data:
            user.department_id = data['department_id']

        # Save the changes to the database
        db.session.commit()

        # Serialize the updated user
        user_data = user_schema.dump(user)
        return make_response(jsonify(user_data), 200)