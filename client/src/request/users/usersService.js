import requestService from '../requestService';

const prefix = '/users';

export default {
	async getClientsList(params = {}) {
		const response = await requestService.get(`${prefix}/list`, {
			...params,
		});
		return response?.data?.object;
	},
};
