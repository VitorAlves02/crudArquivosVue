import UploadArquivo from './components/upload/UploadArquivo.vue';
import Cadastro from './components/cadastro/Cadastro.vue';
import Login from './components/login/Login.vue';

export const routes = [
    {path: '', name: 'login', component: Login},
    {path: '/cadastro', name: 'cadastro', component: Cadastro},
    {path: '/upload', name: 'upload', component: UploadArquivo},
];