import { update } from '../../../../server/controller/news.controller';
import requestService from '../requestService';
import axios from 'axios'
import { deleteUser } from '../../../../server/controller/user.controller';

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
	},
	async getOne(token){
		axios.defaults.headers.common['token'] = token
		const response = await requestService.post(`${prefix}/getUser`, {headers: {token: token}})
		return response?.data
	},
	async login(params){
		const response = await requestService.post(`${prefix}/login`,params)
		return response?.data
	},
	async update(params){
		const response = await requestService.post(`${prefix}/update`, params)
		return response?.data
	},
	async changePassword(params){
		const response = await requestService.post(`${prefix}/changePassword`, params)
		return response?.data
	},
	async deleteUser(params){
		const response = await requestService.post(`${prefix}/deleteUser`, params) 
	}

};
