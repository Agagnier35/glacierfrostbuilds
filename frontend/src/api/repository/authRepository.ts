import apiGateway from '../apiGateway';

class AuthRepositoryAPI {
    getUserSession = () => apiGateway.get<void, string>('/user');
    logout = () => apiGateway.post<void, void>('/logout');
}

const AuthRepository = new AuthRepositoryAPI();
export default AuthRepository;
