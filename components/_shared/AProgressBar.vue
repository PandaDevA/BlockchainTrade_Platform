<template>
  <div class="progress w-100">
    <div :style="{ width: `${percents}%`, backgroundColor }" class="progress-bar"></div>
  </div>
</template>

<script>
export default {
  props: {
    percents: {
      type: Number,
      required: true,
      validator: value => value <= 100 && value >= 0
    }
  },
  computed: {
    backgroundColor() {
      if (this.percents < 5) return "#f63a0f";
      else if (this.percents < 25) return "#f27011";
      else if (this.percents < 50) return "#f2b01e";
      else if (this.percents < 75) return "#f2d31b";
      else if (this.percents <= 100) return "#86e01e";
      else return "#f63a0f";
    }
  }
};
</script>

<style scoped>
.progress {
  padding: 4px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
}

.progress-bar {
  transition: width 1s ease;
  height: 16px;
  border-radius: 4px;
  background-image: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  background-image: -moz-linear-gradient(
    top,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  background-image: -o-linear-gradient(
    top,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  -webkit-transition: 0.4s linear;
  -moz-transition: 0.4s linear;
  -o-transition: 0.4s linear;
  transition: 0.4s linear;
  -webkit-transition-property: width, background-color;
  -moz-transition-property: width, background-color;
  -o-transition-property: width, background-color;
  transition-property: width, background-color;
  -webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25),
    inset 0 1px rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25),
    inset 0 1px rgba(255, 255, 255, 0.1);
}
</style>