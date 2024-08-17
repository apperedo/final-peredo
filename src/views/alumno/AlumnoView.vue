<template>
  <div>
    <Modal v-model:modelValue="showModalNuevo">
      <AlumnoNew @on-register="onRegister"/>
    </Modal>
    <Modal v-model:modelValue="showModalEdit">
      <AlumnoEdit @on-update="onUpdate" :item="itemToEdit"/>
    </Modal>
    <h1>Lista de Alumnos</h1>
    <button @click="showModalNuevo = true" class="btn btn-primary">Nuevo</button>
    <button @click="buscar" class="btn btn-lith" style="float:right">Buscar</button>
    <input type="search" style="float:right" v-model="textToSearch" @input="buscar"/>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Género</th>
          <th>Dirección</th>
          <th>Edad</th>
          <th>Curso</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemList" :key="index">
          <td>{{ 1 + index }}</td>
          <td>{{ item.nombre || 'No disponible' }}</td>
          <td>{{ item.genero || 'No disponible' }}</td>
          <td>{{ item.direccion || 'No disponible' }}</td>
          <td>{{ item.edad || 'No disponible' }}</td>
          <td>{{ item.curso ? item.curso.nombre : 'No disponible' }}</td>
          <td>
            <button @click="edit(item)" class="btn btn-dark" style="margin-right: 15px;">Editar</button>
            <button @click="Eliminar(item.id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import AlumnoNew from './AlumnoNewView.vue'
import AlumnoEdit from './AlumnoEditView.vue'
import axios from 'axios'; // Asegúrate de que axios está importado correctamente

export default {
  name: 'Alumno',
  data() {
    return {
      currentPage: 1,
      totalPages: 100,
      showModalNuevo: false,
      showModalEdit: false,
      itemToEdit: null,
      textToSearch: '',
      itemList: []
    }
  },
  components: {
    Modal,
    AlumnoNew,
    AlumnoEdit
  },
  methods: {
    ...mapActions(['increment']),
    async getList() {
      try {
        const apiUrl = `${this.baseUrl}/alumnos?_expand=curso&q=${this.textToSearch}`;
        const response = await axios.get(apiUrl);
        this.itemList = response.data || [];
      } catch (error) {
        console.error('Error fetching data:', error);
        this.itemList = [];
      }
    },
    edit(item) {
      this.itemToEdit = { ...item };
      this.showModalEdit = true;
    },
    async Eliminar(id) {
      if (confirm("¿Está seguro de eliminar el registro?")) {
        try {
          await axios.delete(`${this.baseUrl}/alumnos/${id}`);
          this.getList();
          this.$toast.show("Registro eliminado.", "danger");
        } catch (error) {
          console.error('Error deleting record:', error);
        }
      }
    },
    buscar() {
      this.getList();
    },
    onRegister() {
      this.getList();
      this.showModalNuevo = false;
      this.$toast.show('Registro exitoso', 'success');
    },
    onUpdate() {
      this.getList();
      this.showModalEdit = false;
      this.itemToEdit = null;
      this.$toast.show('Edición exitosa', 'info');
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl;
    }
  },
  mounted() {
    this.getList();
  }
}
</script>

<style></style>
