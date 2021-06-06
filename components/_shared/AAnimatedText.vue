<template>
  <div>
    <p class="pointer">
      <span>{{ text }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
p {
  z-index: 5;
  text-transform: uppercase;
  background: #505050;
  letter-spacing: 0.5em;
  display: inline-block;
  border: 4px double rgba(255, 255, 255, 0.25);
  border-width: 4px 0;
  border-radius: 14px;
  padding: 1em 0em;
  width: 40em;
  margin: 0 auto;
}
p span {
  text-align: center;
  font: 700 3em/1 "Oswald", sans-serif;
  letter-spacing: 0;
  padding: 0.25em 0 0.325em;
  display: block;
  margin: 0 auto;
  text-shadow: 0 0 80px rgba(255, 255, 255, 0.5);
  /* Clip Background Image */
  background: url("/images/animated_text_fill.png") repeat-y;
  -webkit-background-clip: text;
  background-clip: text;
  /* Animate Background Image */
  -webkit-text-fill-color: transparent;
  -webkit-animation: aitf 80s linear infinite;
  /* Activate hardware acceleration for smoother animations */
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
}

/* Animate Background Image */
@-webkit-keyframes aitf {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>