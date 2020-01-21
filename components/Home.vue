<template>
  <div class="md:flex">
    <div class="mx-auto container w-full sm:w-1/2 p-3">
      <div class="bg-gray-900 border border-gray-800 rounded shadow p-2 mb-3">
        <div class="flex flex-row items-center">
          <TodayStat />
        </div>
      </div>
      <div class="bg-gray-900 border border-gray-800 rounded shadow p-2 mb-3">
        <div class="flex flex-row items-center">
          <TotalStat />
        </div>
      </div>
    </div>
    <div class="mx-auto container w-full mx-auto container sm:w-1/2 p-3">
      <LineChart />
      <div class="bg-gray-900 border border-gray-800 rounded shadow p-2 mb-3">
        <div class="flex flex-row items-center">
          <div class="mx-auto container flex-1 text-right md:text-center">
            <RejectionReason />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodayStat from '@/components/TodayStat'
import TotalStat from '@/components/TotalStat'
import LineChart from '@/components/LineChart/index'
import RejectionReason from '@/components/RejectionReason'

export default {
  name: 'Home',
  components: {
    TodayStat,
    TotalStat,
    LineChart,
    RejectionReason
  }
}
</script>
