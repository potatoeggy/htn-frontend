<script setup lang="ts">
import { useStore } from "@/stores/auther";
import { useRouter } from "vue-router";
import { ref, computed, type Ref } from "vue";

const store = useStore();
const router = useRouter();

const wrongUsername = ref(false);
const wrongPassword = ref(false);
const wrongEmailOrPassword = computed(
  () => wrongUsername.value || wrongPassword.value
);

const username: Ref<HTMLInputElement | null> = ref(null);
const password: Ref<HTMLInputElement | null> = ref(null);

const login = (e: Event) => {
  e.preventDefault();
  wrongUsername.value = username.value?.value !== "eggy";
  wrongPassword.value = password.value?.value !== "password";

  if (wrongEmailOrPassword.value) {
    return;
  }

  store.login({
    name: "Eggy",
  });
  router.push("/");
};

const inputClasses = computed(() =>
  wrongEmailOrPassword.value
    ? "border-red-500 border-2 w-full"
    : "border-gray-200 border-2 hover:border-gray-400 focus:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500 dark:focus:border-gray-500 w-full"
);
</script>

<template>
  <div class="flex w-full h-full items-center justify-center">
    <main
      class="p-8 px-6 sm:px-10 flex flex-col items-center gap-2 min-h-[100vh] justify-center overflow-scroll sm:w-[33rem] w-[26rem]"
    >
      <img
        src="@/assets/logo.svg"
        alt="Hack the Borf logo"
        class="w-16 brightness-[20%] dark:brightness-100"
      />
      <h1 class="text-5xl dark:text-gray-200">Welcome back!</h1>
      <p class="text-pretty text-center text-lg font-normal">
        Create something amazing and show it off to the world at Hack the Borf,
        Borfland's largest hackathon.
      </p>
      <div class="mt-5 w-full">
        <form class="flex flex-col items-center gap-2 w-full" @submit="login">
          <input
            name="username"
            ref="username"
            type="text"
            placeholder="Username"
            :class="inputClasses"
          />
          <input
            name="password"
            ref="password"
            type="password"
            placeholder="Password"
            :class="inputClasses"
          />
          <p class="text-red-500 h-8">
            {{ wrongEmailOrPassword ? "Wrong username or password." : "" }}
          </p>
          <hr class="border-gray border w-full mb-2 dark:border-gray-500" />
          <button
            type="submit"
            class="text-white bg-cyan-500 font-bold px-3 py-2 rounded-lg w-full text-xl text-pretty hover:brightness-90 flex items-center justify-center"
          >
            <img
              src="@/assets/logo.svg"
              alt="Hack the Borf logo"
              class="w-6 inline mr-2"
            />
            Log in to Hack the Borf!
          </button>
        </form>
        <div class="mt-5">
          <p>Demo user: <code>eggy</code></p>
          <p>Demo password: <code>password</code></p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
input {
  padding: 0.5rem;
  border-radius: 0.5rem;
  outline: none;
}

@media (prefers-color-scheme: dark) {
  input {
    background-color: var(--bg-color-main);
  }
}
</style>
