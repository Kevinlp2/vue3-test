import {createRouter,createWebHistory} from 'vue-router'


const routes = [
  {
    path: '/',
    name:'Echats地图',
    component: ()=>import('@/views/Echarts-ditu'),
  },
  {
    path: '/animate',
    name:'Animate动画',
    component: ()=>import('@/views/Animate'),
  },
  {
    path: '/g6Mindmap',
    name:'mindMap',
    component: ()=>import('@/views/G6_mindmap'),
  },
];


const router = createRouter({
  history:createWebHistory(),
  routes
});



export default router