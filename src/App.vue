<template>
  <Menu>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <router-link to="/alumno">Alumnos</router-link>
    <router-link to="/curso">Cursos</router-link>
  </Menu>
  <router-view/>
</template>

<script>
import Menu from './components/Menu.vue';

export default {
  name:'App',
  data(){
    return{
    }
  },
  components:{
    Menu
  }
}
</script>

<style lang="scss">

</style>
