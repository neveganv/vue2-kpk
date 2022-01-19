import requestService from '../requestService';
const prefix = '/api/entrantInfo';

export default {
	async getAll(){
		const response = await requestService.post(`${prefix}`)
		return response?.data
	},
	async update(id, params){
		const response = await requestService.put(`${prefix}/${id}`, params)
		return response?.data
	},
};
