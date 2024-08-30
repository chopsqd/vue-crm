<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button
        @click="refresh"
        class="btn waves-effect waves-light btn-small"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill
        :rates="currency.rates"
      />

      <HomeCurrency
        :rates="currency.rates"
        :date="currency.time_last_update_utc"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/home/HomeBill.vue";
import HomeCurrency from "@/components/home/HomeCurrency.vue";

export default {
  name: 'Home',
  metaInfo: () => ({
    title: this.$title('Title_Bill')
  }),
  components: {
    HomeBill,
    HomeCurrency
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('currency/fetchCurrency')
      this.loading = false
    }
  },
  mounted() {
    this.refresh()
  }
}
</script>
