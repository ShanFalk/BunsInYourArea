"""empty message

Revision ID: fec0807ca245
Revises: 50f7ae0ea621
Create Date: 2022-07-12 12:40:50.104157

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fec0807ca245'
down_revision = '50f7ae0ea621'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'hashed_password')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('hashed_password', sa.VARCHAR(length=255), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
