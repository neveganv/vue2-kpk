import * as getterTypes from './types/getters';

export default {
	[getterTypes.GET_USER]: state => {
		return state.user;
	},
	[getterTypes.GET_PERMISSIONS]: state => {
		const isOwner = () => state?.user?.position === 'admin';
		const isNewsEditor = () => state?.user?.position === 'redaktor_novyn';
		const isSheduleEditor = () => state?.user?.position === 'redaktor_rozkladu';
		const isSpecialitiesEditor = () => state?.user?.position === 'redaktor_spetsialnostei';
		return {
			owner: isOwner(),
			can_edit_news: isNewsEditor() || isOwner(),
			can_edit_shedule: isSheduleEditor() || isOwner(),
			can_edit_specialities: isSpecialitiesEditor() || isOwner(),
			can_edit_prepareCourse:  isOwner(),
		};
	},
};
