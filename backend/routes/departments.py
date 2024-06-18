from models import Department, db
from schemas import DepartmentSchema
from flask import request, make_response, jsonify, Blueprint
from marshmallow import ValidationError


departments = Blueprint("departments", __name__)


@departments.route("/departments", methods = ["GET", "POST"])
def department_details():
    if request.method == "POST":
        data = request.get_json()
        
        # Validate and deserialize the input data
        department_schema = DepartmentSchema()
        try:
            new_department = department_schema.load(data)
        except ValidationError as err:
            return make_response(jsonify(err.messages), 400)
        
        # Add new department to the database
        db.session.add(new_department)
        db.session.commit()
        
        # Serialize the created department
        department_data = department_schema.dump(new_department)
        return make_response(jsonify(department_data), 201)
    
    if request.method == "GET":
        department_list = Department.query.all()
        department_data = DepartmentSchema(many = True).dump(department_list)  
        return make_response(jsonify(department_data), 200)
  

@departments.route("/departments/<int:id>", methods = ["GET","PATCH","DELETE"])
def department_details_by_id(id):
    if request.method == "GET":
        department = Department.query.filter_by(id = id).first()
        department_data = DepartmentSchema().dump(department)
        return make_response(jsonify(department_data), 200)
    
    if request.method == "DELETE":
        department = Department.query.filter_by(id = id).first()
        db.session.delete(department)
        db.session.commit()
        
        return make_response(jsonify(message = "department deleted successfully"), 200)
    
    if request.method == "PATCH":
        department = Department.query.filter_by(id=id).first()
        if not department:
            return make_response(jsonify({"message": "department not found"}), 404)

        data = request.get_json()
        
        # Validate and deserialize the input data
        department_schema = DepartmentSchema()
        try:
            department_data = department_schema.load(data, partial=True)  # Use partial=True for partial updates
        except ValidationError as err:
            return make_response(jsonify(err.messages), 400)
        
        # Update the department object with the provided data
        for field, value in data.items():
            setattr(department, field, value)

        # Save the changes to the database
        db.session.commit()
        
        # Serialize the updated department
        department_data = department_schema.dump(department)
        
        return make_response(jsonify(department_data), 200)