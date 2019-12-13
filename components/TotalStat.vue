<template>
  <div class="flex-1 text-left mx-auto container">
    <div class="bg-gray-900 border border-gray-800 rounded shadow p-2 mb-2">
      <PieChart />
      <h3 class="font-bold uppercase text-sm text-gray-400 text-center p-1 mb-1">
        Total Comments so far
      </h3>
    </div>
    <div v-if="datasets.isLoading" class="text-gray-400 text-sm uppercase">
      Loading ...
    </div>
    <div v-else-if="datasets.isError" class="text-gray-400 text-sm uppercase">
      Error in fetching the data
    </div>
    <div v-else class="flex">
      <div class="w-full sm:w-1/2 p-1">
        <h5
          class="font-bold uppercase text-sm text-gray-400 text-left border border-gray-800 rounded p-2 mb-2"
        >Total Pending Comments:
          <span class="font-bold text-lg text-gray-600">{{ datasets.totalPendingComments }}</span>
        </h5>
      </div>
      <div class="w-full sm:w-1/2 p-1">
        <h5
          class="font-bold uppercase text-sm text-gray-400 text-left border border-gray-800 rounded p-2 mb-2"
        >open Assets:
          <span class="font-bold text-lg text-gray-600">{{ datasets.openAsset }}</span>
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/api'
import PieChart from '@/components/PieChart/index'

export default {
  components: {
    PieChart
  },
  data () {
    return {
      datasets: {
        openAsset: null,
        totalPendingComments: null,
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
      this.datasets.isLoading = true
      this.datasets.isError = false
      try {
        const assets = await api.get('/assets/open')
        this.datasets.openAsset = assets.count

        const pendingComments = await api.get('/comments/pending')
        this.datasets.totalPendingComments = pendingComments.total_pending
      } catch (e) {
        this.datasets.isError = true
      } finally {
        this.datasets.isLoading = false
      }
    }
  }
}
</script>
