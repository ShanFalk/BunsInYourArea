function Conversation({ conversation }) {

    const onClick = (e) => {
        e.preventDefault()


    }
    return (
        <div key={conversation.id} className="convo-container" onClick={onClick}>
            <div>
                <img className="chat-profile-pic" src={conversation.image_url} alt="user" />
            </div>
            <p>{conversation.username}</p>
        </div>
    )
}

export default Conversation;
