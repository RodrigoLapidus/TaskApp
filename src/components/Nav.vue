<template>
  <div class="w-auto top-0 h-12 bg-white flex flex-row justify-between items-center">
    <div class="flex flex-row items-center">
      <img class="h-10 pl-4" src="https://res.cloudinary.com/def7ecre1/image/upload/v1661513350/task%20app/TaskZilla-logo_jm6zms.jpg" alt="TaskZilla logo">
    <p class="text-gray-800 font-bold text-xl flex justify-start ml-1">TaskZilla</p>
    </div>
    <div class="flex flex-col justify-center">
      <div class="flex flex-row justify-between items-center">
        <p class="font-semibold invisible md:visible">Welcome back,&nbsp;</p>
        <p class="font-bold mr-2 invisible md:visible"> {{ name[0] }}👋</p>
      </div>
      <div>
        <p>{{ currentDateTime() }}</p>
      </div>
      <SignOut />
    </div>
  </div>
</template>

<script setup>

import SignOut from "../components/SignOut.vue";
import { useUserStore } from "../stores/user";

const email = useUserStore().user.email

const name = email.split("@");

// to display the date

const currentDateTime = () => {
    const current = new Date();
    const monthName = toMonthName();
    const dayName = toDayName();
    const date = `${current.getDate()} ${monthName} ${current.getFullYear()}`;
    const justDate = `${dayName} ${date}`;
    return justDate;
};
const toMonthName = () => {
    const monthofYearName = new Date().toLocaleString("en-US", {
        month: "short",
    });
    return monthofYearName;
};
const toDayName = () => {
    const dayOfWeekName = new Date().toLocaleString("en-US", {
        weekday: "short",
    });
    return dayOfWeekName;
  };
</script>

<style></style>