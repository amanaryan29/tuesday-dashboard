<template>
  <div>
    <div v-if="currentMonthAndWeek.isLoading">
      Loading ...
    </div>
    <div v-else-if="currentMonthAndWeek.isError">
      Error in fetching the data
    </div>
    <table v-else class="table-auto mx-auto container">
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
          <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ currentMonthAndWeek.data.total[1] }}</td>
          <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ currentMonthAndWeek.data.total[0] }}</td>
        </tr>
        <tr>
          <td class="border px-4 py-2 font-bold text-gray-400 text-sm text-center uppercase">Approved</td>
          <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ currentMonthAndWeek.data.approved[1] }}</td>
          <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ currentMonthAndWeek.data.approved[0] }}</td>
        </tr>
        <tr>
          <td class="border px-4 py-2 font-bold text-gray-400 text-sm text-center uppercase">Rejected</td>
          <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ currentMonthAndWeek.data.rejected[1] }}</td>
          <td class="border px-4 py-2 font-bold text-lg text-gray-600">{{ currentMonthAndWeek.data.rejected[0] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { api } from '@/api'

export default {
  data () {
    return {
      currentMonthAndWeek: {
        isLoading: false,
        isError: false,
        // In approved, rejected, and total 0th index is for month and 1st index is for week
        data:
          {
            approved: [],
            rejected: [],
            total: []
          }
      }
    }
  },
  mounted () {
    this.fetchAndSetData()
  },
  methods: {
    async fetchAndSetData () {
      this.currentMonthAndWeek.isLoading = true
      this.currentMonthAndWeek.isError = false
      try {
        const currentMonth = await api.get('/comments/count/monthly')
        this.currentMonthAndWeek.data.approved[0] = currentMonth[currentMonth.length - 1][1]
        this.currentMonthAndWeek.data.rejected[0] = currentMonth[currentMonth.length - 1][2]
        this.currentMonthAndWeek.data.total[0] = currentMonth[currentMonth.length - 1][3]

        const currentWeek = await api.get('/comments/count/weekly')
        this.currentMonthAndWeek.data.approved[1] = currentWeek[currentWeek.length - 1][1]
        this.currentMonthAndWeek.data.rejected[1] = currentWeek[currentWeek.length - 1][2]
        this.currentMonthAndWeek.data.total[1] = currentWeek[currentWeek.length - 1][3]
      } catch (e) {
        this.currentMonthAndWeek.isError = true
      } finally {
        this.currentMonthAndWeek.isLoading = false
      }
    }
  }
}
</script>
