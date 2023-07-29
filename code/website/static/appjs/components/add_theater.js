import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const AddTheater = Vue.component('AddTheater', {
    data() {
      return {
        newTheater: {
          name: '',
          address: ''},
          user: {
            isAuthenticated: false,
            isAdmin: localStorage.getItem('is_admin') === 'true' ? true : false,
            name: localStorage.getItem('name'),
          },
        messages: {},
        is_ad: false
      }
    },
    methods: {
      addTheater: function() {
        axios.post('/api/add_theaters', {
          name: this.newTheater.name,
          address: this.newTheater.address
        },{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
        .then(response => {
          this.messages.success = 'Your Theater is being added';
          this.newTheater.name = '';
          this.newTheater.address = '';
          this.$router.push('/my_theaters');
        })
        .catch(error => {
          this.messages.error = 'Fill all the fields';
        });
      },
      alertClass: function(category) {
        return `alert-${category}`;
      },
      dismissMessage: function(category) {
        delete this.messages[category];
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
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" v-if="is_ad" to="/my_theaters">Theater</router-link>
              <router-link class="nav-link" v-if="is_ad" to="/movies">Movies</router-link>
              <router-link class="nav-link" v-else to="/my_tickets">My Tickets</router-link>
            </li>
            <li class="nav-item dropdown">
              <router-link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ is_ad ? 'Admin' : 'user' }}
              </router-link>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><router-link class="nav-link" to="/logout">Logout</router-link></li>
              </ul>
            </li>
           <!-- <li class="nav-item justify-content-end" v-else>
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>  -->
          </ul>
        </div>
      </div>
    </nav>
    <h3 style="display: flex; justify-content: center;align-items: center;padding-top:5%; font-weight:700">Add Theater</h3>
<div class="form" style="display: flex; justify-content: center;align-items: center;padding-top:10px;padding-bottom:70px">
    <form @submit.prevent="addTheater">
        <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" placeholder="Name of your theater" v-model="newTheater.name">
        </div>
        <div class="mb-3">
            <label class="form-label">Address</label>
            <input type="text" class="form-control" placeholder="Enter exact address" v-model="newTheater.address">
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>

      </div>
    `
  });
  
  export default AddTheater