import requestService from '../requestService';

const main = 'https://jsonplaceholder.typicode.com';
const prefix = '/api/user';

export default {
	async getClientsList(params) {
		const response = await requestService.get(`${main}${prefix}?_limit=`+ params);
		return response?.data
	},
	async addNewUser(params){
		const response = await requestService.post(`${prefix}/add`,params)
		return response?.data
	},
	async getAll(){
		const response = await requestService.post(`${prefix}/getAll`)
		return response?.data
	}
};
