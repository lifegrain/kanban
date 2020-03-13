<template>
  <div class="alert alert-danger" v-show="error.status">
    <p>Error Code: {{error.code}}</p>
    <p>{{alertMsg}}</p>
  </div>
</template>
<script>
export default {
  props: [`error`],
  computed: {
    alertMsg() {
      return this.error.msg.join(`, `);
    }
  }
};
</script>