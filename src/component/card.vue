<template>
  <div class="d-flex bg-light my-1 rounded task justify-content-between">
    <div class="text-break">{{data.title}}</div>
    <div class="neatButtons">
      <BIconPencil class="h5" @click="$emit(`edit`, data)"></BIconPencil>
      <BIconTrashFill class="h5" @click="$emit(`delete`, data.id)"></BIconTrashFill>
    </div>
  </div>
</template>
<script>
export default {
  props: [`data`]
};
</script>