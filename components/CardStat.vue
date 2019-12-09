<template>
  <div class="flex-1 text-left">
    <h5
      class="font-bold text-3xl text-gray-600 text-center"
    >{{ commentsToday.approved }}
    </h5>
    <h3 class="font-bold uppercase text-sm text-gray-400 text-center p-2 mb-3">
      Today's Comments
    </h3>
    <h5
      class="font-bold uppercase text-sm text-gray-400 text-left border border-gray-800 rounded p-2 mb-3"
    >Pending Comments:
      <span class="font-bold text-lg text-gray-600">{{ commentsPending.total }}</span>
    </h5>
    <h5
      class="font-bold uppercase text-sm text-gray-400 text-left border border-gray-800 rounded p-2 mb-3"
    >open Assets:
      <span class="font-bold text-lg text-gray-600">{{ assets.open }}</span>
    </h5>
    <div class="bar-chart bg-gray-900 rounded shadow p-2">
      <PieChart v-if="loadPieChart" :data="pieChartData" :options="{ maintainAspectRatio: false, responsive: true }" styles="height:300px" />
    </div>
  </div>
</template>

<script>
import PieChart from '~/components/pie-Chart'

export default {
  components: {
    PieChart
  },
  data () {
    return {
      commentsToday: {
        total: null,
      },
      assets: {
        open: null
      },
      commentsPending: {
        total: null
      },
      loadPieChart: false,
      pieChartData: {
        labels: ['Approved', 'Rejected', 'Total'],
        datasets: [
          {
            hoverBackgroundColor: ['#B8E994', '#FF5E57', '#FFC048'],
            hoverBorderWidth: 5,
            label: 'Comments Stats',
            backgroundColor: ['#78E08F', '#FF3F34', '#FFA801'],
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
      const totalComments = await this.$axios.$get('/total_comments')
      this.pieChartData.datasets[0].data.push(totalComments.approved)
      this.pieChartData.datasets[0].data.push(totalComments.rejected)
      this.pieChartData.datasets[0].data.push(totalComments.total)
      this.loadPieChart = true

      const assets = await this.$axios.$get('/open_assets')
      this.assets.open = assets.count

      const commentsToday = await this.$axios.$get('/total_comments_today')
      this.commentsToday.total = commentsToday.approved
      const commentsPending = await this.$axios.$get('/pending_comments_by_asset')
      this.commentsPending.total = commentsPending.total_pending
    }
  }
}
</script>
