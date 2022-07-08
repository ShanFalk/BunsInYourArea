from crypt import methods
from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Bunny, db
from sqlalchemy.orm import joinedload
from app.forms import CreateBunny
from app.utils import format_errors, upload

bunny_routes = Blueprint('bunnies', __name__)

@bunny_routes.route("", methods=["GET"])
def get_bunnies():
    bunnies = Bunny.query.options(joinedload('user')).all()
    return {bunny.id: bunny.to_dict(user=bunny.user) for bunny in bunnies}

@login_required
@bunny_routes.route("", methods=["POST"])
def add_bunny():

    image = request.files["image_url"]
    image_url = upload(image)

    form = CreateBunny()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_bunny = Bunny(
            user_id=form.data['user_id'],
            name=form.data['name'],
            age=form.data['age'],
            sex=form.data['sex'],
            breed=form.data['breed'],
            biography=form.data['biography'],
            image_url=image_url,
            is_adoptable=form.data['is_adoptable']
        )
        db.session.add(new_bunny)
        db.session.commit()

        bunny = Bunny.query.options(joinedload('user')).get(new_bunny.id)
        return bunny.to_dict(user=bunny.user)
    return {'errors': format_errors(form.errors)}
