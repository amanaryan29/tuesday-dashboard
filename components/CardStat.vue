<template>
  <div class="flex-1 text-left">
    <h5
      class="font-bold text-3xl text-gray-600 text-center"
    >{{ commentsToday.total }}
    </h5>
    <h3 class="font-bold uppercase text-sm text-gray-400 text-center">
      Today's Comments
    </h3>
    <h5
      class="font-bold uppercase text-sm text-gray-400 text-center"
    >Pending Comments:
      <span class="font-bold text-lg text-gray-600">{{ commentsPending.total }}</span>
    </h5>
    <h5
      class="font-bold uppercase text-sm text-gray-400 text-center"
    >open Assets:
      <span class="font-bold text-lg text-gray-600">{{ assets.open }}</span>
    </h5>
    <h5 class="text-center">
      <span
        class="font-bold uppercase text-sm text-gray-400 text-center"
      >Total:
        <span class="font-bold text-lg text-gray-600">{{ comments.total }}</span>
      </span>
      <span
        class="font-bold uppercase text-sm text-gray-400 text-center"
      >Approved:
        <span class="font-bold text-lg text-gray-600">{{ comments.approved }}</span>
      </span>
      <span
        class="font-bold uppercase text-sm text-gray-400 text-center"
      >Rejected:
        <span class="font-bold text-lg text-gray-600">{{ comments.rejected }}</span>
      </span>
    </h5>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: {
        total: null,
        approved: null,
        rejected: null
      },
      commentsToday: {
        total: null
      },
      assets: {
        open: null
      },
      commentsPending: {
        total: null
      }
    }
  },
  mounted () {
    this.fetchAndSetData()
  },
  methods: {
    async fetchAndSetData () {
      const comments = await this.$axios.$get('/total_comments')
      this.comments.total = comments.total
      this.comments.approved = comments.approved
      this.comments.rejected = comments.rejected

      const assets = await this.$axios.$get('/open_assets')
      this.assets.open = assets.count

      const commentsToday = await this.$axios.$get('/total_comments_today')
      this.commentsToday.total = commentsToday.total
      const commentsPending = await this.$axios.$get('/pending_comments_by_asset')
      this.commentsPending.total = commentsPending.total_pending
    }
  }
}
</script>
