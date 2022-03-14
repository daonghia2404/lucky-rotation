import ApiService from '@/services/api';

class HistoryRotation {
  async getList(params) {
    const response = await ApiService.get(`/admin/history-rotation`, { params });
    return response.data;
  }
}

const HistoryRotationInstance = new HistoryRotation();
export default HistoryRotationInstance;
