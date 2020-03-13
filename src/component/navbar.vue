<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
    <a class="navbar-brand" href="#">Kanban</a>

    <div class="d-flex" style="width: fit-content;" id="navbarSupportedContent">
      <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSignIn" v-if="view !== `main`"></GoogleLogin>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#" v-if="view !== `main`" @click="$emit(`page`,`login`)">Login</a>
          <a class="nav-link" href="#" v-else @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import GoogleLogin from "vue-google-login";

export default {
  props: [`view`],
  data() {
    return {
      params: {
        client_id: "726483685281-blhivbkt5b9m8rqcpkqs5qto9ms50mn3.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        height: 30,
        longtitle: true
      }
    };
  },
  components: {
    GoogleLogin
  },
  methods: {
    logout() {
      localStorage.removeItem(`token`);
      // google sign out
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });

      this.$emit(`page`, `login`);
    },
    onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      this.$emit(`googleSignIn`, id_token);
    }
  }
};
</script>