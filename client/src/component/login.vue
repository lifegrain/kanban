<template>
  <div
    class="d-flex"
    style="justify-content: center; align-items: center; height: 100%;"
    v-if="view === `login`"
  >
    <form @submit.prevent="submit" class="Form">
      <h3>Login</h3>
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          v-model="loginForm.email"
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="loginForm.password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <button type="button" class="btn btn-primary float-right" @click="$emit(`page`,`register`)">Register</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        email: ``,
        password: ``
      }
    };
  },
  props: [`view`],
  methods: {
    submit() {
      this.$emit(`login`, this.loginForm.email, this.loginForm.password)

      this.loginForm.email = ``
      this.loginForm.password = ``
    }
  }
};
</script>