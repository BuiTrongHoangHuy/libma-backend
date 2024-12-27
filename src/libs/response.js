const SimpleResponse = (data) => {
    return {
        data: data.data,
        code: data.code,
        message: data.message,
    }
}

const SuccessResponse = (data, paging, extra) => {
    return {
        data: data,
        extra: extra,
        paging: paging
    }
}

const ErrorResponse = (err) => {
    return {
        code: err.code,
        message: err.message,
        key: err.key,
        metadata: err.metadata
    }
}

module.exports = {SimpleResponse, SuccessResponse, ErrorResponse}