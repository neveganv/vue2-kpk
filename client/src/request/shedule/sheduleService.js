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
		return response?.data.result[0]
	},
	async deleteEvent(params){
		const response = await requestService.delete(`${prefix}/${params.id}`,)
		return response?.data.result[0]
	},
	async dublicateEvents(params){
		const response = await requestService.get(`${prefix}/copy`, {
			params:params
		})
		return response?.data
	}

};