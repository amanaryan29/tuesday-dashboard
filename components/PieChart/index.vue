<template>
  <div class="bg-gray-900 border border-gray-800 rounded shadow p-2 mb-3">
    <div v-if="pieChart.isLoading">
      Loading ...
    </div>
    <div v-else-if="pieChart.isError">
      Error in fetching the data
    </div>
    <pieChart v-else :data="pieChart.data" :options="{ maintainAspectRatio: false, responsive: true }" styles="height:300px" />
  </div>
</template>

<script>
import { api } from '@/components/helpers/api'
import pieChart from '@/components/PieChart/pie-chart'

export default {
  name: 'PieChart',
  components: {
    pieChart
  },
  data () {
    return {
      pieChart: {
        isLoading: false,
        isError: false,
        data: {
          labels: ['Approved', 'Rejected', 'Total'],
          datasets: [
            {
              hoverBackgroundColor: ['#B8E994', '#FF5E57', '#FFC048'],
              hoverBorderWidth: 5,
              label: 'Total Comments so far',
              backgroundColor: ['#78E08F', '#FF3F34', '#FFA801'],
              data: []
            }
          ]
        }
      }
    }
  },
  mounted () {
    this.fetchAndSetData()
  },
  methods: {
    async fetchAndSetData () {
      this.pieChart.isLoading = true
      this.pieChart.isError = false
      try {
        const totalComments = await api.get('/comments/count/total')
        this.pieChart.data.datasets[0].data.push(totalComments.approved)
        this.pieChart.data.datasets[0].data.push(totalComments.rejected)
        this.pieChart.data.datasets[0].data.push(totalComments.total)
      } catch (e) {
        this.pieChart.isError = true
      } finally {
        this.pieChart.isLoading = false
      }
    }
  }
}
</script>
