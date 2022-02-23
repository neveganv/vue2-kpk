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
	async updateSpecialty(params){
		const response = await requestService.post(`${prefix}/updateSpecialty`, params)
		return response?.data
	},
	async getById(params){
		const response = await requestService.post(`${prefix}/getById`,params)
		return response?.data
	},
	async deleteSpecialty(params){
		const response = await requestService.post(`${prefix}/deleteSpecialty`, params)
		return response?.data
	},
};
