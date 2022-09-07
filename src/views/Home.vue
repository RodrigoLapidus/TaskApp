<template>
  <div>
    <Nav />
    <NewTask @childNewTask="taskAddition" />

    <div class="container flex flex-wrap m-0">
      <TaskItem
      :task="tarea"
      v-for="(tarea, index) in taskStore.tasks"
      :key="index"
      @childDeleteTask="taskRemoval"
      @childEditTask="taskToggle"
      @childCompleteTask="taskCompletion"
    />
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import PersonalRouter from "../components/PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { useTaskStore } from "../stores/task";
import { storeToRefs } from "pinia";

import Nav from "../components/Nav.vue";
import SignOut from "../components/SignOut.vue";
import PasswordRecovery from "../components/PasswordRecovery.vue";
import ResetPassword from "../components/ResetPassword.vue";
import Footer from "../components/Footer.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
import { convertColumn } from "@supabase/realtime-js/dist/module/lib/transformers";

const taskStore = useTaskStore();

onMounted(() => {
  taskStore.fetchTasks();
});

const taskAddition = async (name, description) => {
  await useTaskStore().addTask(name, description);
  taskStore.fetchTasks();
};

const taskRemoval = async (id) => {
  await useTaskStore().removeTask(id);
  taskStore.fetchTasks();
};

// const taskToggle = async (id, newName, newDescription) => {
//   await useTaskStore().toggleTask(id, newName, newDescription);
//   llamarTareas();
// }

const taskToggle = async (task) => {
  const newTitle = task.newTitle;
  const newDescription = task.newDescription;
  const taskId = task.oldIdValue.id;
  await useTaskStore().toggleTask(newTitle, newDescription, taskId);
  taskStore.fetchTasks();
};

const taskCompletion = async (id, completedBool) => {
  await useTaskStore().completeTask(id, completedBool);

  taskStore.fetchTasks();
};
</script>

<style></style>
