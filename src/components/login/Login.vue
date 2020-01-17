<template>
  <div class="cadastro">
    <form @submit.prevent="login()">
      <h1 class="centralizado">Login</h1>

      <div class="controle">
        <label for="email">Email</label>
        <input required type="email" v-model="form.email" name="email" id="email" placeholder="Digite Email" />
      </div>

      <div class="controle">
        <label required for="senha">Senha</label>
        <input type="password" v-model="form.password" name="senha" id="senha" placeholder="Digite Senha" />
      </div>

      <div class="centralizado">
        
          <button type="submit">Login</button>
        
        <router-link :to="{ name: 'cadastro' }">
          <button>Cadastrar Usuário</button>
        </router-link>

      </div>
    </form>

  </div>
</template>

<script>

import api from '../../services/api';

export default {
  
  data(){
    return {
      form:{
        email: '',
        password: '',
      }
    }
  }, 

  methods: {

    login(){
      api
          .post("/sessions", this.form)
          .then(response => {
            localStorage.setItem('usuario', JSON.stringify(response.data.user));
            localStorage.setItem('token', JSON.stringify(response.data.token));
            this.$router.push({ name: 'upload' });
          }, err => alert(err.response.data.error));
    }
  },

  mounted() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  }

}
</script>

<style scoped>

    button{
        margin-top: 30px;
    }

    .centralizado {
        text-align: center;
    }

    .cadastro {
        background-color: white;
        border-radius: 20px;
        margin: auto;
        margin-top: 50px;
        width: 30%;
        padding: 30px;
    }

    .controle {
        font-size: 1.2em;
        margin-bottom: 20px;
    }

    .controle label + input{
        width: 100%;
    }
</style>