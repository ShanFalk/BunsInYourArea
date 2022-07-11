const ADD_LIKE = 'like/ADD_LIKE'
const GET_LIKES = 'like/GET_LIKE'
const REMOVE_LIKE = 'like/REMOVE_LIKE'

const retreiveAll = (likes) => ({
    type: GET_LIKES,
    likes
});

const getLikes = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/`)
}
