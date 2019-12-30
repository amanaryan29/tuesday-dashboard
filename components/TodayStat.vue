<template>
  <div class="container">
    <div v-if="todaysComment.isLoading" class="font-droid text-gray-400 text-sm uppercase">
      Loading ...
    </div>
    <div v-else-if="todaysComment.isError" class="font-droid text-gray-400 text-sm uppercase">
      Error in fetching the data
    </div>
    <div v-else class="p-1">
      <div class="flex-row">
        <div class="flex">
          <div class="w-full sm:w-1/2 border border-gray-800 rounded m-1 p-1">
            <h5 class="font-bold text-3xl text-gray-600 text-center">{{ todaysComment.approved }}</h5>
            <h3 class="font-droid uppercase text-xs text-gray-400 text-center p-1">Approved</h3>
          </div>
          <div class="w-full sm:w-1/2 border border-gray-800 rounded m-1 p-1">
            <h5 class="font-bold text-3xl text-gray-600 text-center">{{ todaysComment.rejected }}</h5>
            <h3 class="font-droid uppercase text-xs text-gray-400 text-center p-1">Rejected</h3>
          </div>
        </div>
        <div class="flex">
          <div @click="openAdmin()" class="w-full sm:w-1/2 border border-gray-800 rounded m-1 p-1 cursor-pointer hover:bg-blue-900">
            <h5 class="font-bold text-3xl text-gray-600 text-center">{{ todaysComment.pending }}</h5>
            <h3 class="font-droid uppercase text-xs text-gray-400 text-center p-1">Pending</h3>
          </div>
          <div class="w-full sm:w-1/2 border border-gray-800 rounded m-1 p-1">
            <h5 class="font-bold text-3xl text-gray-600 text-center">{{ todaysComment.total }}</h5>
            <h3 class="font-droid uppercase text-xs text-gray-400 text-center p-1">Total</h3>
          </div>
        </div>
      </div>
      <h3 class="font-droid font-bold uppercase text-xs text-gray-400 text-center m-2">Today</h3>
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
        pending: null,
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

        const todaysPendingComment = await api.get('/comments/pending/lastndays/0')
        this.todaysComment.pending = todaysPendingComment.total_pending
      } catch (e) {
        this.todaysComment.isError = true
      } finally {
        this.todaysComment.isLoading = false
      }
    },
    openAdmin () {
      window.open('https://tuesday.scroll.in', '_blank')
    }
  }
}
</script>
