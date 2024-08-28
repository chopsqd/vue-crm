<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="isLoading"/>

    <section v-else-if="records.length">
      <HistoryTable
        :records="items"
      />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        prev-text="Назад"
        next-text="Вперед"
        container-class="pagination"
        page-class="waves-effect"
      />
    </section>

    <p
      v-else
      class="center"
    >
      Записей пока нет.

      <router-link to="/record">Добавьте первую</router-link>
    </p>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination.mixin";
import HistoryTable from "@/components/history/HistoryTable.vue";

export default {
  name: 'History',
  components: {
    HistoryTable
  },
  mixins: [paginationMixin],
  data: () => ({
    isLoading: true,
    records: []
  }),
  async mounted() {
    const [records, categories] = await Promise.all([
      this.$store.dispatch('record/fetchRecords'),
      this.$store.dispatch('category/fetchCategories')
    ]);

    const categoriesMap = categories.reduce((acc, category) => {
      acc[category.id] = category.title;
      return acc;
    }, {});

    this.records = records.map(record => ({
      ...record,
      categoryName: categoriesMap[record.categoryId] || 'Неизвестная категория',
      typeClass: record.type === 'income' ? 'green' : 'red',
      typeText: record.type === 'income' ? 'Доход' : 'Расход',
    }));

    this.setupPagination(this.records)

    this.isLoading = false
  }
}
</script>
