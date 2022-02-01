module.exports = (req, res, next) => {
    const { username, password } = req.body;

    // function validEmail(str) {
    //     const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str);
    //     return isValid;
    // }

    if (![username, password].every(Boolean)){
        return res.status(403).json('Missing Credentials')
    }

    if(![username, password].every(p => p.length > 4)){
        return res.status(403).json('Missing Credentials')
    }

    next();
}