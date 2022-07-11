from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Bunny, db
from sqlalchemy.orm import joinedload
from app.forms import CreateBunny, UpdateBunny
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

    return {'errors': form.errors}, 401

@login_required
@bunny_routes.route("", methods=["PUT"])
def updateBunny():

    image_url = None

    if "image_url" in request.files.keys():
        image = request.files["image_url"]
        image_url = upload(image)

    form = UpdateBunny()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        bunny = Bunny.query.get(form.data['id'])
        bunny.name=form.data['name']
        bunny.age=form.data['age']
        bunny.sex=form.data['sex']
        bunny.breed=form.data['breed']
        bunny.biography=form.data['biography']
        if image_url:
            bunny.image_url=image_url
        bunny.is_adoptable=form.data['is_adoptable']

        db.session.commit()

        bunny = Bunny.query.options(joinedload('user')).get(bunny.id)
        return bunny.to_dict(user=bunny.user)
    return {'errors': format_errors(form.errors)}, 401

@login_required
@bunny_routes.route("/<int:id>", methods=["DELETE"])
def delete_bunny(id):
    bunny = Bunny.query.get(id)
    db.session.delete(bunny)
    db.session.commit()
    return {'Successful': 'Successful'}
