import authApi from '../Axios/axios'

const register = async ( username, email, password, registration_time, userID, active ) => {
    return await authApi.post('/register', 
    {   username,
        email,
        password,
        registration_time,
        userID,
        active
    },
    {headers: {'Content-Type': 'application/json'}},
    )
}

const login = async ( email, password ) => {
    return await authApi.post('/login', 
    {
        email,
        password
    },
    {headers: {'Content-Type': 'application/json'}},
    )
}

const logout = () => {
    localStorage.removeItem("jwt");
};

const authService = {
    register,
    login,
    logout,
};

export default authService;