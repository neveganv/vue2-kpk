import requestService from '../requestService';
const prefix = '/api/collegeInfo';
const prefix2 = '/api/collegePhoto';

export default {
	async getAll(){
		const response = await requestService.get(`${prefix}`)
		return response?.data
	},
	async update(id,params){
		const response = await requestService.put(`${prefix}/${id}`, params)
		return response?.data
	},
	async createPhoto(params){
		const response = await requestService.post(`${prefix2}/createPhoto`, params)
		return response?.data
	},
	async getPhotos(){
		const response = await requestService.get(`${prefix2}`)
		return response?.data
	},
	async deletePhoto(params){
		const response = await requestService.post(`${prefix2}/deletePhoto`,params)
		return response?.data
	},
	
};
