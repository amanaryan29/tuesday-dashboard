<template>
  <div class="bg-gray-900">
    <div class="container w-1/2 pl-2 md:pl-0 text-gray-100 text-base xl:text-xl no-underline hover:no-underline font-bold items-center">Comments DashBoard</div>
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
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
