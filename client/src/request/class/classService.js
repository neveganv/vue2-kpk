import requestService from '../requestService';

const prefix = '/api/class';

export default {
	async createClasses(params){
		const response = await requestService.post(`${prefix}/addClass`,params)
		return response?.data
	},
	async getAllClasses(){
		const response = await requestService.post(`${prefix}/getAll`)
		return response?.data
	}
};