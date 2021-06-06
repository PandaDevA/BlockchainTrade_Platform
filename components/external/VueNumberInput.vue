<template>
  <div
    class="number-input"
    :class="{
      'number-input--inline': inline,
      'number-input--center': center,
      'number-input--controls': controls,
      [`number-input--${size}`]: size,
    }"
    v-on="listeners"
  >
    <button
      v-if="controls"
      class="number-input__button number-input__button--minus"
      type="button"
      :disabled="isMaxZero || disabled || readonly || !decreasable"
      @click="decrease"
    />
    <input
      ref="input"
      class="number-input__input"
      type="number"
      :name="name"
      :value="currentValue"
      :min="min"
      :max="max"
      :step="step"
      :readonly="readonly || !inputtable"
      :disabled="isMaxZero || disabled || (!decreasable && !increasable)"
      :placeholder="placeholder"
      autocomplete="off"
      @change="change"
    >
    <button
      v-if="controls"
      class="number-input__button number-input__button--plus"
      type="button"
      :disabled="isMaxZero || disabled || readonly || !increasable"
      @click="increase"
    />
  </div>
</template>

<script>
import { get } from "lodash";
import BigNumber from "bignumber.js";
const isNaN = Number.isNaN || window.isNaN;
const REGEXP_NUMBER = /^-?(?:\d+|\d+\.\d+|\.\d+)(?:[eE][-+]?\d+)?$/;
const REGEXP_DECIMALS = /\.\d*(?:0|9){10}\d*$/;
const normalizeDecimalNumber = (value, times = 100000000000) =>
  REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;

export default {
  name: "NumberInput",

  model: {
    event: "input"
  },

  props: {
    center: Boolean,
    controls: Boolean,
    disabled: Boolean,

    inputtable: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Number,
      default: 8
    },

    inline: Boolean,

    max: {
      type: Number,
      default: Infinity
    },

    min: {
      type: Number,
      default: 0
    },

    name: {
      type: String,
      default: undefined
    },

    placeholder: {
      type: String,
      default: undefined
    },

    readonly: Boolean,
    rounded: Boolean,

    size: {
      type: String,
      default: undefined
    },

    step: {
      type: Number,
      default: 1
    },

    value: {
      type: [Number, String],
      default: NaN
    }
  },
  data() {
    return {
      currentValue: 0
    };
  },

  computed: {
    isMaxZero() {
      return +this.max === 0;
    },
    /**
     * Indicate if the value is increasable.
     * @returns {boolean} Return `true` if it is decreasable, else `false`.
     */
    increasable() {
      const num = this.currentValue;

      return isNaN(num) || num < this.max;
    },

    /**
     * Indicate if the value is decreasable.
     * @returns {boolean} Return `true` if it is decreasable, else `false`.
     */
    decreasable() {
      const num = this.currentValue;

      return isNaN(num) || num > this.min;
    },

    /**
     * Filter listeners
     * @returns {Object} Return filtered listeners.
     */
    listeners() {
      const listeners = { ...this.$listeners };

      delete listeners.change;
      delete listeners.input;

      return listeners;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        if (
          // Avoid triggering change event when created
          !(isNaN(newValue) && typeof oldValue === "undefined") &&
          // Avoid infinite loop
          newValue !== this.currentValue
        ) {
          this.setValue(newValue);
        }
      }
    },
    currentValue: {
      immediate: true,
      handler(newValue, oldValue) {
        if (+newValue >= this.max) this.setValue(this.max);
        if (+newValue < this.min) this.setValue(this.min);
      }
    }
  },

  methods: {
    preventKeyPress(event) {
      let val = event.target.value;
      // if (val >= this.max || val < this.min) {
      //   event.preventDefault();
      //   this.setValue(this.max);
      // }
      // if (val < this.min) {
      //   event.preventDefault();
      //   this.setValue(this.min);
      // }

      if (
        this.valueDecimals(val) >= this.fixed ||
        val >= this.max ||
        val < this.min
      ) {
        event.preventDefault();
      }
    },
    valueDecimals(val) {
      if (val.toString().indexOf(".") === -1) return 0;
      return parseFloat(val.toString().split(".")[1].length);
    },
    /**
     * Change event handler.
     * @param {string} value - The new value.
     */
    change(event) {
      let val = event.target.value;
      if (+val > this.max) this.setValue(this.max);
      else this.setValue(val);
    },

    /**
     * Input event handler.
     * @param {string} value - The new value.
     */
    input(event) {
      let val = event.target.value;
      if (+val > this.max) this.setValue(this.max);
      else this.setValue(val);
    },

    /**
     * Decrease the value.
     */
    decrease() {
      if (this.decreasable) {
        const val = this.currentValue;
        let num = new BigNumber(val);
        this.setValue(num.minus(+this.step).toNumber());
      }
    },

    /**
     * Increase the value.
     */
    increase() {
      if (this.increasable) {
        const val = this.currentValue;
        let num = new BigNumber(val);
        this.setValue(num.plus(+this.step).toNumber());
      }
    },

    /**
     * Set new value and dispatch change event.
     * @param {number} value - The new value to set.
     */
    setValue(value) {
      const oldValue = this.currentValue;
      let newValue = this.scientificToDecimal(value) || 0;
      if (this.min <= this.max) {
        const normalized = Math.min(this.max, Math.max(this.min, newValue));
        newValue = this.scientificToDecimal(normalized) || 0;
      }

      this.currentValue = newValue;
      if (newValue === oldValue && get(this.$refs, "input.value")) {
        // Force to override the number in the input box (#13).
        this.$refs.input.value = newValue;
      }
      this.$emit("change", newValue, oldValue);
      this.$emit("input", newValue, oldValue);
    }
  }
};
</script>

<style lang="css" scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.number-input {
  display: block;
  font-size: 0;
  max-width: 100%;
  overflow: hidden;
  position: relative;
}
.number-input__button {
  background-color: #fff;
  border: 0;
  border-radius: 0.25rem;
  bottom: 1px;
  position: absolute;
  top: 1px;
  width: 2.5rem;
  z-index: 1;
}
.number-input__button:focus {
  outline: none;
}
.number-input__button:hover::before,
.number-input__button:hover::after {
  background-color: #0074d9;
}
.number-input__button:disabled {
  opacity: 0.65;
}
.number-input__button:disabled::before,
.number-input__button:disabled::after {
  /* background-color: #ddd; */
  background-color: #808080;
}
.number-input__button::before,
.number-input__button::after {
  background-color: #111;
  content: "";
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: background-color 0.15s;
}
.number-input__button::before {
  height: 1px;
  width: 50%;
}
.number-input__button::after {
  height: 50%;
  width: 1px;
}
.number-input__button--minus {
  border-bottom-right-radius: 0;
  border-right: 1px solid #ddd;
  border-top-right-radius: 0;
  left: 1px;
}
.number-input__button--minus::after {
  visibility: hidden;
}
.number-input__button--plus {
  border-bottom-left-radius: 0;
  border-left: 1px solid #ddd;
  border-top-left-radius: 0;
  right: 1px;
}
.number-input__input {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  display: block;
  font-size: 1rem;
  line-height: 1.5;
  max-width: 100%;
  min-height: 1.5rem;
  min-width: 3rem;
  padding: 0.4375rem 0.875rem;
  transition: border-color 0.15s;
  width: 100%;
}
.number-input__input::-webkit-outer-spin-button,
.number-input__input::-webkit-inner-spin-button {
  appearance: none;
}
.number-input__input:focus {
  border-color: #0074d9;
  outline: none;
}
.number-input__input:disabled,
.number-input__input[readonly] {
  background-color: #f8f8f8;
}
.number-input--inline {
  display: inline-block;
}
.number-input--inline > input {
  display: inline-block;
  width: 12.5rem;
}
.number-input--center > input {
  text-align: center;
}
.number-input--controls > input {
  padding-left: 3.375rem;
  padding-right: 3.375rem;
}
.number-input--small > input {
  border-radius: 0.1875rem;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
}
.number-input--small.number-input--inline > input {
  width: 10rem;
}
.number-input--small.number-input--controls > button {
  width: 2rem;
}
.number-input--small.number-input--controls > input {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}
.number-input--large > input {
  border-radius: 0.3125rem;
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
}
.number-input--large.number-input--inline > input {
  width: 15rem;
}
.number-input--large.number-input--controls > button {
  width: 3rem;
}
.number-input--large.number-input--controls > input {
  padding-left: 4rem;
  padding-right: 4rem;
}
</style>
