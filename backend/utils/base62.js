const CHARSET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = CHARSET.length;

function encodeBase62(number){
    if(number === 0) return CHARSET[0];

let result = '';
let remaining = number;

while(remaining > 0){
    const remainder = remaining % BASE;
    result = CHARSET[remainder] + result;
    remaining = Math.floor(remaining/BASE);
}
return result;

}

module.exports = { encodeBase62};