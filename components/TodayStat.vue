<template>
  <div class="container">
    <div v-if="todaysComment.isLoading" class="text-gray-400 text-sm uppercase">
      Loading ...
    </div>
    <div v-else-if="todaysComment.isError" class="text-gray-400 text-sm uppercase">
      Error in fetching the data
    </div>
    <div v-else class="border border-gray-800 rounded p-2">
      <span class="flex">
        <div class="w-full sm:w-1/3 p-1">
          <h5 class="font-bold text-xl text-gray-600 text-center">{{ todaysComment.approved }}</h5>
          <h3 class="font-bold uppercase text-sm text-gray-400 text-center p-1">Approved Comments</h3>
        </div>
        <div class="w-full sm:w-1/3 p-1">
          <h5 class="font-bold text-xl text-gray-600 text-center">{{ todaysComment.rejected }}</h5>
          <h3 class="font-bold uppercase text-sm text-gray-400 text-center p-1">Rejected Comments</h3>
        </div>
        <div class="w-full sm:w-1/3 p-1">
          <h5 class="font-bold text-xl text-gray-600 text-center">{{ todaysComment.total }}</h5>
          <h3 class="font-bold uppercase text-sm text-gray-400 text-center p-1">Total Comments</h3>
        </div>
      </span>
      <h3 class="font-bold uppercase text-sm text-gray-400 text-center p-1 mb-1">Today</h3>
    </div>
  </div>
</template>

<script>
import { api } from '@/api'

export default {
  data () {
    return {
      todaysComment: {
        approved: null,
        rejected: null,
        total: null,
        isLoading: false,
        isError: false
      }
    }
  },
  mounted () {
    this.fetchAndSetData()
  },
  methods: {
    async fetchAndSetData () {
      this.todaysComment.isLoading = true
      this.todaysComment.isError = false
      try {
        const todaysComment = await api.get('/comments/count/lastndays/0')
        this.todaysComment.approved = todaysComment.approved
        this.todaysComment.rejected = todaysComment.rejected
        this.todaysComment.total = todaysComment.total
      } catch (e) {
        this.todaysComment.isError = true
      } finally {
        this.todaysComment.isLoading = false
      }
    }
  }
}
</script>
