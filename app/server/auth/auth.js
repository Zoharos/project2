const jwt = require('jsonwebtoken');
const fs = require('fs');

const key = fs.readFileSync('app/server/encryption/localhost.key', 'utf8');

function createJWT(id) {
    const token = jwt.sign({userid: id}, key, {expiresIn: '1h'});
    return token;
}

function verifyJWT(token) {
    try {
        const data = jwt.verify(token, key);
        return data;
    }
    catch(err){ 
        return ;
    }
}

module.exports = {
    createJWT,
    verifyJWT
};