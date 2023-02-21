<script setup lang="ts">
import { ref, type Ref } from "vue";
import type { TEvent } from "@/utils/schema";
import { getEvents } from "@/utils/apiclient";
import EventRow from "./EventRow.vue";
import { useStore } from "@/stores/auther";
import { useRouter } from "vue-router";

const store = useStore();

const allEvents = await getEvents();
const allowedEvents = allEvents
  .filter((event) => event.permission === "public" || store.isAuthed)
  .sort((a, b) => a.start_time - b.start_time);

const expandedEventId: Ref<number | null> = ref(null);

const toggleExpandedEvent = (id: number) => {
  expandedEventId.value = expandedEventId.value === id ? null : id;
};
</script>

<template>
  <div class="flex flex-col py-4 gap-4 items-center">
    <EventRow
      v-for="(event, i) in allowedEvents"
      :expanded="expandedEventId === event.id"
      :event="event"
      :key="i"
      :related-events="
        allowedEvents.filter((e) => event.related_events.includes(e.id)) // mildly hacky design flaw
      "
      @toggle-expanded="toggleExpandedEvent(event.id)"
      @select-expanded="toggleExpandedEvent"
    />
  </div>
</template>
