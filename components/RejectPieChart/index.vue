<template>
  <div class="bg-gray-900 p-2 mb-3">
    <div v-if="rejectPieChart.isLoading" class="text-gray-400 text-sm uppercase">
      Loading ...
    </div>
    <div v-else-if="rejectPieChart.isError" class="text-gray-400 text-sm uppercase">
      Error in fetching the data
    </div>
    <rejectPieChart
      v-else
      :height="250"
      :data="rejectPieChart.data"
      :options="{
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: 'REJECTION REASONS',
          position: 'bottom',
          fontSize: 13,
          fontColor: '#CBD5E0'
        },
        legend: {
          display: true,
          position: 'bottom',
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
import rejectPieChart from '@/components/RejectPieChart/rejectPie-chart'

export default {
  name: 'RejectPieChart',
  components: {
    rejectPieChart
  },
  data () {
    return {
      rejectPieChart: {
        isLoading: false,
        isError: false,
        data: {
          labels: ['Spam', 'No-value', 'Offensive', 'Irrelevant', 'Whataboutery', 'Other'],
          datasets: [
            {
              borderWidth: 0,
              hoverBorderWidth: 1,
              backgroundColor: ['#FF7A23', '#CCBD00', '#CC3333', '#52D726', '#FFEC00', '#0065AB'],
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
      this.rejectPieChart.isLoading = true
      this.rejectPieChart.isError = false
      try {
        const rejectReasons = await api.get('/comments/rejected')
        this.rejectPieChart.data.datasets[0].data.push(rejectReasons.spam.count)
        this.rejectPieChart.data.datasets[0].data.push(rejectReasons.novalue.count)
        this.rejectPieChart.data.datasets[0].data.push(rejectReasons.offensive.count)
        this.rejectPieChart.data.datasets[0].data.push(rejectReasons.irrelevant.count)
        this.rejectPieChart.data.datasets[0].data.push(rejectReasons.whataboutery.count)
        this.rejectPieChart.data.datasets[0].data.push(rejectReasons.other.count)
      } catch (e) {
        this.rejectPieChart.isError = true
      } finally {
        this.rejectPieChart.isLoading = false
      }
    }
  }
}
</script>
