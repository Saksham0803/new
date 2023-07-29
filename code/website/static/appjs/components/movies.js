import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const Movies = Vue.component('Movies', {
    template: `
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="{ path: '/' }" style="font-weight: 1000; font-family: 'Poppins', sans-serif">Ticker</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-md-flex justify-content-md-end" id="navbarNavDropdown">
        <ul class="navbar-nav navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/home">Home</router-link>
          </li>
          <!-- Use v-if to conditionally render elements -->
          <li class="nav-item" >  <!-- v-if="user.is_authenticated" --->
            <!-- Use v-if to conditionally render elements -->
            <router-link class="nav-link active" to="/my_theaters" v-if="is_ad">Theater</router-link>
            <router-link class="nav-link" to="/movies" v-if="is_ad">Movies</router-link>
            <router-link class="nav-link" to="/my_tickets" v-else>My Tickets</router-link>
          </li>
          <li class="nav-item dropdown" >  <!-- v-if="user.is_authenticated" -->
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <!-- Use v-if to conditionally render elements -->
              <span v-if="is_ad">Admin</span>
              <span v-else>User</span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link class="nav-link" to="/">Logout</router-link></li>
            </ul>
          </li>
         <!-- <li class="nav-item justify-content-end">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>  -->
        </ul>
      </div>
      </div>
    </nav>

    <div class="container-fluid pt-4 ps-5">
      <div class="row">
        <div class="col-10">
          <h5 class="fw-bold">Movies</h5>
        </div>
        <div class="col-2">
          <router-link class="btn btn-outline-dark btn-sm" :to="{ path: '/add_movies' }">Add Movies</router-link>
        </div>
      </div>

      <div class="cards-list">
        <template v-if="movies.length > 0">
          <div v-for="movie in movies" :key="movie.id" class="card">
       
          
          <div class="card_image">
          <img :src="'static/' + movie.title+'.jpg'">
        </div>
            <div class="card_image">
              <router-link :to="{ path: '/select_theaters/' + movie.id }" class="card_image">
              </router-link>
            </div>
            <div class="card_title">
              <p>{{ movie.title }}</p>
            </div>
            <div class="card_title">
              <router-link :to="{ path: '/update_movies/' + movie.id }" class="card-link">Update</router-link>
              <router-link :to="{ path: '/delete_movies/' + movie.id }" class="card-link">Delete</router-link>
            </div>
          </div>
        </template>
        <template v-else>
          <h2>No Movies Yet</h2>
        </template>
      </div>
    </div>
  </div>
    `,
    data() {
      return {
        movies: {},
        is_ad: false,
        user: {
          isAuthenticated: false,
          isAdmin: localStorage.getItem('is_admin') === 'true' ? true : false,
          name: localStorage.getItem('name'),
        },// Assume this data comes from an API or some other data source
      };
    },
    methods: {
      logPoster: function(poster) {
        console.log(poster);
        return poster;

      },
      fetchMovies() {
        // Fetch the movies data from an API and assign it to the movies data property
        // This is just a placeholder, replace with your actual API call
        axios.get('/movies',{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
          .then(response => {
            this.movies = response.data.movies;
          })
          .catch(error => {
            console.error(error);
          });
      },
      deleteMovie(movieId) {
        // Delete a movie by its ID
        // This is just a placeholder, replace with your actual API call
        axios.delete(`/api/movies/${movieId}`,{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
          .then(() => {
            // Remove the movie from the movies array
            this.movies = this.movies.filter(movie => movie.id !== movieId);
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    mounted() {
      axios.get('/api/check_admin',{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
        .then(response => {
            this.is_ad = response.data.is_admin
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
      this.fetchMovies();
    axios.get('/api/check_admin',{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
      .then(response => {
          this.is_ad = response.data.is_admin
      })
      .catch(error => {
          console.error("Error fetching data:", error);
      });
      
  },
  });
  
  export default Movies