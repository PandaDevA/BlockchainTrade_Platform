<template>
  <div class="pop-up-register" @click.self="isOpen = false" :class="{ open: isOpen }">
    <div class="form-wrapper w-clearfix">
      <div @click="isOpen = false" class="close-button w-100" data-ix="pop-up-register-close">
        <img src="/images/close_w.svg" alt class="menu-icon">
      </div>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  }
};
</script>

<style scoped>
.open {
  display: flex;
  opacity: 1;
}
.pop-up-register {
  z-index: 99999;
}
</style>