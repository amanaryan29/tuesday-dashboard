<template>
  <div class="bg-black-alt font-sans w-full min-h-screen m-0">
    <div class="bg-gray-900 shadow">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between py-4">
          <nav class="inline-block flex flex-col sm:flex-row">
            <button class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500">
              All Stat
            </button><button class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
              Monthly
            </button><button class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
              Weekly
            </button>
          </nav>
          <div class="mx-auto uppercase text-gray-100 text-base xl:text-2xl no-underline hover:no-underline font-bold">Comments DashBoard</div>
        </div>
      </div>
    </div>
    <div>
      <Home />
    </div>
  </div>
</template>

<script>
import Home from '@/components/Home'

export default {
  components: {
    Home
  }
}
</script>

<style>
  .bg-black-alt  {
    background:#191919;
  }
</style>
