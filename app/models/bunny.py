from .db import db
from datetime import datetime
from sqlalchemy.orm import validates


class Bunny(db.Model):
    __tablename__ = 'bunnies'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Float, nullable=False)
    sex = db.Column(db.String(6), nullable=False)
    breed = db.Column(db.String(50), nullable=False)
    biography = db.Column(db.Text)
    image_url = db.Column(db.Text)
    is_adoptable = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    user = db.relationship("User", back_populates="bunnies")
    likes = db.relationship("Like", back_populates="bunny")

# Function that returns data as a dictionary and takes in
# additional args such as joined loads.
# in this example, the key of kwargs would be user and the collection is bunny.user
# from the joined load
    def to_dict(self, **kwargs):
        out = {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'age': self.age,
            'sex': self.sex,
            'breed': self.breed,
            'image_url': self.image_url,
            'biography': self.biography,
            'is_adoptable': self.is_adoptable,
            'created_at':self.created_at,
        }
        for key, collection in kwargs.items():
            out[key] = collection.to_dict()

        return out

    @validates('name')
    def validate_name(self, key, name):
        if len(name) <= 2:
            raise ValueError('Name is too short')
        return name
