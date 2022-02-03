<script>
  export default {}
</script>

<template>
  <nav>
    <a href="#/">
      <img class logo src="/ttvdb-logo.png" alt="Site Logo" />
    </a>
    <ul>
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/about">About</RouterLink>
      </li>
    </ul>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
  nav {
    height: 200px;
    display: flex;
    background-color: #111;
    align-items: center;
    img {
      margin-left: 5em;
    }
    ul {
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      list-style-type: none;
      margin: 0 0 0 5em;
      padding: 0;
      overflow: hidden;
      background-color: #b50000;
      border-radius: 10px;
    }
    li {
      a {
        color: white;
        padding: 40px 50px 40px 50px;
        overflow: hidden;
        text-decoration: none;
      }
      a:hover {
        background-color: #830202;
      }
    }
  }
</style>
