<template>
  <div class="skeleton">

  </div>
</template>

<script>
export default {
  name: "Skeleton"
};
</script>

<style scoped lang="scss">
$color-base: #ccc;
$color-highlight: lighten($color-base, 7%);

.skeleton {
  position: relative;
  overflow: hidden;
  background: $color-base;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      $color-base,
      $color-highlight,
      $color-base
    );
    animation: progress 1s ease-in-out infinite;
  }
}

@keyframes progress {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
