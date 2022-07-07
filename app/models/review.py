from .db import db
from datetime import datetime
from sqlalchemy.orm import validates

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    reviewer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reviewee_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    reviewer = db.relationship("User", foreign_keys=[reviewer_id], back_populates="reviewer_user")
    reviewee = db.relationship("User", foreign_keys=[reviewee_id], back_populates="reviewee_user")

    def to_dict(self):
        return {
            "id": self.id,
            "reviewer_id": self.reviewer_id,
            "reviewee_id": self.reviewee_id,
            "rating": self.rating,
            "content": self.content,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    @validates('rating')
    def validate_rating(self, key, rating):
        if 5 < rating < 0:
            raise ValueError('Not a valid rating')
        return rating
