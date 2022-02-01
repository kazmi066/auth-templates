const setAccessCookie = (res, access_token) => {
    const cookieOptions = {
        httpOnly: true,
        sameSite: true,
        secure: process.env.NODE_ENV === "production" || false,
        maxAge: process.env.ACCESS_TOKEN_EXPIRES
    }

    // Store tokens inside the cookies
    res.cookie("access_token", access_token, cookieOptions)
}

const setRefreshCookie = (res, refresh_token) => {
    const cookieOptions = {
        httpOnly: true,
        sameSite: true,
        secure: process.env.NODE_ENV === "production" || false,
        maxAge: process.env.REFRESH_TOKEN_EXPIRES
    }

    // Store tokens inside the cookies
    res.cookie("refresh_token", refresh_token, cookieOptions)
}

const clearCookies = (res) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
}

module.exports = { setAccessCookie, setRefreshCookie, clearCookies };