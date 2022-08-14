from flask import Blueprint, json, request
from app.models import db, Conversation, Message, User
from flask_login import login_required


conversation_routes = Blueprint('conversations', __name__)

# @login_required
#takes two args: the url and the http verb as a kwarg
# @conversation_routes.route("", methods=["POST"])

@login_required
@conversation_routes.route("/<int:id>/messages", methods=["GET"])
def conversation_messages(id):

    messages = Message.query.\
        join(Message.user).\
        filter(Message.conversation_id == id).all()

    return {message.id: message.to_dict(sender=message.user) for message in messages}
