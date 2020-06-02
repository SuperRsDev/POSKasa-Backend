
exports.mapUserToDto = function (user) {
    let userDto = {};
    userDto.id = user.id;
    userDto.username = user.username;
    userDto.firstName = user.firstName;
    userDto.lastName = user.lastName;
    userDto.email = user.email;
    userDto.phone = user.phone;
    userDto.address = user.address;
    userDto.picture = user.picture;
    userDto.birthDate = user.birthDate;
    userDto.loginProvider = user.loginProvider;
    return userDto;
};
