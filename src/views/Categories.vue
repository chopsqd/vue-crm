<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="isLoading"/>

      <div v-else class="row">
        <CategoryCreate @created="addNewCategory"/>

        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="updateCount"
          @updated="updateCategories"
        />

        <p v-else class="center">Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/category/CategoryCreate.vue";
import CategoryEdit from "@/components/category/CategoryEdit.vue";

export default {
  name: 'Categories',
  data: () => ({
    categories: [],
    isLoading: true,
    updateCount: 0
  }),
  components: {
    CategoryCreate,
    CategoryEdit
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const index = this.categories.findIndex(item => item.id === category.id)
      this.categories[index].title = category.title
      this.categories[index].limit = category.limit
      this.updateCount++
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('category/fetchCategories')
    this.isLoading = false
  }
}
</script>
