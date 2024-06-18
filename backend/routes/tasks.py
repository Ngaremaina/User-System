from models import Task, db
from schemas import TaskSchema
from flask import request, make_response, jsonify, Blueprint
from marshmallow import ValidationError
from datetime import datetime
tasks = Blueprint("tasks", __name__)

@tasks.route("/tasks", methods = ["GET", "POST"])
def task_details():
    if request.method == "POST":
        data = request.get_json()
        
        # Validate and deserialize the input data
        task_schema = TaskSchema()
        try:
            new_task = task_schema.load(data)
        except ValidationError as err:
            return make_response(jsonify(err.messages), 400)
        
        # Add new task to the database
        db.session.add(new_task)
        db.session.commit()
        
        # Serialize the created task
        task_data = task_schema.dump(new_task)
        return make_response(jsonify(task_data), 201)
       
    if request.method == "GET":
        task_list = Task.query.all()
        task_data = TaskSchema(many = True).dump(task_list)  
        return make_response(jsonify(task_data), 200)
  

@tasks.route("/tasks/<int:id>", methods = ["GET","PATCH","DELETE"])
def task_details_by_id(id):
    if request.method == "GET":
        task = Task.query.filter_by(id = id).first()
        task_data = TaskSchema().dump(task)
        return make_response(jsonify(task_data), 200)
    
    if request.method == "DELETE":
        task = Task.query.filter_by(id = id).first()
        db.session.delete(task)
        db.session.commit()
        return make_response(jsonify(message = "Task deleted successfully"), 200)
    
    if request.method == "PATCH":
        data = request.json
        task = Task.query.filter_by(id = id).first()
        if 'title' in data:
            task.title = data['title']
        if 'description' in data:
            task.description = data['description']
        if 'status' in data:
            task.status = data["status"]
        if 'due_date' in data:
            task.due_date = datetime.fromisoformat(data['due_date'])
        if 'user_id' in data:
            task.user_id = data['user_id']

        db.session.commit()
        return jsonify({'message': 'Task updated successfully'})