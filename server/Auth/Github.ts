import Axios from 'axios';

export default Axios.create(
    {
        baseURL: 'https://api.github.com/',
        auth: {
            username: process.env.GIT_USER || '',
            password: process.env.GIT_PASS || ''
        }
    }
)