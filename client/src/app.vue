<template>
  <div id="app">
    <alert :error="alert"></alert>
    <login :view="view" @login="login" @page="page"></login>
    <register :view="view" @register="register" @page="page"></register>
  </div>
</template>
<script>
import login from "./component/login";
import alert from "./component/alert";
import register from "./component/register";
import axios from "axios";

const server = `http://localhost:3000`;

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
    register
  },
  methods: {
    page(current) {
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
          this.alert.status = true;
          this.alert.code = err.response.data.status_code;
          this.alert.msg = err.response.data.status_message;
        });
    }
  }
};
</script>