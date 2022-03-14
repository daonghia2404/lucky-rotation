import ApiService from '@/services/api';

class Auth {
  async login(body) {
    const response = await ApiService.post(`/admin/login`, body);
    return response.data;
  }

  async logout() {
    const response = await ApiService.post(`/admin/logout`);
    return response.data;
  }

  async refreshToken() {
    const response = await ApiService.post(`/admin/refresh-token`);
    return response.data;
  }
}

const AuthInstance = new Auth();
export default AuthInstance;
