<template>
  <div class="cadastro">
    <form @submit.prevent="grava()">
      <h1 class="centralizado">Cadastro de Usuário</h1>

      <div class="controle">
        <label for="nome">Nome</label>
        <input required type="text" name="nome" id="nome" v-model="user.name" placeholder="Digite Nome" />
      </div>

      <div class="controle">
        <label for="email">Email</label>
        <input required type="email" name="email" id="email" v-model="user.email" placeholder="Digite Email" />
      </div>

      <div class="controle">
        <label for="senha">Senha</label>
        <input required type="password" name="senha" id="senha" v-model="user.password" placeholder="Digite Senha" />
      </div>

      <div class="centralizado">
        <router-link :to="{ name: 'login' }">
          <button>Voltar</button>
        </router-link>
        
          <button type="submit">Salvar</button>
        
      </div>
    </form>
  </div>
</template>

<script>


import api from "../../services/api";
import User from '../../domain/user/User';

export default {

    data(){

        return {
            user: new User()
        }
    },

    methods: {

        grava(){ 
            api
                .post("/users", this.user)
                .then(() => {
                  this.user = new User();
                  this.$router.push({ name: 'login' });}
                  , err => alert(err.response.data.error));
        }

    }
};
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
        width: 40%;
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