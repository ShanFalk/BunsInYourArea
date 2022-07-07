from app.models import db, Bunny

def seed_bunnies():
    db.session.add_all(
        [
            Bunny(
                user_id=4,
                name='Endora',
                age=2.70,
                sex='Female',
                breed='American/Netherland Dwarf',
                image_url='https://www.thinkingoutsidethecage.org/wp-content/uploads/2022/07/46454003.jpg',
                biography='Endora arrived at Animal Friends with two other bunnies after they were found living outside. She spent some time in foster homes, where she worked on overcoming her shyness. Once you gain Endora’s trust, she craves attention and won’t leave your side as long as you keep petting her! This sweet girl loved cuddling and grooming a plush bunny in her foster home, so she may enjoy living with another rabbit. Do you think that you could provide Endora the life she deserves?',
                is_adoptable=True
            ),
            Bunny(
                user_id=4,
                name='Bun Bun',
                age=3.70,
                sex='Male',
                breed='Lop, Mini',
                image_url='https://www.thinkingoutsidethecage.org/wp-content/uploads/2022/07/54829228.jpg',
                biography='Meet Bun Bun! Bun Bun is a 3.7 year old Mini Lop who came to us when his owner could no longer take care of him. Bun Bun is energetic, but a friendly young man. He may be able to live with another bun pending a successful meet and greet at the shelter.',
                is_adoptable=True
            ),
            Bunny(
                user_id=4,
                name='Cutie',
                age=0.90,
                sex='Female',
                breed='Rex, Mini',
                image_url='https://www.thinkingoutsidethecage.org/wp-content/uploads/2022/07/47338265.jpg',
                biography='Meet Cutie! She arrived at Animal Friends in November and has slowly taken her time to warm up to us. Once she is comfortable with you she will show her sweet, spunky and goofy personality! Her favorite toys include seagrass balls, wooden sticks and paper she can rip up. She is a young bunny that is full of energy, but may slow down enough to be petted. Does Cutie sound like a perfect match for your family?',
                is_adoptable=True
            ),
            Bunny(
                user_id=4,
                name='Marshmallow',
                age=3.60,
                sex='Female',
                breed='Lop, Holland',
                image_url='https://www.thinkingoutsidethecage.org/wp-content/uploads/2022/07/54996311.jpg',
                biography='Meet Marshmallow! Marshmallow is a 3.5 year old Lop who came to us when her owner was moving and could not take her with. Marshmallow may be able to live with another bun pending a successful meet and greet at the shelter.',
                is_adoptable=True
            ),
            Bunny(
                user_id=3,
                name='Superstar',
                age=3.60,
                sex='Male',
                breed='Lionhead',
                image_url='https://www.thinkingoutsidethecage.org/wp-content/uploads/2022/07/55260640.jpg',
                biography='Hello! My name is Superstar! I was adopted by my best friend Ben in 2021.',
                is_adoptable=False
            )
        ]
    )

    db.session.commit()

def undo_bunnies():
    db.session.execute('TRUNCATE bunnies RESTART IDENTITY CASCADE;')
    db.session.commit()
