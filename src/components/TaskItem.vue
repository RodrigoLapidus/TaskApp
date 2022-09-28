<template>
  <div>
    <!-- Here starts the TailwindCSS component -->

    <div
      class="p-6 m-4 bg-white w-72 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700" :class="task.is_complete ? 'bg-gray-200 text-gray-500' : 'bg-white'"
    >
      <h5
        class="break-words w-full mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ task.title }}
      </h5>

      <p class="break-words w-full mb-3 font-normal text-gray-700 dark:text-gray-400" :class="task.is_complete ? 'line-through' : ''">
        {{ task.description }}
      </p>

      <div class="flex flex-row justify-between">
        <!-- Button to see if task has been completed -->
        <button
          @click="completeTask2(task.id, task.is_complete)"
          v-show="!task.is_complete"
          aria-label="Button to complete the task"
        >
          <CheckCircleIcon class="h-10 w-10 text-white bg-green-600 hover:bg-green-500 rounded-full"/>
        </button>

        <button
          @click="completeTask2(task.id, task.is_complete)"
          v-show="task.is_complete"
          aria-label="Button to incomplete the task"
        >
          <CheckCircleIcon class="h-10 w-10 text-green-600 border-green-600"/>
        </button>

        <!-- Button to edit the task -->
        <button
          @click="toggleOptions"
          aria-label="Button to edit the task"
        >
          <PencilIcon class="h-10 w-10 text-yellow-400 hover:text-yellow-500"/>
        </button>

        <!-- Button to delete the task -->
        <button @click="removeTask2(task.id)" aria-label="Button to delete the task">
          <TrashIcon class="h-10 w-10 text-red-400 hover:text-red-500"/>
        </button>
        
      </div>

      <!-- New line that appears to edit the task -->
      <div>
        <input
          v-show="toggle"
          type="text"
          v-model="newTitle"
          alt="Title to be edited"
          class="border-green-600 border-2 rounded w-full px-2 py-1 my-2 placeholder: font-semibold"
        />
        <input
          v-show="toggle"
          type="text"
          v-model="newDescription"
          alt="Description to be edited"
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
    </div>
  </div>
</template>

<script setup>
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

</script>

<style></style>