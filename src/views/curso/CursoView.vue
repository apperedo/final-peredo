<template>
  <div>
    <Modal v-model:modelValue="showModalNuevo">
      <RegisterCursoView @on-register="onRegister"/>
    </Modal>
    <Modal v-model:modelValue="showModalEdit">
      <EditCursoView @on-update="onUpdate" :item="itemToEdit"/>
    </Modal>
    <h1>Lista de Cursos</h1>
    <button @click="showModalNuevo = true" class="btn btn-primary">Nuevo</button>
    <button @click="buscar" class="btn btn-lith" style="float:right">Buscar</button>
    <input type="search" style="float:right" v-model="textToSearch" @input="buscar"/>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Horario</th>
          <th>Días</th>
          <th>Precio</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemList" :key="index">
          <td>{{ 1 + index }}</td>
          <td>{{ item.nombre || 'No disponible' }}</td>
          <td>{{ item.horario || 'No disponible' }}</td>
          <td>{{ item.dias || 'No disponible' }}</td>
          <td>{{ item.precio || 'No disponible' }}</td>
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
import RegisterCursoView from './RegisterCursoView.vue'
import EditCursoView from './EditCursoView.vue'
import axios from 'axios'; // Asegúrate de importar axios

export default {
  name: 'Curso',
  data() {
    return {
      message: '',
      currentPage: 1,
      totalPages: 100, // Este valor debe ser calculado según tus datos
      showModalNuevo: false,
      showModalEdit: false,
      itemToEdit: null,
      textToSearch: '',
      itemList: []
    }
  },
  components: {
    Modal,
    RegisterCursoView,
    EditCursoView
  },
  methods: {
    ...mapActions(['increment']),
    async getList() {
      try {
        const apiUrl = `${this.baseUrl}/cursos?_embed=alumnos&q=${this.textToSearch}`;
        const response = await axios.get(apiUrl);
        console.log(response);
        this.itemList = response.data || [];
      } catch (error) {
        console.error('Error fetching data:', error);
        this.itemList = []; // Maneja el error y asegura que itemList es un array vacío
      }
    },
    edit(item) {
      this.itemToEdit = { ...item };
      this.showModalEdit = true;
    },
    async Eliminar(id) {
      if (confirm("¿Está seguro de eliminar el registro?")) {
        try {
          await axios.delete(`${this.baseUrl}/cursos/${id}`);
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
