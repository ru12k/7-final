import Vue from 'vue';
import Router from 'vue-router';
import Views from '@/components/Views';

Vue.use(Router);

const profile = JSON.parse(localStorage.getItem('profile'));
const name = profile.nickname ? profile.nickname : '';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Views',
      component: Views,
      // params: { username: name },
    },
  ],
});
