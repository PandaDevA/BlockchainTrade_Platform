<template>
  <section>
    <div class="site-wrapper">
      <div style="padding-top: 0; min-height: 800px;" class="hero-section">
        <div id="particles-js"></div>
        <div id="banner" class="d-flex justify-center uppercase f-wrap w-100 py-3">
          <h1 class="w-100 text-center m-none">Buy FLX now and get 100% fee share!</h1>
          <h1 class="text-center m-none">Register now to buy FLX</h1>
        </div>
        <div id="hero" class="wrap hero">
          <div class="d-flex f-wrap justify-center w-100">
            <div class="d-flex mt-4">
              <div class="col-s">
                <div class="hero3-text-wrapper">
                  <div class="hero3-headline-wrap">
                    <h1 class="heading">Time to get your investments to the next level!</h1>
                    <div class="text-20 text-20-60">Folex – Future Of Trading</div>
                  </div>
                  <div>
                    <div class="hero3-firstbutton-wrap">
                      <a @click="openModal('register')" class="btn w-button">Start Now</a>
                    </div>
                    <a
                      href="https://www.youtube.com/watch?v=5xzhHNoYa3w"
                      target="_blank"
                      class="btn-outline-transparent w-button"
                    >View Demo Video</a>
                  </div>
                </div>
              </div>
              <div class="col-wr col-wr-last">
                <img src="/images/logo-head-p-500.png" class="logo-right">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <a-table-last-update/>
    </div>
    <home-folex-coin id="folex-coin"></home-folex-coin>
    <home-coins id="coins"></home-coins>
    <home-features id="more"></home-features>
    <home-partners id="partners"></home-partners>
    <register-modal ref="register"/>
  </section>
</template>

<script>
import HomeFolexCoin from "@/components/_sections/index/HomeFolexCoin";
import HomeCoins from "@/components/_sections/index/HomeCoins";
import HomeFeatures from "@/components/_sections/index/HomeFeatures";
import HomePartners from "@/components/_sections/index/HomePartners";
import RegisterModal from "@/components/_shared/RegisterModal";
import ATableLastUpdate from "@/components/_shared/ATableLastUpdate";
import AAnimatedText from "@/components/_shared/AAnimatedText";
import ACountDownTimer from "@/components/_shared/ACountDownTimer";
import moment from "moment";

export default {
  head() {
    return {
      title: "Main | Folex"
    };
  },
  components: {
    HomeFolexCoin,
    HomeCoins,
    HomeFeatures,
    HomePartners,
    RegisterModal,
    ATableLastUpdate,
    AAnimatedText,
    ACountDownTimer
  },
  mounted() {
    this.loadParticles();
  },
  computed: {},
  methods: {
    loadParticles() {
      particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: { value: "#ffffff" },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            },
            polygon: {
              nb_sides: 5
            },
            image: {
              src: "img/github.svg",
              width: 100,
              height: 100
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
  }
};
</script>

<style scoped>
#banner {
  position: absolute;
  top: 110px;
  background-color: rgba(232, 232, 232, 0.7);
  color: #ff4f00;
}

#banner h1 {
  font-size: 50px;
}

.table-wrapper {
  position: relative;
  margin-top: 85px;
  margin-bottom: 65px;
}
#hero {
  z-index: 5;
  padding-top: 140px;
}
.account-wrapper a {
  cursor: pointer;
}
#particles-js {
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #111212;
  background-image: linear-gradient(45deg, #ec045d, #eda55d);
  background-position: 50% 100%, 0px 0px;
  background-size: contain, auto;
  background-repeat: no-repeat, repeat;
  background-attachment: fixed, scroll;
}
canvas {
  display: block;
  vertical-align: bottom;
}
</style>
