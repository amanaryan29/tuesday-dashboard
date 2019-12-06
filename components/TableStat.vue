<template>
  <table class="table-auto">
    <thead>
      <tr>
        <th class="w-1/2 px-4 py-2"></th>
        <th class="w-1/2 px-4 py-2 text-gray-400 text-center uppercase">Current Week</th>
        <th class="w-1/2 px-4 py-2 text-gray-400 text-center uppercase">Current month</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border px-4 py-2 font-bold text-gray-400 text-center uppercase">Total</td>
        <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ week.total }}</td>
        <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ month.total }}</td>
      </tr>
      <tr>
        <td class="border px-4 py-2 font-bold text-gray-400 text-center uppercase">Accepted</td>
        <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ week.approved }}</td>
        <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ month.approved }}</td>
      </tr>
      <tr>
        <td class="border px-4 py-2 font-bold text-gray-400 text-center uppercase">Rejected</td>
        <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ week.rejected }}</td>
        <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ month.rejected }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data () {
    return {
      month: {
        total: [],
        approved: [],
        rejected: []
      },
      week: {
        total: [],
        approved: [],
        rejected: []
      }
    }
  },
  mounted () {
    this.fetchAndSetData()
  },
  methods: {
    async fetchAndSetData () {
      const month = await this.$axios.$get('/get_stats')
      const currMonth = month.monthly_comments_count
      this.month.total = currMonth[currMonth.length-1][3]
      this.month.approved = currMonth[currMonth.length-1][1]
      this.month.rejected = currMonth[currMonth.length-1][2]

      const week = await this.$axios.$get('/get_stats')
      const currWeek = week.weekly_comments_count
      this.week.total = currWeek[currWeek.length-1][3]
      this.week.approved = currWeek[currWeek.length-1][1]
      this.week.rejected = currWeek[currWeek.length-1][2]
    }
  }
}
</script>
