import requestService from '../requestService';

const prefix = '/api/prepareCourse';

export default {
	async sendRequest(params){
		const response = await requestService.post(`${prefix}/add`,params)
		return response?.data
	},
	async getAllPrepare(){
		const response = await requestService.post(`${prefix}/getAllPrepareCourse`)
		return response?.data
	},
	async getPrepareCourseById(params){
		const response = await requestService.post(`${prefix}/getPrepareCourseById`,params)
		return response?.data
	},
	async updateCourse(params){
		const response = await requestService.post(`${prefix}/update`,params)
		return response?.data
	},
};