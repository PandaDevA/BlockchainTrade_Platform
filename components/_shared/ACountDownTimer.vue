<template>
  <div>
    <div v-if="expired">
      <div class="w-col-12 px-4 pt-2 aos-init aos-animate">
        <p class="text-red px-4 unit-time text-center">{{ expiredMessage }}</p>
      </div>
    </div>
    <div v-else>
      <ul v-if="main" id="countdown" class="w-col-12 aos-init aos-animate">
        <li class="chart days-chart" data-percent="0">
          <span id="days">{{days}}</span>Days
          <canvas height="95" width="95"></canvas>
        </li>
        <li class="chart hours-chart" data-percent="0">
          <span id="hours">{{hours}}</span>Hours
          <canvas height="95" width="95"></canvas>
        </li>
        <li class="chart minutes-chart" data-percent="0">
          <span id="minutes">{{minutes}}</span>Minutes
          <canvas height="95" width="95"></canvas>
        </li>
        <li class="chart seconds-chart" data-percent="0">
          <span id="seconds">{{seconds}}</span>Seconds
          <canvas height="95" width="95"></canvas>
        </li>
      </ul>
      <div v-else class="container">
        <div class="days">
          <div id="days" class="number-time">{{ days }}</div>
          <p class="unit-time">days</p>
        </div>
        <div class="days">
          <div id="hours" class="number-time">{{ hours }}</div>
          <p class="unit-time">hours</p>
        </div>
        <div class="days">
          <div id="minutes" class="number-time">{{ minutes }}</div>
          <p class="unit-time">minutes</p>
        </div>
        <div class="days">
          <div id="seconds" class="number-time">{{ seconds }}</div>
          <p class="unit-time">seconds</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    startTime: {
      default: Date.now()
    },
    endTime: {
      required: true
    },
    main: {
      type: Boolean,
      default: false
    },
    expiredMessage: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      timer: "",
      start: "",
      end: "",
      interval: "",
      days: "",
      minutes: "",
      hours: "",
      seconds: "",
      message: "",
      statusType: "",
      statusText: "",
      expired: false
    };
  },
  mounted() {
    const startTime = this.timeByTimeZone(this.startTime, "Europe/Berlin");
    const endTime = this.timeByTimeZone(this.endTime, "Europe/Berlin");
    this.start = new Date(startTime).getTime();
    this.end = new Date(endTime).getTime();
    // Update the count down every 1 second
    this.timerCount(this.start, this.end);
    this.interval = setInterval(() => {
      this.timerCount(this.start, this.end);
    }, 1000);
  },
  methods: {
    timerCount: function(start, end) {
      // Get todays date and time
      const now = new Date().getTime();

      // Find the distance between now an the count down date
      const distance = start - now;
      const passTime = end - now;

      if (distance < 0 && passTime < 0) {
        this.expired = true;
        this.$emit("onExpired");
        clearInterval(this.interval);
        return;
      } else if (distance < 0 && passTime > 0) this.calcTime(passTime);
      else if (distance > 0 && passTime > 0) this.calcTime(distance);
    },
    calcTime: function(dist) {
      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
    }
  }
};
</script>

<style scoped>
#countdown {
  position: relative;
  text-align: center;
  color: #e7f7f5;
  font-family: "Helvetica Neue", "Arial";
  font-size: 30px;
  font-weight: 100;
  letter-spacing: 1px;
  line-height: 1;
  flex: 0 0 100%;
  padding: 0;
  margin-bottom: 40px;
}

#countdown a {
  display: block;
  margin-bottom: 1em;
  color: #e7f7f5;
  text-decoration: none;
}

#countdown a:last-of-type {
  font-size: 0.9em;
}

#countdown a:hover {
  text-decoration: underline;
}

#countdown .chart {
  display: inline-block;
  width: 95px;
  height: 95px;
  margin: 0 10px;
  vertical-align: top;
  position: relative;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-top: 22px;
}

.chart span {
  display: block;
  font-size: 2em;
  font-weight: normal;
}

.chart canvas {
  position: absolute;
  left: 0;
  top: 0;
}

@media (max-width: 767px) {
  #countdown .chart {
    margin: 0 10px 15px;
  }
  #countdown {
    padding: 0;
    margin-top: 30px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    min-height: 1000px;
  }
  .wrap.hero {
    padding-top: 0;
  }
}
</style>