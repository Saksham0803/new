import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const AddShow = Vue.component('AddShow', {
    template: `
      <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <router-link class="navbar-brand" style="font-weight: 1000; font-family: 'Poppins', sans-serif;color:rgb(192, 25, 192)" to="/">Ticker</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse d-md-flex justify-content-md-end" id="navbarNavDropdown">
          <ul class="navbar-nav navbar-nav mr-auto">
              <li class="nav-item">
                <router-link to="/" class="nav-link active" exact>Home</router-link>
              </li>
              <li class="nav-item">
                <router-link v-if="user.isAdmin" to="/my_theaters" class="nav-link">Theater</router-link>
                <router-link v-if="user.isAdmin" to="/movies" class="nav-link">Movies</router-link>
                <router-link v-else to="/my_tickets" class="nav-link">My Tickets</router-link>
              </li>
              <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ user.isAdmin ? 'Admin' : 'user' }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><router-link to="/logout" class="nav-link">Logout</router-link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <h3 style="display: flex; justify-content: center;align-items: center;padding-top:5%; font-weight:700">Add Show</h3>
    <div class="form" style="display: flex; justify-content: center;align-items: center;padding-top:10px;padding-bottom:70px">
      <form @submit.prevent="addShow">
        <div class="mb-3">
          <label class="form-label">Movie</label>
          <select class="form-select" aria-label="Select Theater" v-model="selectedMovie">
          <option v-for="movie in my_movies" :key="movie.title" :value="movie.title">{{ movie.title }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Theater</label>
        <select class="form-select" aria-label="Select Theater" v-model="selectedTheater">
          <option v-for="theater in my_theater" :key="theater.id" :value="theater.id">{{ theater.name }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">No of seats</label>
        <input type="number" class="form-control" v-model="noOfSeats" required>
        </div>
        <div class="mb-3">
        <label class="form-label">Cost per ticket</label>
        <input type="number" class="form-control" v-model="cost" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Show Time</label>
          <input type="datetime-local" class="form-control" v-model="showTime" required>
        </div>
        <button class="btn btn-primary" type="submit">Add Show</button>
      </form>
    </div>
  </div>
    `,
    data() {
      return {
      my_theater: {},
      my_movies:{},
      selectedMovie: '',
      selectedTheater: '',
      noOfSeats: '',
      cost:'',
      showTime: '',
      movies: [],
        user: {
          isAuthenticated: false,
          isAdmin: localStorage.getItem('is_admin') === 'true' ? true : false,
          name: localStorage.getItem('name'),
        },
      };
    },
    methods: {
      addShow() {
        const showData = {
          movie: this.selectedMovie,
          t_in: this.selectedTheater,
          available_seats: this.noOfSeats,
          cost: this.cost,
          date_time: this.showTime,
        };
        axios.post('/api/add_shows', showData,{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
        .then(() => {
          this.selectedMovie = '';
          this.selectedTheater = '';
          this.noOfSeats = '';
          this.showTime = '';
          this.$router.push('/my_theaters');
        })
          .catch(error => {
            console.error(error);
          });
      },
      fetchData() {
        axios.get('movies',{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
            .then(response => {
                console.log(response.data);
                this.my_theater = response.data.theater;
                this.my_movies = response.data.movies;
                console.log(this.my_theater);     
                this.messages = response.data.messages;
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            })
            ;
    }
    },
    mounted() {
      axios.get('/api/check_admin',{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
      .then(response => {
          this.is_ad = response.data.is_admin;
          this.fetchData();
      })
      .catch(error => {
          console.error("Error fetching data:", error);
      });
  },
  });

  export default AddShow