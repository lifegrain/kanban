<template>
  <div class="d-flex loginRegister">
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
        <label for="password">Password</label><BIconEyeFill class="h5" @click="show"></BIconEyeFill>
        <input
          v-model="loginForm.password"
          class="form-control"
          id="password"
          placeholder="Password"
          required
          :type="type"
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <button
        type="button"
        class="btn btn-primary float-right"
        @click="$emit(`page`,`register`)"
      >Register</button>
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
      },
      type: `password`
    };
  },
  props: [`view`],
  methods: {
    submit() {
      this.$emit(`login`, this.loginForm.email, this.loginForm.password);

      this.loginForm.email = ``;
      this.loginForm.password = ``;
    },
    show() {
      if (this.type === `password`) {
        this.type = `text`
      } else {
        this.type = `password`
      }
    }
  }
};
</script>