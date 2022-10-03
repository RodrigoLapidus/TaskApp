<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user.js";
import { ref } from "vue";
import { supabase } from "./supabase"
import SignIn from "./components/SignIn.vue";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);


onMounted(async () => {
  const appReady = ref(null);
  try {
    await userStore.fetchUser(); // here we call fetch user    
    if (!user.value) {
      // redirect them to logout if the user is not there
      appReady.value = true;
      router.push({ path: "/auth/login" });
    } else {
      // continue to dashboard
      router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style>
  /* Allows the operating system to make adjustments to the UI depending on the dark / light mode */
  html.dark {
    color-scheme: dark;
  }

  body {
    @apply dark:bg-slate-700 dark:text-slate-50;
  }
</style>
