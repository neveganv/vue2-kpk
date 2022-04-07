import requestService from '../requestService';

const prefix = '/api/page';

export default {

	async addPage(params){
		const response = await requestService.post(`${prefix}/addPage`,params)
		return response?.data
	},
	async getPages(){
		const response = await requestService.get(`${prefix}/getAllPage`)
		return response?.data
	},
	async getOne(params){
		const response = await requestService.get(`${prefix}/getByIdPage`, params)
		return response?.data
	},
	async update(id, params){
		const response = await requestService.put(`${prefix}/${id}`, params)
		return response?.data
	},
	async delete(id){
		const response = await requestService.delete(`${prefix}/${id}`)
		return response?.data
	},
	async deletePdf(idPage, params){
		console.log(params)
		const response = await requestService.post(`${prefix}/deletePdf/${idPage}`, params)
		return response?.data
	},
};
