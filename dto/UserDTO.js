class UserDTO {
    constructor(user) {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
        };
    }
}
module.exports = UserDTO;
