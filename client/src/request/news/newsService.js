import requestService from '../requestService';

const prefix = '/api/news';
const prefix2 = '/api/newsCategory';

export default {

	async addSimpleNew(params){
		const response = await requestService.post(`${prefix}/add`,params)
		return response?.data
	},
	async getAllNews(){
		const response = await requestService.post(`${prefix}/getAllNews`)
		return response?.data
	},
	async addSimpleNewCategory(params){
		const response = await requestService.post(`${prefix2}/addCategory`,params)
		return response?.data
	},
	async getSimpleNewsCategories(){
		const response = await requestService.post(`${prefix2}/getAll`)
		return response?.data
	},
	async updateSimpleNews(params){
		const response = await requestService.post(`${prefix}/update`, params)
		return response?.data 
	},
	async deleteSimpleNews(params){
		const response = await requestService.post(`${prefix}/deleteNews`, params)
		return response?.data
	},
	async getSimpleNewsByCategories(params){
		const response = await requestService.post(`${prefix}/getByCategory`, params)
		return response?.data 
	},
	async getSimpleNewsById(params){
		const response = await requestService.post(`${prefix}/getNewsById`, params)
		return response?.data
	   
	}
};
