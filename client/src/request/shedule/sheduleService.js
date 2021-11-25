import requestService from '../requestService';

const prefix = '/api/shedule';

export default {
	async createEvent(params){
		const response = await requestService.post(`${prefix}/addEvent`,params)
		return response?.data
	},
	async getEvent(){
		const response = await requestService.post(`${prefix}/getEvent`)
		return response?.data
	}
};