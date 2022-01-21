import {createRouter,createWebHistory} from 'vue-router'


const routes = [
  {
    path: '/',
    component: ()=>import('@/views/Animate'),
  },
  {
    path: '/test',
    component: ()=>import('@/views/Test'),
  },
];


const router = createRouter({
  history:createWebHistory(),
  routes
});



export default router