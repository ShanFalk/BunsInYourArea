from crypt import methods
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Bunny

bunny_routes = Blueprint('bunnies', __name__)

@bunny_routes.route("", methods=["GET"])
def get_bunnies():
    bunnies = Bunny.query.all()
    print('THESE ARE THE BUNNIES', bunnies)
    return {bunny.id: bunny.to_dict() for bunny in bunnies}
