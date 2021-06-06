<template>
  <a @click.prevent="clicked" :class="buttonClass" :style="css">
    <slot/>
  </a>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: "orange"
    },
    size: {
      type: String,
      required: false,
      default: "" // small, medium, large
    },
    type: {
      type: String,
      required: false,
      default: "" // table
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    css: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    }
  },
  computed: {
    buttonClass() {
      return `${this.size === "auto" ? "" : "btn"} ${
        this.disabled ? "disabled" : ""
      } ${this.color} ${this.size} ${
        this.type === "table" ? "table light-grey" : ""
      }`;
    }
  },
  methods: {
    clicked(event) {
      if (this.disabled) return;
      this.$emit("click", event);
    }
  }
};
</script>

<style scoped>
a {
  cursor: pointer;
  transition: color 0.2s ease 0s, box-shadow 0.2s ease 0s,
    background-color 0.2s ease 0s, transform 0.4s ease 0s,
    -webkit-transform 0.4s ease 0s;
}

.medium {
  margin: 0px;
  padding: 5px 20px;
  font-size: 12px;
  height: 32px;
}

.small-icon {
  margin: 0 2px;
  padding: 0 8px;
  font-size: 12px;
  height: 24px;
}

/* Table buttons */
.table {
  width: 100px;
  border: 1px solid #505050;
  color: #505050;
}

/* Colors */
.orange {
  background-color: #eda55d;
}
.dark-orange {
  background-color: #af753c;
}
.green {
  background-color: #009e0d;
}
.red {
  background-color: #e64f56;
}
.transparent {
  background-color: transparent;
}
.grey {
  background-color: #707070;
}

/* Disabled */
.disabled,
.disabled:hover {
  background-color: #b0b0b0;
}
</style>