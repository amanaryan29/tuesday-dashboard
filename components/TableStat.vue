<template>
  <table class="table-auto mx-auto container">
    <thead>
      <tr>
        <th class="px-4 py-2" />
        <th class="px-4 py-2 text-gray-400 text-center text-sm uppercase">Current Week</th>
        <th class="px-4 py-2 text-gray-400 text-center text-sm uppercase">Current month</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border px-4 py-2 font-bold text-gray-400 text-sm text-center uppercase">Total</td>
        <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ currentWeek.total }}</td>
        <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ currentMonth.total }}</td>
      </tr>
      <tr>
        <td class="border px-4 py-2 font-bold text-gray-400 text-sm text-center uppercase">Approved</td>
        <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ currentWeek.approved }}</td>
        <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ currentMonth.approved }}</td>
      </tr>
      <tr>
        <td class="border px-4 py-2 font-bold text-gray-400 text-sm text-center uppercase">Rejected</td>
        <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ currentWeek.rejected }}</td>
        <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ currentMonth.rejected }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { api } from '@/components/helpers/api'

export default {
  data () {
    return {
      currentMonth: {
        approved: [],
        rejected: [],
        total: []
      },
      currentWeek: {
        approved: [],
        rejected: [],
        total: []
      }
    }
  },
  mounted () {
    this.fetchAndSetData()
  },
  methods: {
    async fetchAndSetData () {
      const currentMonth = await api.get('/comments/count/monthly')
      this.currentMonth.approved = currentMonth[currentMonth.length - 1][1]
      this.currentMonth.rejected = currentMonth[currentMonth.length - 1][2]
      this.currentMonth.total = currentMonth[currentMonth.length - 1][3]

      const currentWeek = await api.get('/comments/count/weekly')
      this.currentWeek.approved = currentWeek[currentWeek.length - 1][1]
      this.currentWeek.rejected = currentWeek[currentWeek.length - 1][2]
      this.currentWeek.total = currentWeek[currentWeek.length - 1][3]
    }
  }
}
</script>
