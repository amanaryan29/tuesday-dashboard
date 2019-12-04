
<template>
  <div class="bg-gray-900 shadow-md rounded px- pt-1 pb-2 mb-1 flex flex-col">
    <div class="-mx-3 md:flex mb-2">
      <div class="md:w-1/3 px-3 mb-4 md:mb-0 mx-6">
        <label
          class="block uppercase tracking-wide text-gray-400 text-base font-bold mb-2"
          for="start-date"
        >Select Start Date</label>
        <input
          class="appearance-none block w-1/2 bg-gray-400 hover:bg-gray-500 text-gray-900 border border-red rounded py-3 px-4 mb-3"
          id="start-date"
          type="date"
        />
      </div>
      <div class="md:w-1/3 px-3 mb-4 md:mb-0 mx-6">
        <label
          class="block uppercase tracking-wide text-gray-400 text-base font-bold mb-2"
          for="start-date"
        >Select End Date</label>
        <input
          class="appearance-none block w-1/2 bg-gray-400 hover:bg-gray-500 text-gray-900 border border-red rounded py-3 px-4 mb-3"
          id="start-date"
          type="date"
        />
      </div>
      <button class="block uppercase mx-auto shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-black text-base p-2 m-6 rounded">Request Statistics</button>
    </div>
  </div>
</template>
