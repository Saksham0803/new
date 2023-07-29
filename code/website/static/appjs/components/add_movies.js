import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const AddMovies = Vue.component('AddMovies', {
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
              <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/my_theaters">Theater</router-link>
              <router-link class="nav-link active" to="/movies">Movies</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/my_tickets">My Tickets</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ user.name }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><router-link class="nav-link" to="/logout">Logout</router-link></li>
              </ul>
            </li>
            <li class="nav-item justify-content-end">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <h3 class="text-center font-weight-bold mt-5">Add Movie</h3>
    <div class="form d-flex justify-content-center align-items-center pb-5">
      <form @submit.prevent="addMovie">
        <div class="mb-3">
          <label class="form-label">Title</label>
          <input type="text" class="form-control" v-model="newMovie.title" />
        </div>
        <div class="mb-3">
          <label class="form-label">Genre</label>
          <input type="text" class="form-control" v-model="newMovie.Genre" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Rating (out of 5)</label>
          <input type="number" class="form-control" v-model="newMovie.rating" min="0" max="5" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Poster</label>
          <input type="file" class="form-control" accept="image/*" @change="handleFileSelect"/>
        </div>
        <button type="submit" class="btn btn-primary">Add Movie</button>
      </form>
    </div>
      </div>
    `,
    data() {
      return {
        newMovie: {
          title: '',
          Genre: '',
          rating: '',
          poster:'',
        },
          user: {
            isAuthenticated: false,
            isAdmin: localStorage.getItem('is_admin') === 'true' ? true : false,
            name: localStorage.getItem('name'),
        },
        messages: {},
        is_ad: false,
      };
    },
    methods: {
      handleFileSelect(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
  reader.onload = () => {
    this.newMovie.poster = reader.result;
  };
  console.log(this.newMovie.poster)
  reader.readAsDataURL(file);
},
      addMovie: function() {
          axios.post('/api/add_movies', {
            title: this.newMovie.title,
            Genre: this.newMovie.Genre,
            rating: this.newMovie.rating,
            poster: this.newMovie.poster
      },{headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
          .then(response => {
            this.messages.success = 'Your Movie is being added';
            this.title_m = '';
            this.Genre = '';
            this.rating = '';
            this.poster_m = '';
            this.$router.push('/movies');
          })
          .catch(error => {
            console.error(error);
          });
      },
      alertClass: function(category) {
        return `alert-${category}`;
      },
      dismissMessage: function(category) {
        delete this.messages[category];
      },
    },
    mounted() {
      axios.get('/api/check_admin',{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
      .then(response => {
          this.is_ad = response.data.is_admin
      })
      .catch(error => {
          console.error("Error fetching data:", error);
      });
  },
  });
  
  export default AddMovies