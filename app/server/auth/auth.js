const jwt = require('jsonwebtoken');
const fs = require('fs');

const key = fs.readFileSync('app/server/encryption/localhost.key', 'utf8');

function createJWT(id) {
    const token = jwt.sign({userid: id}, key, {expiresIn: '1h'});
    return token;
}

function verifyJWT(jwtHeader) {
    try {
        if(jwtHeader.split(' ')[0] === 'Bearer')
        {
            const token = jwtHeader.split(' ')[1];

                const data = jwt.verify(token, key);
                return data;
        }
    }      
    catch(err){ 
        return ;
    }
}

module.exports = {
    createJWT,
    verifyJWT
};