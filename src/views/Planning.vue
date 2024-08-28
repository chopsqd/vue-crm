<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="isLoading" />

    <p
      v-else-if="!categories.length"
      class="center"
    >
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <section v-else>
      <div
        v-for="cat in categories"
        :key="cat.id"
      >
        <p>
          <strong>{{cat.title}}}:</strong>
          {{cat.spend | currency('RUB')}} из {{cat.limit | currency('RUB')}}
        </p>
        <div
          class="progress"
          v-tooltip="cat.tooltip"
        >
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{
              width: `${cat.progressPercent}%`
            }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import currencyFilter from "@/filters/currency.filter";

export default {
  name: 'Planning',
  data: () => ({
    isLoading: true,
    categories: []
  }),
  computed: {
    info() {
      return this.$store.getters["info/info"]
    }
  },
  async mounted() {
    const [records, categories] = await Promise.all([
      this.$store.dispatch('record/fetchRecords'),
      this.$store.dispatch('category/fetchCategories')
    ]);

    this.categories = categories.map(cat => {
      const spend = records.reduce((total, record) => {
        if (record.categoryId === cat.id && record.type === 'outcome') {
          return total + (+record.amount);
        }
        return total;
      }, 0);

      const percent = 100 * spend / cat.limit
      const progressPercent = Math.min(percent, 100)
      const progressColor  = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.isLoading = false
  }
}
</script>
