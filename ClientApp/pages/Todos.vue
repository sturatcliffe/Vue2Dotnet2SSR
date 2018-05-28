<template>
  <div>
    <h2>Todos</h2>
    <ul>
      <li v-for="(item, index) in todos" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "todos",
  computed: {
    todos() {
      return this.$store.state.todos;
    }
  },
  asyncData({ store }) {
    debugger;
    return store.dispatch("fetchTodos");
  }
};
</script>
