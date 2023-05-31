import axios from "axios"
import JWTService from "./JWTService";
class ApiService {
    static setConfig () {
        this.baseUrl = 'http://localhost:8000/api/';
        this.config = {
            headers : {
                'Authorization' : `Bearer ${JWTService.getToken()}`
            }
        };
    }
    static get (url) {
        this.setConfig();
        return axios.get(this.baseUrl + url , this.config);
    }
    static post(url,form) {
        this.setConfig();
        return axios.post(this.baseUrl + url ,form, this.config);
    }
    static put(url,form) {
        this.setConfig();
        return axios.put(this.baseUrl + url ,form, this.config);
    }
    static patch(url,form) {
        this.setConfig();
        return axios.patch(this.baseUrl + url ,form, this.config);
    }
    static delete(url) {
        this.setConfig();
        return axios.delete(this.baseUrl + url , this.config);
    }
};
export default ApiService;