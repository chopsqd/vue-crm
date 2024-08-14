<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select
            v-model="current"
            ref="select"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{category.title}}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{
              invalid: $v.title.$dirty && !$v.title.required
            }"
          >
          <label for="name">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{
              invalid: $v.limit.$dirty && !$v.limit.minValue
            }"
          >
          <label for="limit">Лимит</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >
            Минимальное значение {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";

export default {
  name: 'CategoryEdit',
  props: ['categories'],
  data: () => ({
    select: null,
    current: null,
    title: '',
    limit: 100
  }),
  validations: {
    title: {
      required
    },
    limit: {
      minValue: minValue(100)
    }
  },
  watch: {
    current(categoryId) {
      const {title, limit} = this.categories.find(c => c.id === categoryId)
      this.title = title
      this.limit = limit
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const categoryData = {
        id: this.current,
        title: this.title,
        limit: this.limit
      }

      await this.$store.dispatch('category/updateCategory', categoryData)

      this.$message('Категория успешно обновлена')
      this.$emit('updated', categoryData)
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    M.updateTextFields()
    this.select = M.FormSelect.init(this.$refs.select)
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
