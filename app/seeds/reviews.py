from app.models import db, Review

def seed_reviews():
    db.session.add_all(
        [
            Review(
                reviewer_id=3,
                reviewee_id=4,
                rating=5,
                content='I adopted my bunny Superstar from animal_friends last year. Wonderful people and a wonderful shelter!'
            ),
            Review(
                reviewer_id=2,
                reviewee_id=4,
                rating=3,
                content='Many many years ago I adopted a rex named Charles from animal_friends. At the time, animal_friends was just starting out and imo didn\'t have the best area for bunnies. Although I think this has improved some since then.'
            ),
            Review(
                reviewer_id=1,
                reviewee_id=4,
                rating=2,
                content='I am once again asking to adopt a bunny. Will someone get back to me??'
            ),

        ]
    )

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
