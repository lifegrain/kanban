<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
  <a class="navbar-brand" href="#">Kanban</a>

  <div class="" style="width: fit-content;" id="navbarSupportedContent">
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
    methods: {
        logout() {
            localStorage.removeItem(`token`)
            this.$emit(`page`,`login`)
        }
    }
}
</script>