<template>

    <!-- Here the Tailwind Login page starts -->
    <div id="background-sign-in" class="container px-6 bg-gray-50" >
      
      <div
        class="flex flex-col text-center h-screen justify-evenly items-center"
      >
        <div>
          <div class="bg-white p-10 pb-2 flex flex-col shadow-xl rounded-xl">
            <div class="flex flex-col">
              <div class="mx-auto mb-6" id="position-logo">
                <img src="https://res.cloudinary.com/def7ecre1/image/upload/v1661513350/task%20app/TaskZilla-logo_jm6zms.jpg" alt="TaskZilla logo" >
              </div>
              <div class="col-1 flex flex-col items-center">
                <h1 class="text-5xl text-gray-800 font-bold" id="task-zilla">TaskZilla</h1>
                <p class="text-gray-500 text-lg">
                For the long overdue
                </p>
              </div>
            </div>
              

            <form @submit.prevent="signIn" class="w-full">
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
              <div id="input" class="flex flex-col w-full my-5">
                <label for="password" class="text-gray-800 font-bold mb-2"
                  >Password</label
                >
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  placeholder="***********"
                  class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                />
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
                    <div class="font-bold">Sign In</div>
                  </div>
                </button>
                <div class="flex flex-col justify-evenly mt-5">
                  <PersonalRouter :route="route" :buttonText="buttonText" class="w-full mb-4 text-center font-medium text-green-600" />
                  <a
                    href="#"
                    class="w-full mt-4 text-center font-medium text-green-600"
                    >Password recovery</a
                  >
                </div>
                <div class="container flex flex-row justify-center">
                  <div @click="signInWithGoogle"><img class="h-8 cursor-pointer mx-2" src="https://res.cloudinary.com/def7ecre1/image/upload/v1662996870/task%20app/Logo_Google_xfqaeb.png" alt="Google Login"></div>
                  <div @click="signInWithGithub"><img class="h-8 cursor-pointer mx-2" src="https://res.cloudinary.com/def7ecre1/image/upload/v1662996881/task%20app/Logo_GitHub_zv1skp.png" alt="GitHub Login"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import PasswordRecovery from "./PasswordRecovery.vue";
import ResetPassword from "../components/ResetPassword.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Sign Up";

const recover = "/auth/recovery"
const buttonRecovery = "Password Recovery";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

// Social Media login
const socialLogin = ref(false);

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signIn(email.value, password.value);
    // redirects user to the homeView
    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};

// Arrow function to Signin user with Google
const signInWithGoogle = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signInWithGoogle();
    // redirects user to the homeView
    socialLogin = true;
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};

// Arrow function to Signin user with GitHub
const signInWithGithub = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signInWithGithub();
    // redirects user to the homeView
    socialLogin = true;
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

<style>

#background-sign-in{
  background-image: url("https://res.cloudinary.com/def7ecre1/image/upload/v1662545653/task%20app/TaskZilla-background_cgcv66.jpg");
}

#position-logo {
  justify-content: center;
  width: 40%;
}

</style>
