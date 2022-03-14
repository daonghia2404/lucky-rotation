import ApiService from '@/services/api';

class Config {
  async getConfig(params) {
    const response = await ApiService.get(`/admin/get-config`, { params });
    return response.data;
  }

  async updateConfig(body) {
    const response = await ApiService.post(`/admin/update-config`, body);
    return response.data;
  }
}

const ConfigInstance = new Config();
export default ConfigInstance;
