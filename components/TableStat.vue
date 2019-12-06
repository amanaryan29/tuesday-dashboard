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
        total: null,
        approved: null,
        rejected: null
      },
      week: {
        total: null,
        approved: null,
        rejected: null
      }
    }
  },
  mounted () {
    this.fetchAndSetData()
  },
  methods: {
    async fetchAndSetData () {
      const month = await this.$axios.$get('/get_stats')
      this.month.total = month.total
      this.month.approved = month.approved
      this.month.rejected = month.rejected

      const week = await this.$axios.$get('/get_stats')
      this.week.total = week.total
      this.week.approved = week.approved
      this.week.rejected = week.rejected
    }
  }
}
</script>
