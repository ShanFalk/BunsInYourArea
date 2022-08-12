# import the SQLAlchemy object and the table class

from app.models import db, Conversation

#create a function that adds instances of the conversation class to
#the database

def seed_conversations():
    db.session.add_all(
        [
            Conversation(
                creator_id=1,
                participant_id=2
            ),
             Conversation(
                creator_id=2,
                participant_id=3
            ),
             Conversation(
                creator_id=1,
                participant_id=3
            ),
        ]
    )

    db.session.commit()


def undo_conversations():
    db.session.execute('TRUNCATE conversations RESTART IDENTITY CASCADE;')
    db.session.commit()
