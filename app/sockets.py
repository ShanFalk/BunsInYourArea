from flask_socketio import SocketIO, emit, join_room, leave_room, send
# from flask import request
import os

# Setting up Cross Origin Resource Sharing for both prod and dev
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://buns-in-your-area.herokuapp.com/",
        "https://buns-in-your-area.herokuapp.com/"
    ]
else:
    origins = "*"

#create your SocketIO instance object
socketio = SocketIO(cors_allowed_origins=origins);

#optional callback that confirms message was received by the client
#--this might not work b/c in the docs it says callbacks are not invoked
# for broadcast messages
# def ack():
#     print("message was received!")
#Event handler for 'chat' events --must match frontend value--
#No return statement; data sent with emit or send functions
@socketio.on("chat")
def handle_chat(data):
    room = data['conversation']
    emit("chat", data, broadcast=True, to=room)

#Event handler for 'join' events
@socketio.on("join")
def on_join(data):
    room = data['conversation']
    join_room(room)

#Event handler for 'leave' events
@socketio.on("leave")
def on_leave(data):
    room = data['conversation']
    leave_room(room)
