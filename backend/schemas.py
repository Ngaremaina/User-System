from marshmallow import Schema, fields, post_load
from models import *

class TaskSchema(Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(required=True)
    description = fields.String()
    due_date = fields.DateTime()
    status = fields.String()
    user_id = fields.Integer(required=True)

    @post_load
    def make_task(self, data, **kwargs):
        return Task(**data)
    
class UserSchema(Schema):
    id = fields.Integer(dump_only=True)
    email = fields.Email(required=True)
    username = fields.String(required=True)
    password = fields.String(required= True)
    is_manager = fields.Bool()
    department_id = fields.Integer()

    tasks = fields.Nested(TaskSchema, many=True, dump_only=True)

    @post_load
    def make_user(self, data, **kwargs):
        return User(**data)
    

class DepartmentSchema(Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True)
    users = fields.Nested(UserSchema, many=True, dump_only=True)

    @post_load
    def make_department(self, data, **kwargs):
        return Department(**data)