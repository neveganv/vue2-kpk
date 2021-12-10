import requestService from '../requestService';

const prefix = '/api/page';

export default {

	async addPage(params){
		const response = await requestService.post(`${prefix}/addPage`,params)
		return response?.data
	},
	async getPages(){
		const response = await requestService.post(`${prefix}/getAllPage`)
		return response?.data
	},
	async getOne(params){
		const response = await requestService.post(`${prefix}/getById`, params)
		return response?.data
	},
};
