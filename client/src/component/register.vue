<template>
  <div class="d-flex loginRegister">
    <form @submit.prevent="submit" class="Form">
      <h3>Register</h3>
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          v-model="registerForm.email"
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
          v-model="registerForm.password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
      <button
        type="button"
        class="btn btn-primary float-right"
        @click="$emit(`page`, `login`)"
      >Login</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      registerForm: {
        email: ``,
        password: ``
      }
    };
  },
  props: [`view`],
  methods: {
    submit() {
      this.$emit(
        `register`,
        this.registerForm.email,
        this.registerForm.password
      );

      this.registerForm.email = ``;
      this.registerForm.password = ``;
    }
  }
};
</script>