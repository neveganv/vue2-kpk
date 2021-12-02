import requestService from '../requestService';

const prefix = '/api/page';

export default {

	async addPage(params){
		const response = await requestService.post(`${prefix}/addPage`,params)
		return response?.data
	},
	async getAllPage(){
		const response = await requestService.post(`${prefix}/getAllPage`)
		return response?.data
	},

};
