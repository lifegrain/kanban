<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
    <a class="navbar-brand" href="#">Kanban</a>

    <div class="d-flex" style="width: fit-content;" id="navbarSupportedContent">
      <div id="GSignIn" class="g-signin2" @done="onSignIn" v-show="view !== `main`"></div>
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
export default {
  props: [`view`],
  mounted() {
    gapi.signin2.render("GSignIn", {
      onsuccess: this.onSignIn
    });
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