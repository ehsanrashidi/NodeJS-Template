const { users } = require("../models")

module.exports = {
    getById:async (userId)=>{
        return await users.find(({_id:userId}));
    }
}