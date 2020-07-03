export const changeUsername = e => {
    return {
        type: 'CHANGE',
        e: e
    }
}

export const getUserList = (e, username) => {
    e.persist();
    return async dispatch => {
        try {
            const resp = await fetch(`https://api.github.com/search/users?q=${username}&per_page=20`);
            const data = await resp.json();

            dispatch({
                type: 'SUBMIT',
                e: e,
                data
            })

        } catch (err) {
            console.log(err);
        }
    }
}

export const getUserData = (e, username) => {
    console.log('user clicked');
    username = e.currentTarget.getAttribute("username");
    return async dispatch => {
        try {
            const resp = await fetch(`https://api.github.com/users/${username}`);
            const data = await resp.json();
            console.log(data);
            dispatch({
                type: 'CLICKED',
                e: e,
                data
            })
        } catch (err) {
            console.log(err);
        }
    }
}
