<template>
  <div class="flex">
    <div class="w-full sm:w-1/2 p-3">
      <div class="bg-gray-900 border border-gray-800 rounded shadow p-2 mb-3">
        <div class="flex flex-row items-center">
          <CardStat />
        </div>
      </div>
      <div class="bg-gray-900 border border-gray-800 rounded shadow p-2 mb-3">
        <div class="flex flex-row items-center">
          <div class="flex-1 text-right md:text-center">
            <TableStat />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full sm:w-1/2 p-3">
      <div class="bar-chart bg-gray-900 border border-gray-800 rounded shadow p-2">
         <LineChart v-if="loadChart" :data="lineChartData" :options="{ maintainAspectRatio: false, responsive: true }" styles="height:300px" />
      </div>
    </div>
  </div>
</template>

<script>
import CardStat from '@/components/CardStat'
import TableStat from '@/components/TableStat'
import LineChart from '~/components/line-Chart'

export default {
  components: {
    CardStat,
    TableStat,
    LineChart
  },
  data () {
    return {
      loadChart: false,
      lineChartData: {
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
            borderColor: 'yellow',
            data: []
          }
        ]
      },
      show: false
    }
  },
  mounted () {
    this.show = false
    this.fetchAndSetData()
  },
  methods: {
    async fetchAndSetData () {
      const weekly = await this.$axios.$get('/weekly_comments_count')

      console.log('this', this)
      for (let i = 4; i > 0; i--) {
        this.lineChartData.datasets[0].data.push(weekly[weekly.length - i][1])
        this.lineChartData.datasets[1].data.push(weekly[weekly.length - i][2])
        this.lineChartData.datasets[2].data.push(weekly[weekly.length - i][3])
        this.loadChart = true
      }
    }
  }
}
</script>
