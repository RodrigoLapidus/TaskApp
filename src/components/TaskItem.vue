<template>
  <div>
    <!-- Here starts the TailwindCSS component -->

    <div
      class="p-6 m-4 mx-auto bg-white w-72 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <h5
        class="w-full mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ task.title }}
      </h5>

      <p class="w-full mb-3 font-normal text-gray-700 dark:text-gray-400">
        {{ task.description }}
      </p>

      <div class="flex flex-row justify-between">
        <!-- Button to see if task has been completed -->
        <button
          @click="completeTask2(task.id, task.is_complete)"
          v-show="!task.is_complete"
        >
          <CheckCircleIcon class="h-10 w-10 text-white bg-green-600 hover:bg-green-500 rounded-full"/>
        </button>

        <button
          @click="completeTask2(task.id, task.is_complete)"
          v-show="task.is_complete"
        >
          <CheckCircleIcon class="h-10 w-10 text-green-600 border-green-600"/>
        </button>

        <!-- Button to edit the task -->
        <button
          @click="toggleOptions"
        >
          <PencilIcon class="h-10 w-10 text-yellow-400 hover:text-yellow-500"/>
        </button>

        <!-- Button to delete the task -->
        <button @click="removeTask2(task.id)">
          <TrashIcon class="h-10 w-10 text-red-400 hover:text-red-500"/>
        </button>
        
      </div>

      <!-- New line that appears to edit the task -->
      <div>
        <input
          v-show="toggle"
          type="text"
          v-model="newTitle"
          class="border-green-600 border-2 rounded w-full px-2 py-1 my-2 placeholder: font-semibold"
        />
        <input
          v-show="toggle"
          type="text"
          v-model="newDescription"
          class="border-green-600 border-2 rounded w-full px-2 py-1 my-2 placeholder: font-semibold"
        />
        <button
          @click="toggleTask2"
          v-show="toggle"
          class="w-full py-2 my-2 bg-yellow-500 rounded-lg text-white font-bold hover:bg-yellow-400"
        >
          edit task
        </button>
      </div>

      <!-- <a href="#" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a> -->
    </div>

    <!-- Here starts the original component -->
    <!-- <div>
      <p>{{ task.title }}</p>
      <p>{{ task.description }}</p>
      <button @click="completeTask2(task.id, task.is_complete)" v-show="!task.is_complete" style="background-color: lightblue">Completed?</button>
      <button @click="completeTask2(task.id, task.is_complete)" v-show="task.is_complete" style="background-color: lightblue">Completed!</button>
      <button @click="toggleOptions" v-show="!toggle" style="background-color: lightgoldenrodyellow">Edit</button>
        <input v-show="toggle" type="text" v-model="newTitle" />
        <input v-show="toggle" type="text" v-model="newDescription" />
        <button @click="toggleTask2" v-show="toggle">edit task</button>
        <button @click="toggleOptions" v-show="toggle">Edit</button>
      <button @click="removeTask2(task.id)" style="background-color: lightcoral">Delete</button>
    </div> -->
  </div>
</template>

<script setup>
// import { defineProps } from 'vue';
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useTaskStore } from "../stores/task";
import { storeToRefs } from "pinia";

import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import { PencilIcon } from '@heroicons/vue/24/solid'
import { TrashIcon } from '@heroicons/vue/24/solid'

const newTitle = ref("");
const newDescription = ref("");
const toggle = ref(false);

const props = defineProps(["task", "toggle"]);

const emit = defineEmits([
  "childEditTask",
  "childCompleteTask",
  "childDeleteTask",
]);

const removeTask2 = async (id) => {
  emit("childDeleteTask", id);
};

function toggleOptions() {
  toggle.value = !toggle.value;
  newTitle.value = props.task.title;
  newDescription.value = props.task.description;
}

const toggleTask2 = async () => {
  const newValues = {
    newTitle: newTitle.value,
    newDescription: newDescription.value,
    oldIdValue: props.task,
  };
  emit("childEditTask", newValues);
  (newTitle.value = ""), (newDescription.value = "");
  toggle.value = !toggle.value;
};

const completeTask2 = async (id, completedBool) => {
  emit("childCompleteTask", id, completedBool);
};

/*
  const errorMsg = ref("");

  const arrayTask = ref([]);

  const arrayTaskLoaded = ref(null);


  const tasks = async () => {

    arrayTask.value = await useTaskStore().fetchTasks();
    
  };

  tasks();
  */

// const emit = defineEmits([
//   ENTER-EMITS-HERE
// ])

// const props = defineProps(["ENTER-PROP-HERE"]);
</script>

<style></style>

<!-- 
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].
3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 
8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
