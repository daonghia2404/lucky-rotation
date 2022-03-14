import ApiService from '@/services/api';

class ListRotation {
  async getList(params) {
    const response = await ApiService.get(`/admin/list-rotation`, { params });
    return response.data;
  }

  async update(body) {
    const response = await ApiService.post(`/admin/update-rotation`, body);
    return response.data;
  }
}

const ListRotationInstance = new ListRotation();
export default ListRotationInstance;
