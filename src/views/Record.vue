<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="isLoading"/>

    <p
      v-else-if="!categories.length"
      class="center"
    >
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <form
      v-else
      class="form"
      @submit.prevent="submitHandler"
    >
      <div class="input-field">
        <select
          ref="select"
          v-model="category"
        >
          <option
            v-for="c in categories"
            :key="c.id"
            :value="c.id"
          >
            {{ c.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{
            invalid: $v.amount.$dirty && !$v.amount.minValue
          }"
        >
        <label for="amount">Сумма</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
        >
            Минимальное значение {{ $v.amount.$params.minValue.min }}
          </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required
          }"
        >
        <label for="description">Описание</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >
            Введите описание
          </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";

export default {
  name: 'Record',
  metaInfo: () => ({
    title: this.$title('Title_Record')
  }),
  data: () => ({
    select: null,
    isLoading: true,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: {
      minValue: minValue(1)
    },
    description: {
      required
    }
  },
  computed: {
    info() {
      return this.$store.getters["info/info"]
    },
    canCreateRecord() {
      return this.type === 'income' || this.info.bill >= this.amount;
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (!this.canCreateRecord) {
        return this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
      }

      const recordData = {
        categoryId: this.category,
        amount: this.amount,
        description: this.description,
        type: this.type,
        date: new Date().toJSON()
      }

      await this.$store.dispatch('record/createRecord', recordData)

      const bill = this.type === 'income'
        ? this.info.bill + this.amount
        : this.info.bill - this.amount

      await this.$store.dispatch('info/updateInfo', {bill})

      this.$message('Запись успешно создана')
      this.$v.$reset()
      this.amount = 1
      this.description = ''
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('category/fetchCategories')
    this.isLoading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
