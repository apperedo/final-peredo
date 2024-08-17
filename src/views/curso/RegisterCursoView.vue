<template>
  <div>
    <h1>Registrar Curso</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="form.nombre" :class="{ 'is-invalid': errors.nombre }" placeholder="Ingrese el nombre" />
        <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
      </div>

      <div class="form-group">
        <label for="horario">Horario:</label>
        <select id="horario" v-model="form.horario" :class="{ 'is-invalid': errors.horario }">
          <option :value="horario" v-for="(horario, index) in horarioList" :key="`horario-${index}`">{{ horario }}</option>
        </select>
        <div v-if="errors.horario" class="invalid-feedback">{{ errors.horario }}</div>
      </div>

      <div class="form-group">
        <label for="dias">Días:</label>
        <select id="dias" v-model="form.dias" :class="{ 'is-invalid': errors.dias }">
          <option :value="dias" v-for="(dias, index) in diasList" :key="`dias-${index}`">{{ dias }}</option>
        </select>
        <div v-if="errors.dias" class="invalid-feedback">{{ errors.dias }}</div>
      </div>

      <div class="form-group">
        <label for="precio">Precio:</label>
        <input type="text" id="precio" v-model="form.precio" :class="{ 'is-invalid': errors.precio }" placeholder="Ingrese el precio" />
        <div v-if="errors.precio" class="invalid-feedback">{{ errors.precio }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'RegisterCurso',
  data() {
    return {
      form: {
        nombre: '',
        horario: '',
        dias: '',
        precio: ''
      },
      errors: {},
      horarioList: [
        "15:00-16:00",
        "16:00-17:00",
        "17:00-18:00"
      ],
      diasList: [
        "lu,mi,vi",
        "ma,ju"
      ]
    };
  },
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.nombre) {
        this.errors.nombre = 'El nombre es obligatorio.';
      }

      if (!this.form.horario) {
        this.errors.horario = 'El horario es obligatorio.';
      }

      if (!this.form.dias) {
        this.errors.dias = 'Los días son obligatorios.';
      }

      if (!this.form.precio) {
        this.errors.precio = 'El precio es obligatorio.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        this.save();
        this.form = {
          nombre: '',
          horario: '',
          dias: '',
          precio: ''
        };
      }
    },

    save() {
      const vm = this;
      this.axios.post(`${this.baseUrl}/cursos`, this.form)
        .then(function (response) {
          if (response.status === 201) {
            vm.$emit('on-register', response.data);
          }
          console.log(response);
        })
        .catch(function (error) {
          console.error('Error registering course:', error);
        });
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl;
    }
  }
}
</script>

<style scoped></style>
