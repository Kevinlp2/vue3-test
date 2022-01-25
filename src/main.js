import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import 'animate.css/animate.min.css' //引入动画
import * as echarts from 'echarts' //引入Echarts

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import '@/assets/css/common.css'
import * as ElIconModules from '@element-plus/icons-vue'

let app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(store);

app.config.globalProperties.$echarts = echarts;

// 统一注册el-icon图标
for(let iconName in ElIconModules) {
  app.component(iconName, ElIconModules[iconName])
}

app.mount('#app');
