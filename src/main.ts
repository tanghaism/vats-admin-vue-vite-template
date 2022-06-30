import { createApp } from 'vue';
import Antd, { message, Modal, notification } from 'ant-design-vue';
import App from './App.vue';

window.$message = message;
window.$modal = Modal;
window.$notification = notification;

createApp(App).use(Antd).mount('#app');
