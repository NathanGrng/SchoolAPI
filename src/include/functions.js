exports.success = function (result) {
    return {
        status: 'success',
        result: result
    }
}
exports.failure = function (message) {
    return {
        status: 'failure',
        message: message
    }
}