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

const socialLogin = ref(false);


onMounted(async () => {
  const appReady = ref(null);
  try {
    await userStore.fetchUser(); // here we call fetch user
    console.log(user.value);
    console.log(socialLogin.value);
    console.log(socialLogin);

    socialLogin = SignIn.socialLogin;
    
    if (!socialLogin) {
      // continue to dashboard
      router.push({ path: "/" });
    } else if (!user.value) {
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

<style></style>
