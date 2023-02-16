const { messages } = require(".");

class Response {
    constructor(res) {
        this.res = res;
    }

    AccessDenied() {
        this.response = { result: null, status: false, ErrorMessage: messages.accessDenied, StatusCode: 403 };
        return this.res.send(this.response);
    }

    Failed(err, erroCode = 500) {
        this.response = { result: null, status: false, ErrorMessage: err, StatusCode: erroCode };
        return this.res.send(this.response);
    }

    Success(result) {
        this.response = { result: result, status: true, ErrorMessage: null, StatusCode: 200 };
        return this.res.send(this.response);
    }
}

module.exports = Response;
