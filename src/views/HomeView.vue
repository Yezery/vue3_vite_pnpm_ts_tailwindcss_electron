<template>
  <div
    class="relative h-screen isolate overflow-auto bg-gray-900 py-24 sm:py-32"
  >
    <div
      class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
    >
      <div
        class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>
    <div
      class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
    >
      <div
        class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2
          class="text-5xl font-semibold tracking-tight text-white sm:text-7xl"
        >
          Build in
        </h2>
        <p
          class="mt-8 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8"
        >
          Vue 3 + Vite + Typescript + Electron + PNPM + Tailwindcss.
        </p>
      </div>
      <div class="mt-24 mx-auto max-w-7xl px-6 lg:px-8">
        <div
          class="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3"
        >
          <div class="bg-white/5 p-8 sm:p-12">
            <img
              class="max-h-24 w-full object-contain"
              src="@/assets/vue.svg"
              alt="vue"
              width="258"
              height="148"
            />
          </div>
          <div class="bg-white/5 p-12 sm:p-12">
            <img
              class="max-h-24 w-full object-contain"
              src="@/assets/vite.svg"
              alt="vite"
              width="258"
              height="148"
            />
          </div>
          <div class="bg-white/5 p-12 sm:p-12">
            <img
              class="max-h-24 w-full object-contain"
              src="@/assets/tailwind.svg"
              alt="tailwind"
              width="258"
              height="148"
            />
          </div>
          <div class="bg-white/5 p-12 sm:p-12">
            <img
              class="max-h-24 w-full object-contain"
              src="@/assets/electron.svg"
              alt="electron"
              width="258"
              height="148"
            />
          </div>
          <div class="bg-white/5 p-12 sm:p-12">
            <img
              class="max-h-24 w-full object-contain"
              src="@/assets/pnpm.svg"
              alt="pnpm"
              width="258"
              height="148"
            />
          </div>
          <div class="bg-white/5 p-12 sm:p-12">
            <img
              class="max-h-24 w-full object-contain"
              src="@/assets/typescript.svg"
              alt="typescript"
              width="258"
              height="148"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {
});
</script>
