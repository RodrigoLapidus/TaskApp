<template>
    <div>
        <form @click.prevent="passwordRecover">
            <label for="email">Please, insert your email address to change your password</label>
            <input type="email" v-model="emailRecover" name="email" placeholder="dave@mail.com">
            <button type="submit">Recover Password</button>
        </form>
    </div>
      
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Const to save the email address
const emailRecover = ref("");

// Error Message
const errorMsg = ref("");

const passwordRecover = async () => {
    try {
          await useUserStore().recoverPassword(emailRecover.value);
          console.log("Print this");
          redirect.push({ path: "/auth/login" });
        } catch (error) {
          // displays error message
          errorMsg.value = `Error: ${error.message}`;
          // hides error message
          setTimeout(() => {
            errorMsg.value = null;
          }, 5000);
    }
}

</script>

<style></style>