import { mapActions, mapGetters } from 'vuex';

export default{
    async mounted() {
		this.getUser();
		console.log(123)
	},
	methods: {
		...mapActions(['getUser']),
	},
	computed: {
		...mapGetters(['AllUser']),
	},
}