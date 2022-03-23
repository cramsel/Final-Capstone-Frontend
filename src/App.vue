<script>
export default {
  data: function () {
    return {
      isLoggedIn: undefined,
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.getItem("jwt");
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="background-color: #444b6e !important">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">The Yardstick</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" v-if="!isLoggedIn" href="/login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" v-if="!isLoggedIn" href="/signup">Sign Up</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" v-if="isLoggedIn" href="/logout">Logout</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/builder">Song Builder</a>
          </li>
          <!-- <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> -->
        </ul>
        <!-- this is the search bar, will be modified with users if time allows -->
        <!-- <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form> -->
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style>
#nav {
  padding: 30px;
}

#nav-link {
  font-weight: bold;
  color: #bcecf0 !important;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
