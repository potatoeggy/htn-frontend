<script setup lang="ts">
import EventTable from "@/components/EventTable.vue";
import { useStore } from "@/stores/auther";

const store = useStore();
</script>

<template>
  <header class="flex items-center p-4 justify-between">
    <a href="/" class="flex gap-3 items-center">
      <img class="w-6 mt-1" src="@/assets/logo.svg" alt="Hack the Borf logo" />
      <h1 class="text-2xl text-white">Hack the Borf</h1>
    </a>
  </header>
  <main class="p-8 px-10 flex flex-col items-center">
    <div class="md:max-w-[48rem] w-full">
      <h1 class="text-5xl dark:text-gray-200 text-gray-700">Events</h1>
      <div class="text-lg mt-2 text-gray-500 dark:text-gray-400">
        <p v-if="store.activeUser">
          Welcome back, {{ store.activeUser.name }}!
        </p>
        <p v-else>
          You are not logged in. To see all events,
          <a class="underline text-blue-400" href="/login">log in here</a>.
        </p>
        <p>Press an event to see more details about it.</p>
      </div>
    </div>
    <Suspense>
      <EventTable />
    </Suspense>
  </main>
</template>

<style scoped>
header {
  background-color: var(--bg-color-main);
  box-shadow: 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.4);
}
</style>
