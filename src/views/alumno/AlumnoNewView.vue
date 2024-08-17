<template>
  <div>
    <h1>Registrar Alumno</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="curso">Curso:</label>
        <select id="curso" v-model="form.cursoId" :class="{ 'is-invalid': errors.cursoId }">
          <option :value="curso.id" v-for="(curso, index) in cursoList" :key="`curso-${index}`">
            {{ curso.nombre }}
          </option>
        </select>
        <div v-if="errors.cursoId" class="invalid-feedback">{{ errors.cursoId }}</div>
      </div>

      <div class="form-group">
        <label for="name">Nombre alumno:</label>
        <input type="text" id="name" v-model="form.nombre" :class="{ 'is-invalid': errors.nombre }" placeholder="Ingrese el nombre" />
        <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
      </div>

      <div class="form-group">
        <label for="genero">Género:</label>
        <select id="genero" v-model="form.genero" :class="{ 'is-invalid': errors.genero }">
          <option :value="genero" v-for="(genero, index) in generoList" :key="`genero-${index}`">{{ genero }}</option>
        </select>
        <div v-if="errors.genero" class="invalid-feedback">{{ errors.genero }}</div>
      </div>

      <div class="form-group">
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" v-model="form.direccion" :class="{ 'is-invalid': errors.direccion }" placeholder="Ingrese la dirección" />
        <div v-if="errors.direccion" class="invalid-feedback">{{ errors.direccion }}</div>
      </div>

      <div class="form-group">
        <label for="edad">Edad:</label>
        <input type="number" id="edad" v-model="form.edad" :class="{ 'is-invalid': errors.edad }" placeholder="Ingrese la edad" />
        <div v-if="errors.edad" class="invalid-feedback">{{ errors.edad }}</div>
      </div>
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import axios from 'axios'; // Asegúrate de importar axios

export default {
  name: 'AlumnoNew',
  data() {
    return {
      cursoList: [],
      generoList: ["F", "M"],
      form: {
        nombre: '',
        genero: '',
        direccion: '',
        edad: '',
        cursoId: null
      },
      errors: {}
    };
  },
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.nombre) {
        this.errors.nombre = 'El nombre es obligatorio.';
      }

      if (!this.form.genero) {
        this.errors.genero = 'El género es obligatorio.';
      }

      if (!this.form.direccion) {
        this.errors.direccion = 'La dirección es obligatoria.';
      }

      if (!this.form.edad) {
        this.errors.edad = 'La edad es obligatoria.';
      }

      if (!this.form.cursoId) {
        this.errors.cursoId = 'El curso es obligatorio.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        this.save();
      }
    },

    save() {
      const vm = this;
      this.axios.post(`${this.baseUrl}/alumnos`, this.form)
        .then(function (response) {
          if (response.status === 201) { // Comparación numérica
            vm.$emit('on-register', response.data);
          }
        })
        .catch(function (error) {
          console.error('Error saving data:', error);
        });
    },

    getCursoList() {
      const vm = this;
      this.axios.get(`${this.baseUrl}/cursos`)
        .then(function (response) {
          vm.cursoList = response.data;
        })
        .catch(function (error) {
          console.error('Error fetching courses:', error);
        });
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
    this.getCursoList(); // Llama al método con el nombre corregido
  }
}
</script>

<style scoped></style>
