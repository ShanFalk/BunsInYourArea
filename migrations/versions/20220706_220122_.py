"""empty message

Revision ID: 440c1dcc8d1d
Revises: fd9def0a6eab
Create Date: 2022-07-06 22:01:22.423538

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '440c1dcc8d1d'
down_revision = 'fd9def0a6eab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bunnies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('age', sa.Float(), nullable=False),
    sa.Column('gender', sa.String(length=6), nullable=False),
    sa.Column('color', sa.String(length=30), nullable=False),
    sa.Column('biography', sa.Text(), nullable=True),
    sa.Column('image_url', sa.Text(), nullable=True),
    sa.Column('is_adoptable', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('bunnies')
    # ### end Alembic commands ###
