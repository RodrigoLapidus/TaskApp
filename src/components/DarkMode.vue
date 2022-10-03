<template>
  <p>isDark: {{ isDark }}</p>
  <div>
    <p class="mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Dark Mode</p>
    <label for="default-toggle" class="inline-flex relative items-center cursor-pointer">
    <input @click="toggleDark()" type="checkbox" value="" id="default-toggle" class="sr-only peer">
    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-600 dark:peer-focus:ring-green-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
    <!-- <br>
    <p class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</p> -->
    </label>
  </div>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark(); // boolean for the dark or light mode
const toggleDark = useToggle(isDark); // to change the value of the boolean of isDark
</script>

<style></style>