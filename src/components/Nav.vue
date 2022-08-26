<template>
  <div class="w-auto top-0 h-12 bg-white flex flex-row justify-between items-center">
    <div class="flex flex-row items-center">
      <img class="h-10 pl-4" src="../../public/TaskZilla logo.JPG" alt="TaskZilla logo">
    <p class="text-gray-800 font-bold text-xl flex justify-start ml-1">TaskZilla</p>
    </div>
    <div class="flex flex-row justify-between items-center">
      <p class="font-semibold invisible md:visible">Welcome back,&nbsp</p>
      <p class="font-bold mr-2 invisible md:visible">{{ name[0] }}👋</p>
      <SignOut />
    </div>
  </div>
</template>

<script setup>

import SignOut from "../components/SignOut.vue";
import { useUserStore } from "../stores/user";

const email = useUserStore().user.email

const name = email.split("@");

//constant to save a variable that will hold the use router method

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
</script>

<style></style>