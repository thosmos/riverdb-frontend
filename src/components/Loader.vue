<template>
  <div class="spinner">
    <div class="spinner-a"></div>
    <div class="spinner-b"></div>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style lang="scss" scoped>
/* Editable */
$spinner-radius: 0.5em;
$bgColor: #077efa;

/* Probably shouldn't edit, but go crazy. */
$iteration-duration: 400ms;
$cycle-duration: 1000ms;
$spinner-width: $spinner-radius * 4;

/* Sassery */
.spinner {
  // position: absolute;
  // top: 50%;
  // left: 50%;
  margin: 50px auto;
  transform: translate(-50%, -50%) rotate(90deg);
  width: $spinner-width;
  z-index: 100;
  padding-bottom: 15px;
}

.spinner,
.spinner div {
  transform-origin: 50% 50%;
}

.spinner div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.spinner:before,
.spinner:after,
.spinner div:before,
.spinner div:after {
  animation-duration: $cycle-duration;
  animation-iteration-count: infinite;
  content: "";
  background: $bgColor;
  border-radius: 100%;
  width: $spinner-radius;
  height: $spinner-radius;
  position: absolute;
}

.spinner:before,
.spinner div:before {
  animation-name: orbBounceBefore;
  top: -$spinner-radius * 0.5;
  left: -$spinner-radius * 0.5;
}

.spinner:after,
.spinner div:after {
  animation-name: orbBounceAfter;
  top: -$spinner-radius * 0.5;
  right: -$spinner-radius * 0.5;
}

.spinner-a {
  transform: rotate(60deg) translateY(0);
}

.spinner-b {
  transform: rotate(120deg) translateY(0);
}

$delay-unit: $cycle-duration/6;

$startTime: 100% - percentage($iteration-duration/$cycle-duration);
$halfTime: 100% - percentage(($iteration-duration * 0.5) / $cycle-duration);

@keyframes orbBounceBefore {
  #{$startTime} {
    transform: translateX(0);
    animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  }
  #{$halfTime} {
    animation-timing-function: cubic-bezier(0, 1.11, 0.7, 1.43);
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes orbBounceAfter {
  #{$startTime} {
    animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
    transform: translateX(0);
  }
  #{$halfTime} {
    animation-timing-function: cubic-bezier(0, 1.11, 0.7, 1.43);
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.spinner-a:before {
  animation-delay: $delay-unit;
}
.spinner-b:before {
  animation-delay: $delay-unit * 2;
}
.spinner:after {
  animation-delay: $delay-unit * 3;
}
.spinner-a:after {
  animation-delay: $delay-unit * 4;
}
.spinner-b:after {
  animation-delay: $delay-unit * 5;
}
</style>
