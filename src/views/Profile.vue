<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form
      class="form"
      @submit.prevent="submitHandler"
    >
      <div class="input-field">
        <input
          v-model="name"
          id="description"
          type="text"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required
          }"
        >
        <label for="description">{{'Name' | localize}}</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >
          {{'Error_EnterName' | localize}}
        </small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale"/>
          <span class="lever"/>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";

export default {
  name: 'Profile',
  metaInfo: () => ({
    title: this.$title('Title_Profile')
  }),
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  validations: {
    name: {required}
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      await this.$store.dispatch('info/updateInfo', {
        name: this.name,
        locale: this.isRuLocale ? 'ru-RU' : 'en-US'
      })
    }
  },
  mounted() {
    const {name, locale} = this.$store.getters["info/info"]

    this.name = name
    this.isRuLocale = locale === 'ru-RU'

    setTimeout(() => {
      M.updateTextFields()
    })
  }
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
