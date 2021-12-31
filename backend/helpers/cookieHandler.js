const setCookie = (res, access_token) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" || false,
        maxAge: process.env.ACCESS_TOKEN_EXPIRES
    }

    // Store tokens inside the cookies
    res.cookie("access_token", access_token, cookieOptions)
}

module.exports = setCookie;