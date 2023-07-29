import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const UpdateTheater = Vue.component('UpdateTheater', {
    data() {
        return {
            user: {
                isAuthenticated: false,
                isAdmin: false,
                name: '',
              },
            theater: {
                id: this.$route.params.id,
                name: '',
                address: ''
            },
            is_ad: false,
            messages: [],
        }
    },
    methods: {
        updateTheater() {
            axios.put('/api/update_theatre/' + this.theater.id, this.theater, { headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('access_token')
          }
      })
                .then(response => {
                    this.$router.push('/my_theaters');
                })
                .catch(error => {
                    console.log(error);
                });
        },
        fetchData() {
            axios.get('/api/my_theaters',{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
                .then(response => {
                    console.log(response.data);
                    this.my_theater = response.data.theater;
                    this.my_show = response.data.show;
                    console.log(this.my_show)
                    this.messages = response.data.messages;
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                })
                ;
        },
        submitForm() {
            this.updateTheater();
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
        <router-link class="navbar-brand" style="font-weight: 1000; font-family: 'Poppins', sans-serif;color:rgb(192, 25, 192)" to="/">Ticker</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-md-flex justify-content-md-end" id="navbarNavDropdown">
          <ul class="navbar-nav navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item" v-if="user.isAuthenticated">
              <router-link class="nav-link active" v-if="user.isAdmin" to="/my_theaters">Theater</router-link>
              <router-link class="nav-link" v-if="user.isAdmin" to="/movies">Movies</router-link>
              <router-link class="nav-link" v-else to="/my_tickets">My Tickets</router-link>
            </li>
            <li class="nav-item dropdown" >   <!-- v-if="user.isAuthenticated" -->
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span v-if="is_ad">Admin</span>
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><router-link class="nav-link" to="/">Logout</router-link></li>
              </ul>
            </li>
            <!--  <li class="nav-item justify-content-end" v-else>
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>   -->
          </ul>
        </div>
      </div>
    </nav>
    <h3 style="display: flex; justify-content: center;align-items: center;padding-top:5%; font-weight:700">Update Theater</h3>

    <div class="form" style="display: flex; justify-content: center;align-items: center;padding-top:10px;padding-bottom:70px">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input type="Text" class="form-control" placeholder="Name of your theater" v-model="theater.name">
        </div>

        <div class="mb-3">
          <label class="form-label">Address</label>
          <input type="Text" class="form-control" placeholder="Enter exact address" v-model="theater.address">
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
    `
});

export default UpdateTheater