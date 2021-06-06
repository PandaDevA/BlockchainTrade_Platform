import Vue from "vue";
import VueScrollTo from "vue-scrollto";
import VuePromiseBtn from "vue-promise-btn";
import Vuelidate from "vuelidate";
import VueGoogleCharts from "vue-google-charts";
import "vue-promise-btn/dist/vue-promise-btn.css";
import Notifications from "vue-notification";
import Tooltip from "vue-directive-tooltip";
import "vue-directive-tooltip/css/index.css";
import SmartTable from "vuejs-smart-table";
import BigNumber from "bignumber.js"; // https://github.com/MikeMcl/bignumber.js/
import moment from "moment";
import { get } from 'lodash';

// GLOBAL VUE
Vue.filter("maxThreeDecimals", function (value) {
  if (Number.isInteger(+value)) return value;
  return parseFloat(value).toFixed(3);
});
Vue.mixin({
  data() {
    return {
      notificationDuration: 6000
    };
  },
  methods: {
    notifySuccess(title = 'Saved successfully') {
      this.$notify({
          type: "success",
          title: title,
          duration: this.notificationDuration
        });
    },
    notifyError(title = 'Something went wrong') {
      this.$notify({
          type: "error",
          title: title,
          duration: this.notificationDuration
        });
    },
    secondsRemaining() {
      const eventdate = this.timeByTimeZone(
        "Mar 15, 2019 21:00:00",
        "Europe/Berlin"
      );
      const todaysdate = moment();
      return eventdate.diff(todaysdate, "seconds");
    },
    timeByTimeZone(time, timeZone) {
      const momentTZ = require("moment-timezone");
      return momentTZ.tz(time, timeZone);
    },
    dynamicStep(dynamicVal, defaultVal = 0.01) {
      const dynamicValString = dynamicVal.toString();
      const haveDecimals = dynamicValString.includes(".");
      if (!haveDecimals) return defaultVal;

      const decimals = dynamicValString.split(".")[1];
      const maxDecimals = decimals.length - 1;
      const zeros = new Array(maxDecimals).fill(0).join("");
      const stepString = "0." + zeros + "1";
      return parseFloat(stepString);
    },
    humanDate(date, format) {
      return moment(date).format(format);
    },
    restrictSpecialChars(e) {
      const val = e.target.value;
      const key = e.key;
      const regex = RegExp('[@0-9a-zA-Z]');
      if (regex.test(key) && val.length <= 30) return true;
      e.preventDefault();
    },
    calculateMax(num1, num2) {
      if (num1 === 0) return 0;
      if (num2 == 0) return 1000000;

      const max = parseFloat(num1 / num2);
      if (max <= 0) return 0;
      return parseFloat(max);
    },
    getPagesFromToRange(amount, page) {
      const to = page * amount;
      const from = to - amount + 1;

      return `${from} - ${to}`;
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    displayError(message, error) {
      error.showError = false;
      error.message = message;
      error.showError = true;
    },
    openModal(e) {
      this.$refs[e].isOpen = true;
    },
    imageFromBlob(image) {
      return (
        "data:image/jpeg;base64," +
        btoa(
          new Uint8Array(image).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        )
      );
    },
    toFixedSmall(number, fixed = 8) {
      number = this.scientificToDecimal(+number);
      const str = number.toString();
      if (str.indexOf(".") !== -1) {
        const splitted = str.split(".");
        const decimals = splitted[1].length;
        let result;
        result = new BigNumber(number).toFixed(
          decimals <= fixed ? decimals : fixed
        );
        return result;
      } else {
        return number;
      }
    },
    calculateBigNumber(val1, val2, operation) {
      let num = new BigNumber(this.scientificToDecimal(val1));
      switch (operation) {
        case "add":
          return this.toFixedSmall(num.plus(val2).toNumber(), 8);
        case "substract":
          return this.toFixedSmall(num.minus(val2).toNumber(), 8);
        case "multiply":
          return val1 === 0 || val2 === 0
            ? 0
            : this.toFixedSmall(num.times(val2).toNumber(), 8);
        case "divide":
          return val1 === 0 || val2 === 0
            ? 0
            : this.toFixedSmall(num.dividedBy(val2).toNumber(), 8);
      }
    },
    scientificToDecimal(num) {
      const sign = Math.sign(num);
      //if the number is in scientific notation remove it
      if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
        const zero = "0";
        const parts = String(num)
          .toLowerCase()
          .split("e"); //split into coeff and exponent
        const e = parts.pop(); //store the exponential part
        let l = Math.abs(e); //get the number of zeros
        const direction = e / l; // use to determine the zeroes on the left or right
        const coeff_array = parts[0].split(".");

        if (direction === -1) {
          coeff_array[0] = Math.abs(coeff_array[0]);
          num = zero + "." + new Array(l).join(zero) + coeff_array.join("");
        } else {
          const dec = coeff_array[1];
          if (dec) l = l - dec.length;
          num = coeff_array.join("") + new Array(l + 1).join(zero);
        }
      }

      if (sign < 0) {
        num = -num;
      }

      return num;
    },
    amountPercents(amount, max) {
      const percents = ((amount * 100) / max).toFixed(2);
      return amount === 0 || Number.isNaN(percents) ? 0 : percents;
    },
    amountPercentsWithMin(min, amount, max) {
      const percents = ((amount * 100) / max).toFixed(2);
      return amount === 0 || Number.isNaN(percents) ? 0 : percents;
    },
    countDecimals(val) {
      if (val.toString().indexOf(".") === -1) return 0;
      return parseFloat(val.toString().split(".")[1].length);
    },
    upperCaseFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    safeGet(el, path) {
      console.log(get(el, path));
      return get(el, path)
    }
  }
});

Vue.use(VueScrollTo, {
  // https://www.npmjs.com/package/vue-scrollto
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});
Vue.use(VuePromiseBtn); // https://stukh.github.io/vue-promise-btn/
Vue.use(Vuelidate); // https://monterail.github.io/vuelidate/
Vue.use(VueGoogleCharts); // https://github.com/devstark-com/vue-google-charts?ref=madewithvuejs.com
Vue.use(Notifications); // https://github.com/euvl/vue-notification
Vue.use(Tooltip); // https://hekigan.github.io/vue-directive-tooltip/
Vue.use(SmartTable); // https://tochoromero.github.io/vuejs-smart-table/#installation
