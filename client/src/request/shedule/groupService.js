import requestService from '../requestService';

const prefix = '/api/shedule/group';

export default {
	async createGroup(params){
		const response = await requestService.post(`${prefix}/addGroup`,params)
		return response?.data
	},
	async getAllGroups(){
		const response = await requestService.post(`${prefix}/getAllGroup`)
		return response?.data
	}
};