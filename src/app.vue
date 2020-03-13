<template>
  <div id="app">
    <navbar :view="view" @page="page" @googleSignIn="google"></navbar>
    <div class="content">
      <alert :error="alert"></alert>
      <login v-if="view === `login`" @login="login" @page="page"></login>
      <register v-if="view === `register`" @register="register" @page="page"></register>
      <kanban v-if="view === `main`" @error="error" @page="page"></kanban>
    </div>
  </div>
</template>
<script>
import login from "./component/login";
import alert from "./component/alert";
import register from "./component/register";
import kanban from "./component/main";
import navbar from "./component/navbar";
import axios from "axios";

const server = `https://kanban-h8-1584088116232.web.app/`;

export default {
  data() {
    return {
      view: null,
      alert: {
        status: false,
        code: null,
        msg: []
      }
    };
  },
  created() {
    if (localStorage.token) {
      this.view = `main`;
    } else {
      this.view = `login`;
    }
  },
  components: {
    login,
    alert,
    register,
    navbar,
    kanban
  },
  methods: {
    page(current) {
      this.alert.status = false
      this.view = current;
    },
    login(email, password) {
      this.alert.status = false;

      axios({
        url: `${server}/users/login`,
        method: `post`,
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.token = data.token;

          this.view = `main`;
        })
        .catch(err => {
          this.alert.status = true;
          this.alert.code = err.response.data.status_code;
          this.alert.msg = err.response.data.status_message;
        });
    },
    register(email, password) {
      this.alert.status = false;

      axios({
        url: `${server}/users/register`,
        method: `post`,
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.token = data.token;

          this.view = `main`;
        })
        .catch(err => {
          error(err);
        });
    },
    error(err) {
      this.alert.status = true;
      this.alert.code = err.response.data.status_code;
      this.alert.msg = err.response.data.status_message;
    },
    google(id_token) {
      axios({
        url: `${server}/users/googleSignIn`,
        method: `post`,
        data: {
          id_token
        }
      })
        .then(({ data }) => {
          localStorage.token = data.token
          this.page(`main`)
        })
        .catch(err => {
          this.error(err);
        });
    }
  }
};
</script>