import axios from 'axios';

const isLocal = window.location.hostname === 'localhost';

const serverUrl = isLocal ? 'http://localhost:8080' : window.location.protocol + '//' + window.location.hostname;
const baseURL = serverUrl + '/api/v1';

console.log(`API Url: ${baseURL}`);
const apiGateway = axios.create({
    baseURL,
    timeout: 1000,
    headers: { 'Content-Type': 'application/json', Accept: ['application/json', 'plain/text'] },
});
apiGateway.interceptors.response.use(({ data }) => data);

export default apiGateway;
