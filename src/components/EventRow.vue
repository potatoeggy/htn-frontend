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
const emit = defineEmits(["toggleExpanded", "selectExpanded"]);

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

const selectExpanded = (id: number) => {
  emit("selectExpanded", id);
};

const log = () => console.log("wtf");
</script>

<template>
  <section
    @click="toggleExpanded"
    :class="[
      'p-4 shadow-md shadow-gray-400 rounded-lg hover:cursor-pointer md:max-w-[48rem] transition-colors dark:shadow-gray-600 text-gray-800 dark:text-gray-200',
      expanded
        ? 'bg-white dark:bg-[#111]'
        : 'bg-[#f9f9f9] dark:bg-gray-900 IGNOREpb-1',
    ]"
    :id="`event-${event.id}`"
  >
    <div class="flex gap-2 justify-between">
      <h2 class="text-2xl text-pretty font-bold">{{ event.name }}</h2>
      <span
        class="event-type-pill px-2 py-1 text-white font-bold rounded-lg text-base"
        >{{ eventType.name }}</span
      >
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
        'ellipsis text-ellipsis transition-all text-base text-gray-500 dark:text-gray-400',
        { 'line-clamp-4': !expanded },
      ]"
    >
      {{ event.description }}
    </p>
    <p
      v-if="!expanded && false"
      class="w-full text-center text-sm pt-1 text-gray-300"
    >
      ↓ Press for more information… ↓
    </p>
    <Transition name="slide">
      <div v-if="expanded" class="h-auto relative overflow-hidden slide">
        <a
          @click.stop
          :href="eventUrl"
          target="_blank"
          class="text-white bg-cyan-500 font-bold px-2 py-1 mt-2 rounded-lg w-full text-lg text-pretty flex items-center justify-center shadow-md shadow-gray-400 dark:shadow-gray-600 transition-all hover:shadow-none active:shadow-none active:brightness-75"
        >
          Join this event!
        </a>
        <template v-if="relatedEvents.length > 0">
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
                @click.stop="selectExpanded(relatedEvent.id)"
              >
                {{ relatedEvent.name }}
              </a>
            </li>
          </ul>
        </template>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
span.event-type-pill {
  background-color: v-bind(eventTypeColor);
}

hr {
  @apply border my-2;
}

@media (prefers-color-scheme: dark) {
  hr {
    @apply border-gray-700;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: height 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  height: 0;
  overflow: hidden;
}
</style>
