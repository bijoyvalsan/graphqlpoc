from flask import Flask
from flask_graphql import GraphQLView
from schema.schema import schema

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello! from department'

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))