import requestService from '../requestService';

const prefix = '/api/position';

export default {
	async createPosition(params){
		const response = await requestService.post(`${prefix}/add`,params)
		return response?.data
	},
	async getAll(){
		const response = await requestService.post(`${prefix}/getAll`)
		return response?.data
	}
};