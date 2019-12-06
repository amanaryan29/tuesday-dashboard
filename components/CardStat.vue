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
      const comments = await this.$axios.$get('/get_stats')
      console.log(comments)
      this.comments.total = comments.total_comments_count.total
      this.comments.approved = comments.total_comments_count.approved
      this.comments.rejected = comments.total_comments_count.rejected

      const assets = await this.$axios.$get('/get_stats')
      this.assets.open = assets.open_assets.count

      const commentsToday = await this.$axios.$get('/get_stats')
      this.commentsToday.total = commentsToday.total_comments_today.total
      const commentsPending = await this.$axios.$get('/get_stats')
      this.commentsPending.total = commentsPending.pending_comments_by_asset.total_pending
    }
  }
}
</script>
