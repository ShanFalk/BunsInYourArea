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
    room = data['recipient']
    emit("chat", data, broadcast=True, to=room)

#Event handler for 'join' events
#Assigning each client to a room with their username
@socketio.on("join")
def on_join(data):
    username = data['username']
    room = data['username']
    join_room(room)
    send(username + ' has entered the room.', to=room)

@socketio.on("leave")
def on_leave(data):
    username = data['username']
    room = data['username']
    leave_room(room)
    send(username + ' has left the room.', to=room)
