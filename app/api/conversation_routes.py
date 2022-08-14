from crypt import methods
from flask import Blueprint, json, request
from app.models import db, Conversation
from flask_login import login_required


conversation_routes = Blueprint('conversations', __name__)

# @login_required
#takes two args: the url and the http verb as a kwarg
# @conversation_routes.route("", methods=["POST"])
