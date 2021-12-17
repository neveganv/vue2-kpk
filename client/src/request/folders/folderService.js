import requestService from '../requestService';

const prefix = '/api/folder';

export default {
	async addFolder(params){
		const response = await requestService.post(`${prefix}/`, params)
		return response?.data
	},
	async getFolders(){
		const response = await requestService.post(`${prefix}/getAll`)
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

};
