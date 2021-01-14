const usersInRoom = []

function joinRoom(socketId, username, roomId) {
    const user = { socketId, username, roomId };
    usersInRoom.push(user);
    return user;
}

function leaveRoom(socketId) {
    const userIndex = usersInRoom.findIndex(x => x.socketId === socketId);
    if (userIndex !== -1) {
        return usersInRoom.splice(userIndex, 1)[0];
    }
}

function getUserInRoom(socketId) {
    const user = usersInRoom.filter(x => x.socketId === socketId)[0];
    return user;
}

module.exports = {
    joinRoom,
    getUserInRoom,
    leaveRoom,
}