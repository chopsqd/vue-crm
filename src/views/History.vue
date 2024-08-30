<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
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
import {Pie} from 'vue-chartjs'

export default {
  name: 'History',
  metaInfo: () => ({
    title: this.$title('Title_History')
  }),
  extends: Pie,
  components: {
    HistoryTable
  },
  mixins: [paginationMixin],
  data: () => ({
    isLoading: true,
    records: []
  }),
  methods: {
    async setup() {
      const [records, categories] = await Promise.all([
        this.$store.dispatch('record/fetchRecords'),
        this.$store.dispatch('category/fetchCategories')
      ]);

      // Пагинация
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

      // График
      this.renderChart({
        labels: categories.map(category => category.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: categories.map(category => {
            return this.records.reduce((total, record) => {
              if (record.categoryId === category.id && record.type === 'outcome') {
                total += +record.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })

      this.isLoading = false
    }
  },
  async mounted() {
    await this.setup()
  }
}
</script>
