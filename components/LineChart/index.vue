<template>
  <div class="bg-gray-900 border border-gray-800 rounded shadow p-2 mb-3">
    <div v-if="lineChart.isLoading" class="text-gray-400 text-sm uppercase">
      Loading ...
    </div>
    <div v-else-if="lineChart.isError" class="text-gray-400 text-sm uppercase">
      Error in fetching the data
    </div>
    <LineChart
      v-else
      :height="300"
      :data="lineChart.data"
      :options="{
        maintainAspectRatio: false,
        responsive: true,
        title:{
          display: true,
          text: 'WEEKLY STATISTICS',
          position: 'bottom',
          fontSize: 13,
          fontColor: '#CBD5E0',
        },
        legend: {
          display: true,
          labels: {
            fontColor: '#718096'
          }
        }
      }"
    />
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
          labels: [],
          datasets: [
            {
              label: 'Approved',
              fontColor: '#718096',
              borderColor: '#5BC638',
              pointBackgroundColor: 'white',
              lineTension: 0,
              data: []
            },
            {
              label: 'Rejected',
              borderColor: '#FF3333',
              pointBackgroundColor: 'white',
              lineTension: 0,
              data: []
            },
            {
              label: 'Total',
              borderColor: '#0071C1',
              pointBackgroundColor: 'white',
              lineTension: 0,
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
        const weekly = await api.get('/comments/count/weekly/lastnweeks/12')
        for (let i = 12; i > 0; i--) {
          this.lineChart.data.labels.push(weekly[weekly.length - i][0])
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
