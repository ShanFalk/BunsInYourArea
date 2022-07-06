from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstname='Demo',
        lastname='Demo',
        username='Demo',
        email='demo@aa.io',
        image_url='https://mybunnybucket.s3.amazonaws.com/61AC409D-3C44-4620-B495-A58A09AFC9F1_1_201_a.jpeg',
        biography='Follow the white rabbit.',
        city='Pittsburgh',
        state='PA',
        password='password')

    celeste = User(
        firstname='Celeste',
        lastname='Star',
        username='Dreamer1',
        email='celeste@aa.io',
        image_url='https://www.ecowatch.com/wp-content/uploads/2021/10/1641264230-origin.jpg',
        biography='Curiouser and curiouser.',
        city='Baltimore',
        state='MD',
        password='password')

    benny = User(
        firstname='Ben',
        lastname='Berry',
        username='its_benny',
        email='benny@aa.io',
        image_url='https://www.rollingstone.com/wp-content/uploads/2018/06/rs-14816-elton-1800-1395760049.jpg',
        biography='It\'s no use going back to yesterday because I was a different person then.',
        city='Memphis',
        state='TN',
        password='password')

    db.session.add(demo)
    db.session.add(celeste)
    db.session.add(benny)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
