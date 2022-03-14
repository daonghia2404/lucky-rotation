import ApiService from '@/services/api';

class User {
  async getAll(params) {
    const response = await ApiService.get(`/admin/list-user`, { params });
    return response.data;
  }

  async create(body) {
    const response = await ApiService.post(`/admin/save-user`, body);
    return response.data;
  }

  async update(id, body) {
    const response = await ApiService.post(`/admin/save-user`, { id, ...body });
    return response.data;
  }

  async delete(id, user_code) {
    const response = await ApiService.post(`/admin/remove-user`, { id, user_code });
    return response.data;
  }
}

const UserInstance = new User();
export default UserInstance;
