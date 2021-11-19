import requestService from '../requestService';

const main = 'https://jsonplaceholder.typicode.com';
const prefix = '/users';

import axios from 'axios'
export default {
	async getClientsList(params) {
		const response = await requestService.get(`${main}${prefix}?_limit=`+ params);
		return response?.data
	},
};
