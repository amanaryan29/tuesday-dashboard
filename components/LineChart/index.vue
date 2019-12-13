<template>
  <div class="bg-gray-900 border border-gray-800 rounded shadow p-2 mb-3">
    <div v-if="lineChart.isLoading">
      Loading ...
    </div>
    <div v-else-if="lineChart.isError">
      Error in fetching the data
    </div>
    <LineChart v-else :height="300" :data="lineChart.data" :options="{ maintainAspectRatio: false, responsive: true }" />
  </div>
</template>

<script>
import { api } from '@/api'
import LineChart from '@/components/LineChart/line-chart'

export default {
  name: 'LineChartFinal',
  components: {
    LineChart
  },
  data () {
    return {
      lineChart: {
        isLoading: false,
        isError: false,
        data: {
          labels: ['week-1', 'week-2', 'last-week', 'current-week'],
          datasets: [
            {
              label: 'Approved',
              borderColor: '#41b883',
              data: []
            },
            {
              label: 'Rejected',
              borderColor: 'red',
              data: []
            },
            {
              label: 'Total',
              borderColor: '#FFA801',
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
      this.lineChart.isLoading = true
      this.lineChart.isError = false
      try {
        const weekly = await api.get('/comments/count/weekly/lastnweeks/4')
        for (let i = 4; i > 0; i--) {
          this.lineChart.data.datasets[0].data.push(weekly[weekly.length - i][1])
          this.lineChart.data.datasets[1].data.push(weekly[weekly.length - i][2])
          this.lineChart.data.datasets[2].data.push(weekly[weekly.length - i][3])
        }
      } catch (e) {
        this.lineChart.isError = true
      } finally {
        this.lineChart.isLoading = false
      }
    }
  }
}
</script>
