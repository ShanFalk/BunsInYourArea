from crypt import methods
from flask import Blueprint, jsonify, session
from flask_login import login_required
from app.models import Bunny, User
from sqlalchemy.orm import joinedload

bunny_routes = Blueprint('bunnies', __name__)

@bunny_routes.route("", methods=["GET"])
def get_bunnies():
    bunnies = Bunny.query.options(joinedload('user')).all()
    return {bunny.id: bunny.to_dict(user=bunny.user) for bunny in bunnies}
