<template>
    <div>
        <form @click.prevent="resetPass">
            <label for="email">Please, insert your email address to change your password</label>
            <input type="password" v-model="passwordReset1" name="email" placeholder="***********">
            <input type="pasword" v-model="passwordReset2" name="email" placeholder="***********">
            <button type="submit">Reset Password</button>
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

const passwordReset1 = ref("");
const passwordReset2 = ref("");

const passwordRecover = async () => {
    if (passwordReset1 === passwordReset2){
        try {
          await useUserStore().resetPassword(emailRecover.value);
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
    } else {
        // insert text passwords are not the same
    }
}


</script>

<style>

</style>