const GET_BUNNIES = 'bunny/GET_BUNNIES';
const POST_BUNNY = 'bunny/POST_BUNNY';
const DELETE_BUNNY = 'bunny/DELETE_BUNNY';

const retrieveAll = (bunnies) => ({
    type: GET_BUNNIES,
    bunnies
});

const createOne = (bunny) => ({
    type: POST_BUNNY,
    bunny
})

const removeOne = (bunId) => ({
    type: DELETE_BUNNY,
    bunId
})

export const deleteBunny = (bunId) => async (dispatch) => {
    const response = await fetch(`/api/bunnies/${bunId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return;
        }
        if (data.Successful) dispatch(removeOne(bunId));
        return data;
    }
}

export const updateBunny = (payload) => async (dispatch) => {
    const {
        id,
        user_id,
        name,
        age,
        sex,
        breed,
        biography,
        image_url,
        is_adoptable
    } = payload

    const form = new FormData();
    form.append('id', id)
    form.append('user_id', user_id)
    form.append('name', name)
    form.append('age', age)
    form.append('sex', sex)
    form.append('breed', breed)
    form.append('biography', biography)
    form.append('image_url', image_url)
    form.append('is_adoptable', is_adoptable)

    const response = await fetch('/api/bunnies', {
        method: "PUT",
        body: form
    });

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            throw (data);
        }
        dispatch(createOne(data));
        return data
    } else if (response.status < 500) {
        const data = await response.json();
        console.log('THIS IS THE DATA IN THE THUNK', data)
        if (data.errors) {
            throw (data);
        }
    }
}

export const createBunny = (payload) => async (dispatch) => {

    console.log('THIS IS THE PAYLOAD', payload)
    const {
        user_id,
        name,
        age,
        sex,
        breed,
        biography,
        image_url,
        is_adoptable
    } = payload

    const form = new FormData();
    form.append('user_id', user_id)
    form.append('name', name)
    form.append('age', age)
    form.append('sex', sex)
    form.append('breed', breed)
    form.append('biography', biography)
    form.append('image_url', image_url)
    form.append('is_adoptable', is_adoptable)

    const response = await fetch('/api/bunnies', {
        method: "POST",
        body: form
    });

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            throw (data);
        }
        dispatch(createOne(data));
        return data
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            throw (data);
        }
    }

}


export const getAllBunnies = () => async (dispatch) => {
    const response = await fetch('/api/bunnies');
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }

        dispatch(retrieveAll(data));
    }
}

const initialState = {};


export default function bunnyReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BUNNIES:
            const bunnies = action.bunnies
            return { ...state, ...bunnies }
        case POST_BUNNY:
            return { ...state, [action.bunny.id]: action.bunny }
        case DELETE_BUNNY:
            let newState = { ...state }
            delete newState[action.bunId]
            return newState
        default:
            return state;
    }
}
