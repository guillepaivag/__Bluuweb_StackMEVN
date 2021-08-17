<template>
  <div class="container">
    <h1>NOTAS</h1>

    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.colorBody"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      <p>{{ mensaje.texto }}</p>
      Se cierra en {{ dismissCountDown }} segundos
      <b-progress
        :variant="mensaje.colorBar"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>

    <hr>

    <form v-on:submit.prevent="agregarNota()" v-if="add">
        <h3>Nueva nota:</h3>
        <input type="text" class="form-control my-3" name="nombre" v-model="nota.nombre" placeholder="Nombre">
        <input type="text" class="form-control my-3" name="descripcion" v-model="nota.descripcion" placeholder="Descripcion">
        <button
        type="submit"
            class="btn btn-outline-info btn-block"
        >
            Agregar
        </button>
    </form>

    <form v-on:submit.prevent="editarNota()" v-else>
        <h3>Editar nota:</h3>
        <input type="text" class="form-control my-3" name="nombre" v-model="nota.nombre" placeholder="Nombre">
        <input type="text" class="form-control my-3" name="descripcion" v-model="nota.descripcion" placeholder="Descripcion">
        <button
            type="submit"
            class="btn btn-outline-success btn-block"
        >
            Guardar cambios
        </button>
        <button
            class="btn btn-outline-danger btn-block"
            v-on:click="add = true"
        >
            Cancelar
        </button>
    </form>

    <hr>

    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripción</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-secondary" v-for="(notaFor, index) in notas" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ notaFor.nombre }}</td>
          <td>{{ notaFor.descripcion }}</td>
          <td>
            <button
              type="button"
              v-on:click="insertarDatosParaEditarNota(notaFor._id)"
              class="btn btn-outline-success m-1"
            >
              Editar
            </button>
            <button type="button" class="btn btn-outline-danger m-1" v-on:click="eliminarNota(notaFor._id)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            notas: [],
            dismissSecs: 5,
            dismissCountDown: 0,
            mensaje: {
                texto: "",
                colorBody: "",
                colorBar: ""
            },
            nota: {
                _id: '',
                nombre: '',
                descripcion: ''
            },
            add: true
        };
    },
    created() {
            this.listarNotas();
    },
    methods: {
        listarNotas() {
          this.axios
            .get('/nota')
            .then(res => {
                console.log(res.data);
                this.notas = res.data;
            })
            .catch(error => {
                console.log(error.response);
            });
        },
        agregarNota(){
            console.log(this.nota)
            this.axios.post('/nueva-nota', {
              nombre: this.nota.nombre,
              descripcion: this.nota.descripcion
            })
            .then(res => {
                console.log(res.data)
                this.notas.push(res.data)
                this.nota.nombre = ''
                this.nota.descripcion = ''

                this.alerta('Se agrego una nota nueva', 'success', 'success')
            })
            .catch(error => {
                this.alerta('Hubo un problema', 'danger', 'danger')
                console.log(error.response);
            })
        },
        eliminarNota(_id){
          console.log(_id)
          this.axios.delete(`/nota/${_id}`)
          .then(res => {
            const indexElim = this.notas.findIndex(nota => res.data._id === nota._id)
            this.notas.splice(indexElim, 1)
            this.alerta('Se a eliminado una nota', 'success', 'success')
          })
          .catch(error => {
            console.log(error.response);
          })
        },
        insertarDatosParaEditarNota(_id){
          console.log(_id)
          this.add = false
          this.nota._id = _id
          this.axios.get(`/nota/${_id}`)
          .then(res => {
            this.nota.nombre = res.data.nombre
            this.nota.descripcion = res.data.descripcion
          })
        },
        editarNota(){
          console.log('editado: ' + this.nota._id + this.nota.nombre + this.nota.descripcion)
          this.axios.put(`/nota/${this.nota._id}`, {
            nombre: this.nota.nombre,
            descripcion: this.nota.descripcion
          }).then(res => {
            const indexEdit = this.notas.findIndex(nota => res.data._id === nota._id)
            this.notas[indexEdit].nombre = res.data.nombre
            this.notas[indexEdit].descripcion = res.data.descripcion
            this.alerta('Se a actualizado una nota', 'success', 'success')
          }).catch(error => {
            console.log(error.response)
          })

          this.nota.nombre = ''
          this.nota.descripcion = ''

          this.add = true
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs;
        },
        alerta(texto, colorBody, colorBar) {
            this.mensaje.texto = texto;
            this.mensaje.colorBody = colorBody;
            this.mensaje.colorBar = colorBar;

            this.showAlert();
        }
    }
};
</script>

<style>
</style>