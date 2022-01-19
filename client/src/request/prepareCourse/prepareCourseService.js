import requestService from '../requestService';

const prefix = '/api/prepareCourse';

export default {
	async sendRequest(params){
		const response = await requestService.post(`${prefix}/add`,params)
		return response?.data
	},
};