import { mapActions, mapGetters } from 'vuex';
import * as actionTypes from '@/store/modules/loader/types/actions';
import * as getterTypes from '@/store/modules/loader/types/getters';

export default {
  methods: {
    ...mapActions('loader', {
      setLoading: actionTypes.SET_LOADING,
    }),
  },
  computed: {
    ...mapGetters('loader', {
      isLoading: getterTypes.IS_LOADING,
    }),
  },
};
