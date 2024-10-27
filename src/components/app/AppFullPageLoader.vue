<script lang="ts" setup>
const elements = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  delay: Math.random() * -15,
  duration: Number(Math.random()) * 1 + 8,
  radius: Math.random() * 200 + 100,
  reverseRotation: Math.random() > 0.5,
  scale: 0.8 + Math.random() * 0.4,
  size: Math.random() * 300 + 150,
  verticalOffset: (Math.random() - 0.5) * 50,
}))
</script>

<template>
  <div class="custom-arc-background">
    <div class="custom-animation-container">
      <div
        v-for="element in elements"
        :key="element.id"
        :class="{ reverse: element.reverseRotation }"
        :style="{
          'width': `${element.size}px`,
          'height': `${element.size}px`,
          'animationDuration': `${element.duration}s`,
          'animationDelay': `${element.delay}s`,
          '--orbit-radius': `${element.radius}px`,
          '--scale': element.scale,
          '--y-offset': `${element.verticalOffset}px`,
        }"
        class="custom-floating-element"
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes grow {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(3);
  }
}

.custom-arc-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
  filter: blur(80px);
  background: var(--bg-primary);

  animation: grow 1s 1s cubic-bezier(.77,-0.01,.18,1) forwards;
}

.custom-animation-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
}

.custom-floating-element {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(99, 102, 241, 0.15),
    rgba(168, 85, 247, 0.15)
  );
  animation: float infinite linear, breathe 8s infinite ease-in-out;
  opacity: 0.4;
  will-change: transform;
  mix-blend-mode: screen;
}

.custom-floating-element.reverse {
  animation: floatReverse infinite linear, breathe 8s infinite ease-in-out;
}

@keyframes float {
  0% {
    transform: translate(calc(-50% + var(--y-offset)), -50%)
               rotate(0deg)
               translateX(var(--orbit-radius))
               rotate(0deg)
               scale(var(--scale));
  }
  50% {
    transform: translate(calc(-50% + var(--y-offset)), -50%)
               rotate(180deg)
               translateX(var(--orbit-radius))
               rotate(-180deg)
               scale(calc(var(--scale) * 1.1));
  }
  100% {
    transform: translate(calc(-50% + var(--y-offset)), -50%)
               rotate(360deg)
               translateX(var(--orbit-radius))
               rotate(-360deg)
               scale(var(--scale));
  }
}

@keyframes floatReverse {
  0% {
    transform: translate(calc(-50% - var(--y-offset)), -50%)
               rotate(360deg)
               translateX(var(--orbit-radius))
               rotate(-360deg)
               scale(var(--scale));
  }
  50% {
    transform: translate(calc(-50% - var(--y-offset)), -50%)
               rotate(180deg)
               translateX(var(--orbit-radius))
               rotate(-180deg)
               scale(calc(var(--scale) * 1.1));
  }
  100% {
    transform: translate(calc(-50% - var(--y-offset)), -50%)
               rotate(0deg)
               translateX(var(--orbit-radius))
               rotate(0deg)
               scale(var(--scale));
  }
}

@keyframes breathe {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.6; }
}

.custom-floating-element:nth-child(3n) {
  background: radial-gradient(
    circle at center,
    rgba(244, 63, 94, 0.5),
    rgba(239, 68, 68, 0.5)
  );
}

.custom-floating-element:nth-child(3n + 1) {
  background: radial-gradient(
    circle at center,
    rgba(34, 211, 238, 0.5),
    rgba(59, 130, 246, 0.5)
  );
}

.custom-floating-element:nth-child(3n + 2) {
  background: radial-gradient(
    circle at center,
    rgba(168,  85, 247, 0.5),
    rgba(217, 70, 239, 0.5)
  );
}
</style>
