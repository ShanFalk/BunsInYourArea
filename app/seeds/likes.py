from app.models import db, Like

def seed_likes():
    db.session.add_all(
        [
            Like(
                user_id=1,
                bunny_id=1
            ),
            Like(
                user_id=1,
                bunny_id=2
            ),
            Like(
                user_id=2,
                bunny_id=1
            ),
            Like(
                user_id=2,
                bunny_id=2
            ),
            Like(
                user_id=2,
                bunny_id=3
            ),
            Like(
                user_id=3,
                bunny_id=2
            ),
            Like(
                user_id=3,
                bunny_id=3
            )
        ]
    )

    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
