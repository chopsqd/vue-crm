<template>
  <div>
    <Loader v-if="isLoading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link
          to="/history"
          class="breadcrumb"
        >
          История
        </router-link>
        <a
          @click.prevent
          class="breadcrumb"
        >
          {{record.type === 'income' ? 'Доход' : 'Расход'}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              'red': record.type === 'outcome',
              'green': record.type === 'income'
            }"
          >
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount | currency}}</p>
              <p>Категория: {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p
      v-else
      class="center"
    >
      Запись с id: <i>{{$route.params.id}}</i> не найдена
    </p>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  metaInfo: () => ({
    title: this.$title('Title_Detail')
  }),
  data: () => ({
    isLoading: true,
    record: null
  }),
  async mounted() {
    const {id} = this.$route.params

    const record = await this.$store.dispatch('record/fetchRecordById', id)
    const category = await this.$store.dispatch('category/fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title
    }

    this.isLoading = false
  }
}
</script>
