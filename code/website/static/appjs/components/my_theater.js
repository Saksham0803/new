import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const MyTheaters = Vue.component('MyTheaters', {
    data() {
        return {
            my_show: {},
            my_theater: {},
            messages: [],
            is_ad: false,
            user: {
                isAuthenticated: false,
                isAdmin: localStorage.getItem('is_admin') === 'true' ? true : false,
                name: localStorage.getItem('name'),
              },
        };
    },
    created() {
        console.log('Component created');
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios.get('/api/my_theaters',{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
                .then(response => {
                    console.log(response.data);
                    this.my_theater = response.data.theater;
                    this.my_show = response.data.show;
                    console.log(this.my_theater[0])
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
            this.is_ad = response.data.is_admin
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    },
    
    template: `
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" style="font-weight: 1000; font-family: 'Poppins', sans-serif" to="/">Ticker</router-link>
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
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="container-fluid pt-4 ps-5">
          <div class="row">
            <div class="col-10">
              <h5 class="fw-bold">My Theaters</h5>
            </div>
            <div class="col-2">
              <router-link class="btn btn-outline-dark btn-sm" to="/add_theaters">Add Theaters</router-link>
            </div>
          </div>
        </div>
        <div class="container-fluid align-self-center" style="width: 100%;">
          <ol class="list-group-fluid list-group-numbered align-middle pt-4" style="width:500px;align-content:center">
            <li class="list-group-item d-flex justify-content-between align-items-start" v-for="theater in my_theater" :key="theater.id">
              <div class="ms-2 me-auto">
                <div class="fw-bold">{{ theater.name }}</div>
                {{ theater.address }}, <router-link class="card-link" :to="'/update_theatre/' + theater.id">Update</router-link>, <router-link class="card-link" :to="'/delete_theaters/' + theater.id">Delete</router-link>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <div class="col">
        <div class="container-fluid pt-4 ps-5">
          <div class="row">
            <div class="col-10">
              <h5 class="fw-bold">My Shows</h5>
            </div>
            <div class="col-2">
              <router-link class="btn btn-outline-dark btn-sm" to="/add_shows">Add Shows</router-link>
            </div>
          </div>
        </div>
        <div class="container-fluid align-self-center" style="width: 100%; margin-bottom: 120px">
          <ol class="list-group-fluid list-group-numbered align-middle pt-4" style="width:500px;align-content:center">
            <li class="list-group-item d-flex justify-content-between align-items-start" v-for="show in my_show" :key="show.id">
              <div class="ms-2 me-auto">
                <div class="fw-bold"><router-link class="link-dark" :to="'/show_tickets/' + show.id">{{ show.movie }}</router-link></div>
                {{ my_theater[0].name }}, {{ my_show[0].cost }} , {{ show.time }}, <router-link class="card-link" :to="'/update_show/' + show.id">Update</router-link>, <router-link class="card-link" :to="'/delete_shows/' + show.id">Delete</router-link>
              </div>
              <span class="badge bg-primary rounded-pill">{{show.available_seats}}</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  </div>
    `,
});

export default MyTheaters