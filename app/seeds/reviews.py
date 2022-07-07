from app.models import db, Review

def seed_reviews():
    db.session.add_all(
        [
            Review(
                reviewer_id=3,
                reviewee_id=4,
                rating=5,
                content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            ),
            Review(
                reviewer_id=2,
                reviewee_id=4,
                rating=3,
                content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            ),
            Review(
                reviewer_id=1,
                reviewee_id=4,
                rating=2,
                content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            ),

        ]
    )

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
