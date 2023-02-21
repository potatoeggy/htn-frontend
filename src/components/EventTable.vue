<script setup lang="ts">
import { computed, ref, type Ref } from "vue";
import type { TEvent } from "@/utils/schema";
import { getEvents } from "@/utils/apiclient";
import EventRow from "./EventRow.vue";
import { useStore } from "@/stores/auther";
import { EVENT_TYPE_MAP } from "@/utils/constants";

const store = useStore();

const allEvents = await getEvents();
const allowedEvents = allEvents.filter(
  (event) => event.permission === "public" || store.isAuthed
);

const allTags = new Set(allowedEvents.map((e) => e.event_type));
const tagsAllowed: Ref<Set<string>> = ref(new Set(allTags));
const searchQuery = ref("");

const filteredEvents = computed(() =>
  allowedEvents
    .filter(
      (e) =>
        e.description?.toLowerCase().includes(searchQuery.value) ||
        e.name.toLowerCase().includes(searchQuery.value)
    ) // less efficient but easier to read
    .filter((e) => tagsAllowed.value.has(e.event_type))
    .sort((a, b) => a.start_time - b.start_time)
);

const expandedEventId: Ref<number | null> = ref(null);

const toggleExpandedEvent = (id: number) => {
  expandedEventId.value = expandedEventId.value === id ? null : id;
};

const toggleTag = (tag: string) => {
  if (tagsAllowed.value.has(tag)) {
    tagsAllowed.value.delete(tag);
  } else {
    tagsAllowed.value.add(tag);
  }
};
</script>

<template>
  <div class="flex flex-col py-4 gap-4 items-center w-full max-w-[48rem]">
    <div
      class="flex p-2 bg-slate-600 text-gray-200 rounded-lg font-bold justify-between flex-wrap w-full gap-y-3"
    >
      <div class="flex gap-2 items-center">
        <p>Restrict to:</p>
        <div class="flex gap-2">
          <span
            v-for="(tag, i) in allTags"
            :key="i"
            :style="
              tagsAllowed.has(tag)
                ? `background: ${EVENT_TYPE_MAP[tag].color}`
                : ''
            "
            :class="[
              'rounded-lg px-2 py-1 text-white font-bold cursor-pointer text-sm flex items-center',
              { 'bg-gray-500 text-gray-300': !tagsAllowed.has(tag) },
            ]"
            @click="toggleTag(tag)"
          >
            {{ EVENT_TYPE_MAP[tag].name }}
          </span>
        </div>
      </div>
      <div class="flex">
        <input
          type="search"
          placeholder="Search events…"
          v-model="searchQuery"
          class="rounded-lg p-1 px-2 text-gray-500 dark:bg-gray-700 dark:text-gray-200"
        />
      </div>
    </div>
    <EventRow
      v-for="event in filteredEvents"
      :expanded="expandedEventId === event.id"
      :event="event"
      :key="event.id"
      :related-events="
        filteredEvents.filter((e) => event.related_events.includes(e.id)) // mildly hacky design flaw
      "
      @toggle-expanded="toggleExpandedEvent(event.id)"
      @select-expanded="toggleExpandedEvent"
    />
  </div>
</template>
