from app.models import db, Message

def seed_messages():
    db.session.add_all(
        [
            Message(
                conversation_id=1,
                sender_id=1,
                content='Helloooo!'
            ),
            Message(
                conversation_id=1,
                sender_id=2,
                content='Hi there!'
            ),
             Message(
                conversation_id=1,
                sender_id=2,
                content='How are you?'
            ),
             Message(
                conversation_id=2,
                sender_id=2,
                content='Do you have any bunnies?'
            ),
             Message(
                conversation_id=2,
                sender_id=3,
                content='Yes I have one!'
            ),
             Message(
                conversation_id=3,
                sender_id=1,
                content='Superstar is so cute!'
            ),
             Message(
                conversation_id=3,
                sender_id=3,
                content='Thank you!'
            ),
             Message(
                conversation_id=3,
                sender_id=3,
                content='I adopted him from animal_friends'
            ),
        ]
    )

    db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE conversations RESTART IDENTITY CASCADE;')
    db.session.commit()
