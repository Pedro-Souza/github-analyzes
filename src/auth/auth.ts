import axios from 'axios'
import * as config from '../config';

let axiosConf = axios.create({
    auth: {
        username: config.default.USERNAME,
        password: config.default.PASSWORD
    }
});

export default axiosConf;