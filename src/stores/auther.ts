import { ref, computed } from "vue";
import { defineStore } from "pinia";

interface TActiveUser {
  name: string;
}

// we could straight-up have a key-value object, but
// this is good for when we want to add more functionality
export const useStore = defineStore("auther", () => {
  const activeUser = ref<TActiveUser | null>(null);
  const isAuthed = computed(() => activeUser.value !== null);

  function login(user: TActiveUser) {
    activeUser.value = user;
  }

  function logout() {
    activeUser.value = null;
  }

  return { isAuthed, activeUser, login, logout };
});
