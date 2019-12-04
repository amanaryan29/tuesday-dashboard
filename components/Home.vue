<template>
  <div class="container w-full mx-auto pt-8">
    <div>
      <Datepicker />
    </div>
    <div class="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 xl:w-1/3 p-3">
          <div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
            <div class="flex flex-row items-center">
              <div class="flex-1 text-right md:text-center">
                <h5
                  class="font-bold uppercase text-gray-400"
                >Total Comments
                </h5>
                <h3 class="font-bold text-3xl text-gray-600">
                  {{ comments.total }}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-3">
          <div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
            <div class="flex flex-row items-center">
              <div class="flex-1 text-right md:text-center">
                <h5
                  class="font-bold uppercase text-gray-400"
                >Total Accepted Comments
                </h5>
                <h3 class="font-bold text-3xl text-gray-600">
                  {{ comments.approved }}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-3">
          <div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
            <div class="flex flex-row items-center">
              <div class="flex-1 text-right md:text-center">
                <h5
                  class="font-bold uppercase text-gray-400"
                >Total Rejected Comments
                </h5>
                <h3 class="font-bold text-3xl text-gray-600">
                  {{ comments.rejected }}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-3">
          <div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
            <div class="flex flex-row items-center">
              <div class="flex-1 text-right md:text-center">
                <h5
                  class="font-bold uppercase text-gray-400"
                >Active Articles
                </h5>
                <h3 class="font-bold text-3xl text-gray-600">
                  345
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-3">
          <div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
            <div class="flex flex-row items-center">
              <div class="flex-1 text-right md:text-center">
                <h5
                  class="font-bold uppercase text-gray-400"
                > Total Articles
                </h5>
                <h3 class="font-bold text-3xl text-gray-600">
                  3249
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 xl:w-1/3 p-3">
          <div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
            <div class="flex flex-row items-center">
              <div class="flex-1 text-right md:text-center">
                <h5
                  class="font-bold uppercase text-gray-400"
                >Total Featured Comments
                </h5>
                <h3 class="font-bold text-3xl text-gray-600">
                  3249
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <Table />
    </div>
  </div>
</template>

<script>
import Datepicker from '@/components/Datepicker'
import Table from '@/components/Table'

export default {
  components: {
    Datepicker,
    Table
  },
  data () {
    return {
      comments: {
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
      const comments = await this.$axios.$get('/total_comments_count')
      this.comments.total = comments.total
      this.comments.approved = comments.approved
      this.comments.rejected = comments.rejected
    }
  }

}
</script>
