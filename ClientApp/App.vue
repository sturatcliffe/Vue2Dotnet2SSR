<template>
  <div>
    <h1>Todos SSR</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/todos">Todos</router-link>
    </nav>
    
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

