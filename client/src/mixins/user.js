import { mapActions, mapGetters } from 'vuex';

export default{
    async mounted() {
		this.getUser();
	},
	methods: {
		...mapActions(['getUser']),
	},
	computed: {
		...mapGetters(['AllUser']),
	},
}