<template>
    <div class="pr-4">
        <button @click="signOut" class="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">Sign Out</button>
    </div>
</template>






<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Error Message
const errorMsg = ref("");

// Router to push user once SignedIOut to the LoginView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signOut = async () => {
  try {
    // calls the user store and send the users info to backend to logOut
    await useUserStore().signOut();
    // redirects user to the loginView
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>



<style></style>