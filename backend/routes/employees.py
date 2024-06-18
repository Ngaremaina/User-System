# from models import User, db
# from schemas import UserSchema
# from flask import request, make_response, jsonify, Blueprint

# employees = Blueprint("employees", __name__)

# @employees.route("/employees", methods = ["GET", "POST"])
# def employee_details():
#     if request.method == "POST":
#         data = request.get_json()
#         employees = EmployeeSchema().load(data)
#         new_employee = Employee(**employees)
#         db.session.add(new_employee)
#         db.session.commit()
#         employee_schema = EmployeeSchema().dump(new_employee)
#         return make_response(jsonify(employee_schema))
#     if request.method == "GET":
#         employee_list = Employee.query.all()
#         employee_data = EmployeeSchema(many = True).dump(employee_list)  
#         return make_response(jsonify(employee_data), 200)
  

# @employees.route("/employees/<int:id>", methods = ["PATCH","DELETE"])
# def employee_details_by_id(id):
#     if request.method == "DELETE":
#         employee = Employee.query.filter_by(id = id).first()
#         db.session.delete(employee)
#         db.session.commit()
#         return make_response(jsonify(message = "employee deleted successfully"), 200)
    
#     if request.method == "PATCH":
#         employee = Employee.query.filter_by(id = id).first()
#         data = request.get_json()
#         employee_data = EmployeeSchema().load(data)
#         for field, value in employee_data.items():
#             setattr(employee, field, value)
#         db.session.add(employee)
#         db.session.commit() 

#         employees_data = EmployeeSchema().dump(employee)
#         return make_response(jsonify(employees_data))