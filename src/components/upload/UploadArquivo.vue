<template>
  <div>
    
    <br>

    <h1 class="centralizado">{{ this.user.name }}</h1>

    <router-link :to="{ name: 'login' }"><button>Voltar</button></router-link>

    <div class="centralizado upload">
      
      <form @submit.prevent="submitFiles()">

        <div class="controle">
          <label for="">Categoria do arquivo</label>
          <input required type="text" name="nameDoc" id="nameDoc" v-model="document.name" placeholder="Digite Categoria do arquivo" />
        </div>

        <br>

        <label>
          File
          <input type="file" id="files" ref="files" multiple v-on:change="handleFileUpload()" />
        </label>
        <br>
        <br>
        <progress max="100" :value.prop="uploadPercentage"></progress>
        <p>{{ this.uploadPercentage }} %</p>

        <p v-show="!this.contemArquivo"  style="color:red">{{ mensagemAviso }}</p>

        <button style="outline:none">Submit</button>
      
      </form>
    </div>


    <div class="upload" v-if="documentos != ''" >
      <div class="listagemDoc" v-for="(documento, i) of documentos" :key='i' id="listagem" >
        <ul>
          <h2>{{ documento.name }}</h2>
          <br>
          <li v-for="(file, j) of documento.file" :key="j">
            <a :href="file.url" target="_blank">{{ file.name }}</a>
          </li>
        </ul>
        <button @click="remove(documento)">Apagar</button>
      </div>
       
    </div>

  </div>
</template>

<script>
import api from '../../services/api'
import CategoriaDoc from "../../domain/categoriaDocumento/CategoriaDoc"

export default {
  data() {
    return {
      document: new CategoriaDoc(),
      files: "",
      uploadPercentage: 0,
      user: "",
      contemArquivo: true,
      mensagemAviso: "",
      documentos: [],
      currentPage: 1,
      perPage: 5,
    };
  },

  methods: {
    submitFiles() {
      let formData = new FormData();

      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i]; 
        formData.append("file", file);
      }

      formData.append("name", this.document.name);

      api.post("/documents", formData, {
          headers: {
            "Content-Type": "multipart/form-data",        
          },
          
          onUploadProgress: function( progressEvent ) {
            this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ));
          }.bind(this)
        })
        .then(()=> {
          this.mensagemAviso = "Enviado com sucesso!"
          this.uploadPercentage = 0;
          document.getElementById("files").value = "";
          this.listDocuments();
        })
        .catch(err => {
          this.uploadPercentage = 0;
          this.mensagemAviso = 'Erro!'
          if(this.files == ''){
            this.mensagemAviso = 'Insira um arquivo!'
          }
        });
    },

    handleFileUpload() {
      this.files = this.$refs.files.files;
    },

    listDocuments(){
      api.get("/documents")
      .then(response =>{
        this.documentos = response.data;
      })
      .catch((err) =>{
        console.log(err.response.data.error);
      })
    },

    remove(documento) {
      
      if(confirm("Confirmar operação?")){
        api.delete(`/documents/${documento.id}`)
        .then(() => {
          let indice = this.documentos.indexOf(documento);
          this.documentos.splice(indice, 1);
          
          }, err => {
          console.log(err);
          
        });
      }  

    }
  },

  mounted() {
    const usuario = localStorage.getItem('usuario');
    this.user = JSON.parse(usuario);
    const auth = localStorage.getItem('token');

    api.defaults.headers.Authorization = `Bearer ${JSON.parse(auth)}`;
    this.listDocuments();
  },

  

  watch: {
    mensagemAviso :function(){
      
      this.contemArquivo = false;
      var self = this;
      setTimeout(function() {
        self.mostraMensagem = true;
        self.mensagemAviso = '';
      }, 1000);
    }
  },

  computed: {
      rows() {
        return this.documentos.length;
      }
    }

};
</script>

<style>

  .centralizado {
    text-align: center;
  }

  ul{
    list-style-type: none;
  }

  .upload{
    padding: 10px;
    background-color: white;
    border-radius: 20px;
    width: 50%;
    margin: auto;
    margin-top: 30px;
    padding-top: 40px;
  }

  .paginacao{
    margin: auto;
    width: 50%;
    display: flex;
    justify-content: center;
  }

  .listagemDoc{ 
    margin-bottom: 30px;
    border-bottom: 3px solid #E6E6FA;
  }

  li{
    padding-bottom: 30px;
  }

  a{
    color: blue;
    text-decoration: none;
    outline: none;
  }

  a:visited{
    text-decoration: none;
    color: blue;
  }

  a:hover{
    text-decoration: none;
    color: black
  }


</style>