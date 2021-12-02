import requestService from '../requestService';

const prefix = '/api/specialty';

export default {

	async addSpecialty(params){
		const response = await requestService.post(`${prefix}/addSpecialty`,params)
		return response?.data
	},
	async getAllSpecialty(){
		const response = await requestService.post(`${prefix}/getAllSpecialty`)
		return response?.data
	},

};
