import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const Home = Vue.component('Home', {
  template: `
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" style="font-weight: 1000; font-family: 'Poppins', sans-serif">Ticker</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="search-bar">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="search" placeholder="Search for anything" v-model="search">
        <button @click="search">Search</button>
      </div>
      <div class="select">
        <select class="form-select" v-model="option">
          <option value="Movie Name">Movie Name</option>
          <option value="rating greater than">rating greater than</option>
          <option value="rating less or equal to">rating less or equal to</option>
          <option value="Genre">Genre</option>
        </select>
      </div>
      <div class="collapse navbar-collapse d-md-flex justify-content-md-end" id="navbarNavDropdown">
        <ul class="navbar-nav navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/home" class="nav-link active" aria-current="page">Home</router-link>
          </li>
          <li class="nav-item" >   <!-- v-if="user.isAuthenticated" -->
            <div v-if="user.isAdmin">
              <router-link to="/my_theaters" class="nav-link">Theater</router-link>
              <router-link to="/movies" class="nav-link">Movies</router-link>
            </div>
            <div v-else>
              <router-link to="/my_tickets" class="nav-link">My Tickets</router-link>
            </div>
          </li>
          <li class="nav-item dropdown" >  <!-- v-if="user.isAuthenticated"  -->
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{ user.isAdmin ? 'Admin' : 'User' }}
            </a> 
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link to="/" class="nav-link">Logout</router-link></li>
            </ul>
          </li>
         <!-- <li class="nav-item justify-content-end" v-else>
            <router-link to="/" class="nav-link">Login</router-link>
          </li>  -->
        </ul>
      </div>
    </div>
    </nav>
    <div class="banner">
      <img src="../static/banner.png" alt="banner">
    </div>
    <div class="cards-list">
      <div v-if="movies.length > 0" v-for="movie in movies" :key="movie.id" class="card">
      {{ logPoster(movie.poster) }}
        <div class="card_image">
          <img src="static/Avatar.jpg">
        </div>
        <a :href="'/select_theaters/' + movie.id" class="link-dark">
          <div class="card_title" style="padding-bottom:10px">
            <p>{{ movie.title }}</p>
          </div>
          <div class="card_title">
            rating - {{ movie.rating }}
          </div>
          <div class="card_title">
            Genre - {{ movie.genre }}
          </div>
        </a>
      </div>
      <h2 v-else>No Movies Yet</h2>
    </div>
  </div>
  `,
  data: function() {
    return {
      movies: [],
      search: '',
      option: '',
      user: {
        isAuthenticated: false,
        isAdmin: localStorage.getItem('is_admin') === 'true' ? true : false,
        name: localStorage.getItem('name'),
      },
    };
  },
  methods: {
    logPoster: function(poster) {
      console.log(poster);
    },
    fetchMovies: function() {
      axios.get('movies', {headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
        .then(response => {
          console.log(response.data);
          this.movies = response.data.movies;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
  created: function() {
    this.fetchMovies();
  },
});



export default Home