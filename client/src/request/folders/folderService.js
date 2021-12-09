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

};
