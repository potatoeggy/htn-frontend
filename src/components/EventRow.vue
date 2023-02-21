<script setup lang="ts">
import type { TEvent } from "@/utils/schema";
import dayjs from "dayjs";
import { EVENT_TYPE_MAP } from "@/utils/constants";

const props = defineProps<{ event: TEvent; expanded?: boolean }>();
const emit = defineEmits(["toggleExpanded"]);
const startTime = dayjs(props.event.start_time);
const eventType = EVENT_TYPE_MAP[props.event.event_type];
const eventTypeColor = eventType.color;

const toggleExpanded = () => {
  emit("toggleExpanded");
};

// TODO: put authentication status in the store

// top-level:
// start-end times
// description (partial, line limited)
// link
// speakers

// expanded:
// - related events
</script>

<template>
  <section @click="toggleExpanded">
    <div class="flex gap-2">
      <span class="event-type-pill px-2 py-1 text-white font-bold rounded-xl">{{
        eventType.name
      }}</span>
      <h2 class="text-2xl text-pretty font-bold">{{ event.name }}</h2>
    </div>
    <p>
      {{ event.description }}
    </p>
  </section>
</template>

<style scoped>
section {
  background-color: beige;
  border-radius: 0.5rem;
  box-shadow: 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.4);
  padding: 1rem;
}

section:hover {
  cursor: pointer;
}

span.event-type-pill {
  background-color: v-bind(eventTypeColor);
}
</style>
