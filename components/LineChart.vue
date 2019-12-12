<script>
import { Line } from 'vue-chartjs'
import { api } from '@/components/helpers/api'

export default {
  name: 'LineChart',
  extends: Line,
  data () {
    return {
      loadLineChart: false,
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
            borderColor: '#FFA801',
            data: []
          }
        ]
      }
    }
  },
  mounted () {
    this.fetchAndSetData()
  },
  methods: {
    async fetchAndSetData () {
      const weekly = await api.get('/comments/count/weekly/lastnweeks/4')
      for (let i = 4; i > 0; i--) {
        this.lineChartData.datasets[0].data.push(weekly[weekly.length - i][1])
        this.lineChartData.datasets[1].data.push(weekly[weekly.length - i][2])
        this.lineChartData.datasets[2].data.push(weekly[weekly.length - i][3])
        this.loadLineChart = true
      }
      this.renderChart(this.lineChartData, { maintainAspectRatio: false, responsive: true })
    }
  }
}
</script>
