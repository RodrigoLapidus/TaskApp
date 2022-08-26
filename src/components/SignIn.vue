<template>

    <!-- Here the Tailwind Login page starts -->
    <div class="container px-6 bg-gray-50" >
      
      <div
        class="flex flex-col text-center h-screen justify-evenly items-center"
      >
        <div>
          <div class="bg-white p-10 pb-2 flex flex-col shadow-xl rounded-xl" id="login-positioning">
            <div class="flex flex-col">
              <div class="mx-auto mb-6" id="position-logo">
                <img src="../../public/TaskZilla logo.JPG" alt="TaskZilla logo" >
              </div>
              <div class="col-1 flex flex-col items-center">
                <h1 class="text-5xl text-gray-800 font-bold" id="task-zilla">TaskZilla</h1>
                <p class="text-gray-500 text-lg">
                For the long overdue
                </p>
              </div>
            </div>
              
            <!-- <h2 class="text-2xl font-bold text-gray-800 text-left mb-5">
              Welcome back! 👋
            </h2> -->
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
                  <!-- <PersonalRouter :route="recover" :buttonText="buttonRecovery" class="w-full mb-4 text-center font-medium text-green-600" /> -->
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
</script>

<style>

#position-logo {
  justify-content: center;
  width: 40%;
}

.wu-text {
  color: black;
}

.form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}
.input {
  color: black;
  margin-bottom: 1rem;
}
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

/* @media (min-width:1536px){
  #login-positioning {
    float: center;
    position: relative;
    right: 120px;
    top: 400px;
    width: 65rem;
    height: 110rem;
  }
} */
</style>
