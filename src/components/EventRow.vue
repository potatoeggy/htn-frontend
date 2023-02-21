<script setup lang="ts">
import type { TEvent } from "@/utils/schema";
import dayjs from "dayjs";
import { EVENT_TYPE_MAP } from "@/utils/constants";
import { useStore } from "@/stores/auther";

const store = useStore();

const props = defineProps<{
  event: TEvent;
  expanded?: boolean;
  relatedEvents: TEvent[];
}>();
const emit = defineEmits(["toggleExpanded"]);

const startTime = dayjs(props.event.start_time);
const endTime = dayjs(props.event.end_time);
const endDateIsSame = endTime.isSame(startTime, "day");

const eventType = EVENT_TYPE_MAP[props.event.event_type];
const eventTypeColor = eventType.color;
const eventUrl = store.isAuthed
  ? props.event.private_url
  : props.event.public_url;

const toggleExpanded = () => {
  emit("toggleExpanded");
};

// expanded:
// - related events
</script>

<template>
  <section
    @click="toggleExpanded"
    class="p-4 bg-slate-100 shadow-md shadow-gray-400 rounded-lg hover:cursor-pointer md:max-w-[50rem]"
    :id="`event-${event.id}`"
  >
    <div class="flex gap-2 justify-between">
      <h2 class="text-2xl text-pretty font-bold">{{ event.name }}</h2>
      <span class="event-type-pill px-2 py-1 text-white font-bold rounded-xl">{{
        eventType.name
      }}</span>
    </div>
    <p v-if="endDateIsSame">
      {{ startTime.format("H:mm A") }} –
      {{ endTime.format("H:mm A · MMMM DD, YYYY") }}
    </p>
    <p v-else>
      {{ startTime.format("MMMM DD, YYYY / H:mm A") }} –
      {{ endTime.format("MMMM DD, YYYY / H:mm A") }}
    </p>
    <p>
      <strong>Speaker(s):</strong>
      {{ event.speakers.map((s) => s.name).join(", ") }}
    </p>
    <hr />

    <p
      :class="[
        'ellipsis text-ellipsis transition-all',
        { 'line-clamp-4': !expanded },
      ]"
    >
      {{ event.description }}
    </p>
    <template v-if="expanded">
      <a
        @click.stop
        :href="eventUrl"
        target="_blank"
        class="text-white bg-cyan-500 font-bold px-2 py-1 mt-2 rounded-lg w-full text-lg text-pretty flex items-center justify-center shadow-md shadow-gray-400 transition-all hover:shadow-none active:shadow-none active:brightness-75"
      >
        Join this event!
      </a>
      <br />
      <hr />
      <p class="mt-2">
        <strong>See also:</strong>
      </p>
      <ul class="list-inside">
        <li
          class="list-disc"
          v-for="relatedEvent in relatedEvents"
          :key="relatedEvent.id"
        >
          <a
            class="underline text-blue-400"
            :href="`#event-${relatedEvent.id}`"
            >{{ relatedEvent.name }}</a
          >
        </li>
      </ul>
    </template>
  </section>
</template>

<style scoped>
span.event-type-pill {
  background-color: v-bind(eventTypeColor);
}

hr {
  @apply border my-2;
}
</style>
