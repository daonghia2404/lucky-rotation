import ApiService from '@/services/api';

class ListWallet {
  async getList(params) {
    const response = await ApiService.get(`/admin/list-wallet`, { params });
    return response.data;
  }
}

const ListWalletInstance = new ListWallet();
export default ListWalletInstance;
