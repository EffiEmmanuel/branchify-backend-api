import config from "./config/index.js"

const API_PREFIX = process.env.API_PREFIX
const API_AUTH_PREFIX = process.env.API_AUTH_PREFIX

const routes = {
    API_LOGIN_ROUTE: `${API_AUTH_PREFIX}/login`,
    API_SIGNUP_ROUTE: `${API_AUTH_PREFIX}/register`,
    API_USER_ROUTE: `${API_PREFIX}/users`,
}

export default routes