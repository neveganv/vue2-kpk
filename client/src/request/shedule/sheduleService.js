import requestService from '../requestService';

const prefix = '/api/shedule';

export default {
	async createEvent(params){
		const response = await requestService.post(`${prefix}/addEvent`,params)
		return response?.data
	},
	async getAllEvent(){
		const response = await requestService.post(`${prefix}/getAllEvent`)
		return response?.data
	}
};