import requestService from '../requestService';
const prefix = '/api/partner';

export default {
	async addNewPartner(params){
		const response = await requestService.post(`${prefix}/addPartner`,params)
		return response?.data
	},
	async getAll(){
		const response = await requestService.post(`${prefix}/getAllPartner`)
		return response?.data
	},
	async deletePartner(id){
		const response = await requestService.delete(`${prefix}/deletePartner/` + id)
		return response?.data
	},
};
