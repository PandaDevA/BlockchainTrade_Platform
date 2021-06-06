<template>
  <div class="captcha-container">
    <div id="captcha-spinner-wrapper">
      <a-spinner v-if="isLoading"/>
    </div>
    <div id="captchaSlider"></div>
    <div id="captchaMsg"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true
    };
  },
  mounted() {
    this.toggleLoading(true);
    setTimeout(() => {
      this.toggleLoading(false);
    }, 2000);
    this.$nextTick(() => this.initCaptcha());
  },
  methods: {
    toggleLoading(isLoading) {
      this.isLoading = isLoading;
    },
    initCaptcha() {
      "use strict";

      const that = this;

      const _createClass = (function() {
        function defineProperties(target, props) {
          for (let i = 0; i < props.length; i++) {
            let descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      (function(window) {
        let l = 42,
          r = 9,
          w = 310,
          h = 155,
          PI = Math.PI;
        let L = l + r * 2 + 3;

        function getRandomNumberByRange(start, end) {
          return Math.round(Math.random() * (end - start) + start);
        }

        function createCanvas(width, height) {
          let canvas = createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          return canvas;
        }

        function createImg(onload) {
          let img = createElement("img");
          img.crossOrigin = "Anonymous";
          img.onload = onload;
          img.onerror = function() {
            img.src = getRandomImg();
          };
          img.src = getRandomImg();
          return img;
        }

        function createElement(tagName, className) {
          let elment = document.createElement(tagName);
          elment.className = className;
          return elment;
        }
        //不支持element.classList方法的兼容写法（ie10及以下）
        if (!("classList" in document.documentElement)) {
          Object.defineProperty(HTMLElement.prototype, "classList", {
            get: function() {
              let self = this;
              function update(fn) {
                return function(value) {
                  let classes = self.className.split(/\s+/g),
                    index = classes.indexOf(value);

                  fn(classes, index, value);
                  self.className = classes.join(" ");
                };
              }

              return {
                add: update(function(classes, index, value) {
                  if (!~index) classes.push(value);
                }),

                remove: update(function(classes, index) {
                  if (~index) classes.splice(index, 1);
                }),

                toggle: update(function(classes, index, value) {
                  if (~index) classes.splice(index, 1);
                  else classes.push(value);
                }),

                contains: function(value) {
                  return !!~self.className.split(/\s+/g).indexOf(value);
                },

                item: function(i) {
                  return self.className.split(/\s+/g)[i] || null;
                }
              };
            }
          });
        }

        function addClass(tag, className) {
          tag.classList.add(className);
        }

        function removeClass(tag, className) {
          tag.classList.remove(className);
        }

        function getRandomImg() {
          return (
            "https://picsum.photos/300/150/?image=" +
            getRandomNumberByRange(0, 1084) +
            "&blur"
          );
        }

        function _draw(ctx, x, y, operation) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
          ctx.lineTo(x + l, y);
          ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
          ctx.lineTo(x + l, y + l);
          ctx.lineTo(x, y + l);
          ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
          ctx.lineTo(x, y);
          ctx.lineWidth = 2;
          ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
          ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
          ctx.stroke();
          ctx[operation]();
          ctx.globalCompositeOperation = "overlay";
        }

        function sum(x, y) {
          return x + y;
        }

        function square(x) {
          return x * x;
        }

        let jigsaw = (function() {
          function jigsaw(_ref) {
            let el = _ref.el,
              onSuccess = _ref.onSuccess,
              onFail = _ref.onFail,
              onRefresh = _ref.onRefresh;

            _classCallCheck(this, jigsaw);

            el.style.position = el.style.position || "relative";
            this.el = el;
            this.onSuccess = onSuccess;
            this.onFail = onFail;
            this.onRefresh = onRefresh;
          }

          _createClass(jigsaw, [
            {
              key: "init",
              value: function init() {
                this.initDOM();
                this.initImg();
                this.bindEvents();
              }
            },
            {
              key: "initDOM",
              value: function initDOM() {
                let canvas = createCanvas(w, h); // 画布
                let block = canvas.cloneNode(true); // 滑块
                let captchaSliderContainer = createElement(
                  "div",
                  "captchaSliderContainer"
                );
                let refreshIcon = createElement("div", "refreshIcon");
                let captchaSliderMask = createElement(
                  "div",
                  "captchaSliderMask"
                );
                let captchaSlider = createElement("div", "captchaSlider");
                let captchaSliderIcon = createElement(
                  "span",
                  "captchaSliderIcon"
                );
                let text = createElement("span", "captchaSliderText");
                let shine = createElement("div");
                shine.setAttribute("id", "shine");

                block.className = "block";
                text.innerHTML = "Slide to complete the puzzle";

                let el = this.el;
                el.appendChild(canvas);
                el.appendChild(refreshIcon);
                el.appendChild(block);
                el.appendChild(shine);
                captchaSlider.appendChild(captchaSliderIcon);
                captchaSliderMask.appendChild(captchaSlider);
                captchaSliderContainer.appendChild(captchaSliderMask);
                captchaSliderContainer.appendChild(text);
                el.appendChild(captchaSliderContainer);

                //20181113
                // 不支持assign方法的兼容写法
                if (typeof Object.assign != "function") {
                  // Must be writable: true, enumerable: false, configurable: true
                  Object.defineProperty(Object, "assign", {
                    value: function assign(target, varArgs) {
                      // .length of function is 2
                      "use strict";
                      if (target == null) {
                        // TypeError if undefined or null
                        throw new TypeError(
                          "Cannot convert undefined or null to object"
                        );
                      }

                      let to = Object(target);

                      for (let index = 1; index < arguments.length; index++) {
                        let nextSource = arguments[index];

                        if (nextSource != null) {
                          // Skip over if undefined or null
                          for (let nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (
                              Object.prototype.hasOwnProperty.call(
                                nextSource,
                                nextKey
                              )
                            ) {
                              to[nextKey] = nextSource[nextKey];
                            }
                          }
                        }
                      }
                      return to;
                    },
                    writable: true,
                    configurable: true
                  });
                }

                Object.assign(this, {
                  canvas: canvas,
                  block: block,
                  captchaSliderContainer: captchaSliderContainer,
                  refreshIcon: refreshIcon,
                  captchaSlider: captchaSlider,
                  captchaSliderMask: captchaSliderMask,
                  captchaSliderIcon: captchaSliderIcon,
                  text: text,
                  canvasCtx: canvas.getContext("2d"),
                  blockCtx: block.getContext("2d")
                });
              }
            },
            {
              key: "initImg",
              value: function initImg() {
                let _this = this;

                let img = createImg(function() {
                  _this.canvasCtx.drawImage(img, 0, 0, w, h);
                  _this.draw();
                  // _this.canvasCtx.drawImage(img, 0, 0, w, h);
                  _this.blockCtx.drawImage(img, 0, 0, w, h);
                  let y = _this.y - r * 2 - 1;

                  //getImageData方法和putImageData方法在IE9和IE10上，涉及到文件路径的跨域访问问题。
                  //   console.log('(x:'+_this.x+',y:'+_this.y+')');
                  if (navigator.userAgent.indexOf("MSIE") > -1) {
                    _this.block.style.marginLeft = "-" + (_this.x - 3) + "px"; //不抵边，空3px
                  } else {
                    let ImageData = _this.blockCtx.getImageData(
                      _this.x - 3,
                      y,
                      L,
                      L
                    );
                    _this.block.width = L;
                    _this.blockCtx.putImageData(ImageData, 0, y);
                  }
                });
                this.img = img;
              }
            },
            {
              key: "draw",
              value: function draw() {
                // 随机创建滑块的位置
                this.x = getRandomNumberByRange(L + 10, w - (L + 10));
                this.y = getRandomNumberByRange(10 + r * 2, h - (L + 10));
                _draw(this.canvasCtx, this.x, this.y, "fill");
                _draw(this.blockCtx, this.x, this.y, "clip");
              }
            },
            {
              key: "clean",
              value: function clean() {
                this.canvasCtx.clearRect(0, 0, w, h);
                this.blockCtx.clearRect(0, 0, w, h);
                this.block.width = w;
              }
            },
            {
              key: "bindEvents",
              value: function bindEvents() {
                let _this2 = this;

                this.el.onselectstart = function() {
                  return false;
                };
                this.refreshIcon.onclick = function() {
                  _this2.reset();
                  typeof _this2.onRefresh === "function" && _this2.onRefresh();
                };

                let originX = void 0,
                  originY = void 0,
                  trail = [],
                  isMouseDown = false;

                let handleDragStart = function handleDragStart(e) {
                  originX = e.clientX || e.touches[0].clientX;
                  originY = e.clientY || e.touches[0].clientY;
                  isMouseDown = true;
                };

                let handleDragMove = function handleDragMove(e) {
                  if (!isMouseDown) return false;
                  let eventX = e.clientX || e.touches[0].clientX;
                  let eventY = e.clientY || e.touches[0].clientY;
                  let moveX = eventX - originX;
                  let moveY = eventY - originY;
                  if (moveX < 0 || moveX + 38 >= w) return false;
                  _this2.captchaSlider.style.left = moveX + "px";
                  let blockLeft = ((w - 40 - 20) / (w - 40)) * moveX;
                  _this2.block.style.left = blockLeft + "px";

                  addClass(
                    _this2.captchaSliderContainer,
                    "captchaSliderContainer_active"
                  );
                  _this2.captchaSliderMask.style.width = moveX + "px";
                  trail.push(moveY);
                };

                let handleDragEnd = function handleDragEnd(e) {
                  if (!isMouseDown) return false;
                  isMouseDown = false;
                  let eventX = e.clientX || e.changedTouches[0].clientX;
                  if (eventX == originX) return false;
                  removeClass(
                    _this2.captchaSliderContainer,
                    "captchaSliderContainer_active"
                  );
                  _this2.trail = trail;

                  let _verify = _this2.verify(),
                    spliced = _verify.spliced,
                    verified = _verify.verified;

                  if (spliced) {
                    if (verified) {
                      addClass(
                        _this2.captchaSliderContainer,
                        "captchaSliderContainer_success"
                      );
                      typeof _this2.onSuccess === "function" &&
                        _this2.onSuccess();
                    } else {
                      addClass(
                        _this2.captchaSliderContainer,
                        "captchaSliderContainer_fail"
                      );
                      _this2.text.innerHTML = "再试一次";
                      _this2.reset();
                    }
                  } else {
                    addClass(
                      _this2.captchaSliderContainer,
                      "captchaSliderContainer_fail"
                    );
                    typeof _this2.onFail === "function" && _this2.onFail();
                    setTimeout(function() {
                      _this2.reset();
                    }, 1000);
                  }
                };
                this.captchaSlider.addEventListener(
                  "mousedown",
                  handleDragStart
                );
                this.captchaSlider.addEventListener(
                  "touchstart",
                  handleDragStart
                );
                document.addEventListener("mousemove", handleDragMove);
                document.addEventListener("touchmove", handleDragMove);
                document.addEventListener("mouseup", handleDragEnd);
                document.addEventListener("touchend", handleDragEnd);
              }
            },
            {
              key: "verify",
              value: function verify() {
                let arr = this.trail; // 拖动时y轴的移动距离
                let average = arr.reduce(sum) / arr.length;
                let deviations = arr.map(function(x) {
                  return x - average;
                });
                let stddev = Math.sqrt(
                  deviations.map(square).reduce(sum) / arr.length
                );
                let left = parseInt(this.block.style.left);
                return {
                  spliced: Math.abs(left - this.x) < 10,
                  verified: stddev !== 0 // 简单验证下拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作
                };
              }
            },
            {
              key: "reset",
              value: function reset() {
                this.captchaSliderContainer.className =
                  "captchaSliderContainer";
                this.captchaSlider.style.left = 0;
                this.block.style.left = 0;
                this.captchaSliderMask.style.width = 0;
                this.clean();
                this.img.src = getRandomImg();
              }
            }
          ]);

          return jigsaw;
        })();

        window.jigsaw = {
          init: function init(opts) {
            return new jigsaw(opts).init();
          }
        };
      })(window);

      jigsaw.init({
        el: document.getElementById("captchaSlider"),
        onSuccess: function() {
          that.$emit("onVerify", true);
          const shine = document.getElementById("shine");
          shine.classList.add("active");
          // document.getElementById("captchaMsg").innerHTML = "Verified";
        },
        onFail: cleanMsg,
        onRefresh: cleanMsg
      });
      function cleanMsg() {
        that.toggleLoading(true);
        const shine = document.getElementById("shine");
        shine.classList.remove("active");
        that.$emit("onVerify", false);
        document.getElementById("captchaMsg").innerHTML = "";
        setTimeout(() => {
          that.toggleLoading(false);
        }, 2000);
      }
    }
  }
};
</script>

<style >
#captcha-spinner-wrapper {
  position: absolute;
  width: 310px;
  height: 156px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.block {
  position: absolute;
  left: 0;
  top: 0;
}

.captchaSliderContainer {
  position: relative;
  text-align: center;
  width: 310px;
  height: 40px;
  line-height: 40px;
  margin-top: 15px;
  background: #f7f9fa;
  color: #45494c;
  border: 1px solid #e4e7eb;
}

.captchaSliderContainer_active .captchaSlider {
  height: 38px;
  top: -1px;
  border: 1px solid #1991fa;
}

.captchaSliderContainer_active .captchaSliderMask {
  height: 38px;
  border-width: 1px;
}

.captchaSliderContainer_success .captchaSlider {
  height: 38px;
  top: -1px;
  border: 1px solid #52ccba;
  background-color: #52ccba !important;
}

.captchaSliderContainer_success .captchaSliderMask {
  height: 38px;
  border: 1px solid #52ccba;
  background-color: #d2f4ef;
}

.captchaSliderContainer_success .captchaSliderIcon {
  background-position: 0 0 !important;
}

.captchaSliderContainer_fail .captchaSlider {
  height: 38px;
  top: -1px;
  border: 1px solid #f57a7a;
  background-color: #f57a7a !important;
}

.captchaSliderContainer_fail .captchaSliderMask {
  height: 38px;
  border: 1px solid #f57a7a;
  background-color: #fce1e1;
}

.captchaSliderContainer_fail .captchaSliderIcon {
  top: 14px;
  background-position: 0 -82px !important;
}
.captchaSliderContainer_active .captchaSliderText,
.captchaSliderContainer_success .captchaSliderText,
.captchaSliderContainer_fail .captchaSliderText {
  display: none;
}

.captchaSliderMask {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  border: 0 solid #1991fa;
  background: #d1e9fe;
}

.captchaSlider {
  position: absolute;
  top: -1px;
  left: 0;
  width: 40px;
  height: 40px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background 0.2s linear;
}

.captchaSlider:hover {
  background: #1991fa;
}

.captchaSlider:hover .captchaSliderIcon {
  background-position: 0 -13px;
}

.captchaSliderIcon {
  position: absolute;
  top: 15px;
  left: 13px;
  width: 14px;
  height: 12px;
  background: url(http://cstaticdun.126.net//2.6.3/images/icon_light.f13cff3.png)
    0 -26px;
  background-size: 34px 471px;
}

.refreshIcon {
  position: absolute;
  right: 0;
  top: 0;
  width: 34px;
  height: 34px;
  cursor: pointer;
  background: url(http://cstaticdun.126.net//2.6.3/images/icon_light.f13cff3.png)
    0 -437px;
  background-size: 34px 471px;
}

/* Shine */
#shine {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 156px;
  background: rgba(0, 158, 13, 0.4);
  position: absolute;
  transition: width 0.3s ease-in;
}
#shine.active {
  width: 310px;
}
</style>