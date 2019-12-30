<template>
  <div class="bg-gray-900 p-2 mb-3">
    <div v-if="pieChart.isLoading" class="text-gray-400 text-sm uppercase">
      Loading ...
    </div>
    <div v-else-if="pieChart.isError" class="text-gray-400 text-sm uppercase">
      Error in fetching the data
    </div>
    <pieChart v-else :height="250" :data="pieChart.data" :options="{ maintainAspectRatio: false, responsive: true }" />
  </div>
</template>

<script>
import { api } from '@/api'
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
          labels: ['Approved', 'Rejected'],
          datasets: [
            {
              hoverBackgroundColor: ['#5BC638', '#FF3333'],
              hoverBorderWidth: 5,
              label: 'Total Comments so far',
              backgroundColor: ['#69AC53', '#CC3333'],
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
      } catch (e) {
        this.pieChart.isError = true
      } finally {
        this.pieChart.isLoading = false
      }
    }
  }
}
</script>
