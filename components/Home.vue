<template>
  <div class="md:flex">
    <div class="mx-auto container w-full sm:w-1/2 p-3">
      <div class="bg-gray-900 border border-gray-800 rounded shadow p-2 mb-3">
        <div class="flex flex-row items-center">
          <CardStat />
        </div>
      </div>
    </div>
    <div class="w-full mx-auto container sm:w-1/2 p-3">
      <LineChartFinal />
      <div class="bg-gray-900 border border-gray-800 rounded shadow p-2 mb-3">
        <div class="flex flex-row items-center">
          <div class="flex-1 text-right md:text-center">
            <TableStat />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStat from '@/components/CardStat'
import TableStat from '@/components/TableStat'
import LineChartFinal from '@/components/LineChartFinal'

export default {
  name: 'Home',
  components: {
    CardStat,
    TableStat,
    LineChartFinal
  }
}
</script>
