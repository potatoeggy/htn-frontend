<script setup lang="ts">
import { ref, type Ref } from "vue";
import type { TEvent } from "@/utils/schema";
import { getEvents } from "@/utils/apiclient";
import EventRow from "./EventRow.vue";
import { useStore } from "@/stores/auther";

const store = useStore();

const allEvents = await getEvents();
const allowedEvents = allEvents.filter(
  (event) => event.permission === "public" || store.isAuthed
);

const expandedEventId: Ref<number | null> = ref(null);

const toggleExpandedEvent = (id: number) => {
  expandedEventId.value = expandedEventId.value === id ? null : id;
};
</script>

<template>
  <div class="flex flex-col py-4 gap-4">
    <EventRow
      v-for="(event, i) in allowedEvents"
      :expanded="expandedEventId === i"
      :event="event"
      :key="i"
      @toggle-expanded="toggleExpandedEvent(i)"
    />
  </div>
</template>
