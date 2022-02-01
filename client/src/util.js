export const validInfo = (newUser) => {
    if (!newUser.every(Boolean)) {
        return {isValid: false, message: 'Please fill the form'}
    }

    if (!(newUser[0].length > 4 && newUser[0].length < 25)) {
        return {isValid: false, message: 'Username is really short!'}
    }

    if(!newUser[2]) return {isValid: true}

    // password && confirmedPassword
    if (newUser[1] !== newUser[2]) {
        return {isValid: false, message: `The passwords aren't the same`}
    }

    return {isValid: true}
}

export const trimUserData = (userData) => {
    const trimedUserData = {};
    Object.keys(userData).forEach(key => {
        trimedUserData[key] = userData[key].trim()
    })

    return trimedUserData;
}

export const delay = ms => new Promise(res => setTimeout(res, ms));