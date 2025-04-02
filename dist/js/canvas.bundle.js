/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((module) => {

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}
function distance(x1, y1, x2, y2) {
  //calculates distance between 2 points on XY plane
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
  var rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };
  return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
  var xVelocityDiff = particle.dx - otherParticle.dx;
  var yVelocityDiff = particle.dy - otherParticle.dy;
  var xDist = otherParticle.x - particle.x;
  var yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    var angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

    // Store mass in var for better readability in collision equation
    var m1 = particle.mass;
    var m2 = otherParticle.mass;

    // Velocity before equation
    var u1 = rotate({
      x: particle.dx,
      y: particle.dy
    }, angle);
    var u2 = rotate({
      x: otherParticle.dx,
      y: otherParticle.dy
    }, angle);

    // Velocity after 1D collision equation
    var v1 = {
      x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
      y: u1.y
    };
    var v2 = {
      x: u2.x * (m2 - m1) / (m1 + m2) + u1.x * 2 * m1 / (m1 + m2),
      y: u2.y
    };

    // Final velocity after rotating axis back to original location
    var vFinal1 = rotate(v1, -angle);
    var vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.dx = vFinal1.x;
    particle.dy = vFinal1.y;
    otherParticle.dx = vFinal2.x;
    otherParticle.dy = vFinal2.y;
  }
}
module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance,
  rotate: rotate,
  resolveCollision: resolveCollision
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
var particles;
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};
var colors = ["#2185C5", "#7ECEFD", "#FF7F66"];
var randomRadius = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomIntFromRange)(25, 25);

// Event Listeners
addEventListener("mousemove", function (e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

// Objects
var Particle = /*#__PURE__*/function () {
  function Particle(x, y, radius, color) {
    _classCallCheck(this, Particle);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.mass = 2; //resolve collision needs mass
    this.opacity = 0;
    this.dx = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomIntFromRange)(-4, 4);
    this.dy = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomIntFromRange)(-4, 4);
  }
  _createClass(Particle, [{
    key: "draw",
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.save();
      c.globalAlpha = this.opacity;
      c.fillStyle = this.color;
      c.fill();
      c.restore();
      c.strokeStyle = this.color;
      c.stroke();
      c.closePath();
    }
  }, {
    key: "update",
    value: function update(particleArr) {
      this.draw();

      //collision detection
      for (var i = 0; i < particleArr.length; i++) {
        if (this === particleArr[i]) continue; // "jumps over" one iteration in the loop.
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.distance)(this.x, this.y, particleArr[i].x, particleArr[i].y) - this.radius * 2 < 0) {
          (0,_utils__WEBPACK_IMPORTED_MODULE_0__.resolveCollision)(this, particleArr[i]);
        }
      }
      if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
        this.dy = -this.dy;
      }

      //mouse collision detection
      if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.distance)(this.x, this.y, mouse.x, mouse.y) < 150 && this.opacity < 0.5) {
        this.opacity += 0.02;
      } else if (this.opacity > 0) {
        this.opacity -= 0.02;
        this.opacity = Math.max(0, this.opacity); //prevents opacity from going below 0
      }
      this.x += this.dx;
      this.y += this.dy;
    }
  }]);
  return Particle;
}(); // Implementation
function init() {
  particles = [];
  for (var i = 0; i < 170; i++) {
    var x = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomIntFromRange)(randomRadius, innerWidth - randomRadius);
    var y = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomIntFromRange)(randomRadius, innerHeight - randomRadius);
    if (particles.length !== 0) {
      for (var j = 0; j < particles.length; j++) {
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.distance)(x, y, particles[j].x, particles[j].y) - randomRadius * 2 < 0) {
          x = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomIntFromRange)(randomRadius, innerWidth - randomRadius);
          y = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomIntFromRange)(randomRadius, innerHeight - randomRadius);
          j = -1;
        }
      }
    }
    particles.push(new Particle(x, y, randomRadius, (0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomColor)(colors)));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(function (particle) {
    particle.update(particles);
  });
}
init();
animate();
})();

/******/ })()
;
//# sourceMappingURL=canvas.bundle.js.map