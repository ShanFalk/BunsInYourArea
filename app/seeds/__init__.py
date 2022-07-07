from flask.cli import AppGroup
from .users import seed_users, undo_users
from .bunnies import seed_bunnies, undo_bunnies
from .reviews import seed_reviews, undo_reviews
from .likes import seed_likes, undo_likes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_bunnies()
    seed_reviews()
    seed_likes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_bunnies()
    undo_reviews()
    undo_likes()
    # Add other undo functions here
