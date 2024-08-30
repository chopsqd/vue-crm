<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title | localize }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['value'],
  data: () => ({
    links: [
      {title: 'Menu_Bill', url: '/', exact: true},
      {title: 'Menu_History', url: '/history'},
      {title: 'Menu_Planning', url: '/planning'},
      {title: 'Menu_NewRecord', url: '/record'},
      {title: 'Menu_Categories', url: '/categories'}
    ]
  })
}
</script>
