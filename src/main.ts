// windi
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
// ant-design
import 'ant-design-vue/dist/antd.less';
import '@/design/index.less';

import App from './App.vue';
import { createApp } from 'vue';

async function bootstrap() {
    const app = createApp(App);
    app.mount('#tinymic-vue-plugin');
}

bootstrap();
