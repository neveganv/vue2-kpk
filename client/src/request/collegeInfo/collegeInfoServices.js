import requestService from '../requestService';
const prefix = '/api/collegeInfo';

export default {
	async getAll(){
		const response = await requestService.post(`${prefix}`)
		return response?.data[0]
	},
	async update(id,params){
		const response = await requestService.put(`${prefix}/${id}`, params)
		return response?.data
	},
};
