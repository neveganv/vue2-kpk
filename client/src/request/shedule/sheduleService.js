import requestService from '../requestService';

const prefix = '/api/shedule';

export default {
	async createEvent(params){
		const response = await requestService.post(`${prefix}/addEvent`,params)
		return response?.data
	},
	async getEvent(params){
		const response = await requestService.post(`${prefix}/getEvent`,params)
		return response?.data
	},
	async updateEvent(params){
		const response = await requestService.post(`${prefix}/updateEvent`, params)
		return response?.data
	},
	async getEventById(params){
		const response = await requestService.post(`${prefix}/findEventById`, params)
		console.log(response?.data[0])
		return response?.data[0]
	}
};