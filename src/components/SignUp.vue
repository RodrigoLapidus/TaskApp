<template>
  <div class="flex flex-col">
    <div>
      <p class="text-gray-700 text-2xl font-bold text-center mt-12">
                Please sign up!
                </p>
      <form @submit.prevent="signUp" class="w-80 flex flex-col items-center mx-auto">
              <div id="input" class="flex flex-col w-full my-5">
                <label for="username" class="text-gray-800 font-bold mb-2"
                  >Username</label
                >
                <input
                  type="text"
                  id="username"
                  v-model="email"
                  placeholder="dave@mail.com"
                  class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                />
              </div>
              <div id="input" class="flex flex-col relative w-full my-5">
                <label for="password" class="text-gray-800 font-bold mb-2"
                  >Password</label
                >
                <input
                  :type="passwordFieldType"
                  id="password"
                  v-model="password"
                  placeholder="***********"
                  class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                />
                <EyeIcon @click="changeHidePasswordValue"  v-show="hidePassword" class="cursor-pointer h-5 w-5 absolute bottom-4 right-2 text-gray-200"/>
                <EyeIcon @click="changeHidePasswordValue" v-show="!hidePassword"  class="cursor-pointer h-5 w-5 absolute bottom-4 right-2 text-green-600"/>
              </div>
              <div id="input" class="flex flex-col relative w-full my-5">
                <label for="password" class="text-gray-800 font-bold mb-2"
                  >Confirm password</label
                >
                <input
                  :type="passwordFieldType"
                  id="confirm-password"
                  v-model="confirmPassword"
                  placeholder="***********"
                  class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                />
                <EyeIcon @click="changeHidePasswordValue"  v-show="hidePassword" class="cursor-pointer h-5 w-5 absolute bottom-4 right-2 text-gray-200"/>
                <EyeIcon @click="changeHidePasswordValue" v-show="!hidePassword"  class="cursor-pointer h-5 w-5 absolute bottom-4 right-2 text-green-600"/>
              </div>
              <div id="button" class="flex flex-col w-full my-5">
                <button
                  type="submit"
                  class="w-full py-4 bg-green-600 rounded-lg text-white"
                >
                  <div class="flex flex-row items-center justify-center pr-8">
                    <div class="mr-2">
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        ></path>
                      </svg>
                    </div>
                    <div class="font-bold">Sign Up</div>
                  </div>
                </button>
              </div>
              </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

import { EyeIcon } from '@heroicons/vue/24/solid'

// Route Variables
const route = "/auth/login";
const buttonText = "Test the Sign In Route";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// define variable for it passwords match
var passwordsNotSame = false;


// Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);

// Show hide confrimPassword variable
const hidePassword = ref(true);

// Change boolean value to see - not see the password
const changeHidePasswordValue = () => {
  if (hidePassword.value === true) {
    hidePassword.value = false;
  } else {
    hidePassword.value = true;
  }
};

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
    if (password.value === confirmPassword.value) {
        try {
          // calls the user store and send the users info to backend to logIn
          await useUserStore().signUp(email.value, password.value);
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
    }
    else {
        passwordsNotSame = true;
        console.log(passwordsNotSame);
        return passwordsNotSame;
    }
};
</script>

<style></style>
