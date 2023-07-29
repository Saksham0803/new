// import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

// const UpdateShow = Vue.component('UpdateShow', {
//     template: `
//     <div>
//     <nav class="navbar navbar-expand-lg navbar-light bg-light">
//     <div class="container-fluid">
//       <router-link class="navbar-brand" style="font-weight: 1000; font-family: 'Poppins', sans-serif;color:rgb(192, 25, 192)" to="/">Ticker</router-link>
//       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
//         <span class="navbar-toggler-icon"></span>
//       </button>
//       <div class="collapse navbar-collapse d-md-flex justify-content-md-end" id="navbarNavDropdown">
//         <ul class="navbar-nav navbar-nav mr-auto">
//           <li class="nav-item">
//             <router-link class="nav-link active" aria-current="page" to="/home">Home</router-link>
//           </li>
//           <li class="nav-item">
//             <router-link v-if="is_ad" class="nav-link" to="/my_theaters">Theater</router-link>
//             <router-link v-if="is_ad" class="nav-link" to="/movies">Movies</router-link>
//             <router-link v-else class="nav-link" to="/my_tickets">My Tickets</router-link>
//           </li>
//           <li class="nav-item dropdown">
//             <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//               <span v-if="is_ad">Admin</span>
//             </a>
//             <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
//               <li><router-link class="nav-link" to="/">Logout</router-link></li>
//             </ul>
//           </li>
//         </ul>
//       </div>
//     </div>
//   </nav>
//   <div v-for="(category, message) in messages" :key="category" class="alert" :class="{'alert-danger': category === 'error', 'alert-success': category === 'success', 'alert-warning': category === 'warning', 'alert-secondary': category === 'note'}" role="alert">
//     {{ message }}
//     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//   </div>
//   <h3 style="display: flex; justify-content: center;align-items: center;padding-top:5%; font-weight:700">Update Show</h3>
//   <div class="form" style="display: flex; justify-content: center;align-items: center;padding-top:10px;padding-bottom:70px">
//     <form @submit.prevent="submitForm">
//       <div class="mb-3">
//         <label class="form-label">Select Movie</label>
//         <select class="form-select" aria-label="Select Movie" v-model="selectedMovie">
//           <option v-for="movie in movies" :key="movie.title" :value="movie.title">{{ movie.title }}</option>
//         </select>
//       </div>
//       <div class="mb-3">
//         <label class="form-label">Select theater</label>
//         <select class="form-select" aria-label="Select Theater" v-model="selectedTheater">
//           <option v-for="theater in theaters" :key="theater.id" :value="theater.id">{{ theater.name }}</option>
//         </select>
//       </div>
//       <div class="mb-3">
//         <label class="form-label">No of seats</label>
//         <input type="number" class="form-control" placeholder="Enter the total number of seats" v-model="prev_ava" min="0" required>
//       </div>
//       <div class="mb-3">
//         <label class="form-label">Cost per seat</label>
//         <input type="number" class="form-control" placeholder="cost for 1 seat" v-model="prev_cost" min="0" required>
//       </div>
//       <div class="mb-3">
//         <label class="form-label">Select Date Time</label>
//         <input type="datetime-local" class="form-control" v-model="show.datetime" required>
//       </div>
//       <button type="submit" class="btn btn-primary">Update Show</button>
//     </form>
//   </div>
//   </div>
//     `,
//     data() {
//         return {
//           selectedMovie: '',
//           selectedTheater: '',  
//           prev_cost :'',
//           prev_ava: '',
//           time:'',
//             user: {
//                 isAuthenticated: false,
//                 isAdmin: false,
//                 name: '',
//               },
//             is_ad: false,
//             show: {
//               movie: '',
//               t: '',
//               available_seats: '',
//               cost: '',
//               datetime: ''
//             },
//             movies: {},
//             theaters: {},
//             messages: [],
//         };
//     },
//     methods: {
//       async updateShow() {
//         this.show.movie = this.selectedMovie;
//         this.show.t = this.selectedTheater;
//         this.show.available_seats = this.prev_ava;
//         this.show.cost = this.prev_cost;
//         this.show.datetime = this.time;
  
//         // Make sure all properties are updated before making the request
//         await this.$nextTick();
  
//             axios.put(`/api/update_show/${this.show[0].id}`, this.show, { headers: {
//               'Authorization': 'Bearer ' + localStorage.getItem('access_token')
//           }
//       })
//                 .then(response => {
//                     // handle success
//                     this.$router.push('/my_theaters');
//                     this.messages.push({ category: 'success', message: 'Show updated successfully' });;
//                 })
//                 .catch(error => {
//                     // handle error
//                     this.messages.push({ category: 'error', message: 'Failed to update show' });
//                 });
//         },
//         fetchShowData() {
//           // Fetch movies
//           axios.get('movies',{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
//               .then(response => {
//                   this.movies = response.data.movies;
//               });
//           // Fetch theaters
//           axios.get('/api/my_theaters',{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
//               .then(response => {
//                   this.theaters = response.data.theater;
//                   this.show = response.data.show;
//                   console.log(this.show)
//                   this.selectedMovie = this.show[0].movie;
//                   this.selectedTheater = this.show[0].theater;
//                   this.prev_cost = this.show[0].cost;
//                   this.prev_ava = this.show[0].available_seats;
//                   this.time = this.show[0].time;
//                   console.log(this.selectedMovie,this.selectedTheater)
//               });
//       },
//       submitForm() {
//         this.updateShow();
//     }
//     },
//     created() {
//         this.fetchShowData();
//     },
//     mounted() {
//         axios.get('/api/check_admin',{headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }})
//       .then(response => {
//           this.is_ad = response.data.is_admin
//       })
//       .catch(error => {
//           console.error("Error fetching data:", error);
//       });
//     },
// });

// export default UpdateShow

import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const UpdateShow = Vue.component('UpdateShow', {
    data() {
        return {
            show: {
                id: this.$route.params.id,
                movie: '',
                t_in: '',
                datetime: '',
                available_seats: '',
                cost: ''
            },
            movies: {}, // to store the list of movies
            theaters: {}, // to store the list of theaters
            messages: [],
        }
    },
    methods: {
        updateShow() {
            axios.put('/api/update_show/' + this.show.id, this.show, { headers: {
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
                    this.movies = response.data.movies;
                    this.theaters = response.data.theater;
                    this.messages = response.data.messages;
                    console.log(this.movies,this.theaters)
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        },
        submitForm() {
            this.updateShow();
        }
        
    },
    mounted() {
        this.fetchData();
    },
    template: `
    <div>
        <!-- Your HTML form goes here, replace the form fields with v-model directives to bind them to your Vue data properties -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Show Ticket</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-md-flex justify-content-md-end" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/my_shows">My Shows</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/logout">Logout</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <h3 style="display: flex; justify-content: center;align-items: center;padding-top:5%; font-weight:700">Update Show</h3>

    <div class="form" style="display: flex; justify-content: center;align-items: center;padding-top:10px;padding-bottom:70px">
        <form @submit.prevent="submitForm">

        <div class="mb-3">
        <label class="form-label">Select Movie</label>
        <select class="form-select" aria-label="Select Movie" v-model="show.movie">
          <option v-for="movie in movies" :key="movie.title" :value="movie.title">{{ movie.title }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Select theater</label>
        <select class="form-select" aria-label="Select Theater" v-model="show.t_in">
          <option v-for="theater in theaters" :key="theater.id" :value="theater.id">{{ theater.name }}</option>
        </select>
      </div>


            <div class="mb-3">
                <label class="form-label">Date and Time</label>
                <input type="datetime-local" class="form-control" v-model="show.datetime">
            </div>

            <div class="mb-3">
                <label class="form-label">Available Seats</label>
                <input type="number" class="form-control" v-model="show.available_seats">
            </div>

            <div class="mb-3">
                <label class="form-label">Cost</label>
                <input type="number" class="form-control" v-model="show.cost">
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
    </div>
    `
});

export default UpdateShow
