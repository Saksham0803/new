import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const Login = Vue.component('Login', {
    template : `

<div>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" style="font-weight: 1000; font-family: 'Poppins', sans-serif" href="/">Ticker</a>
    <!-- ... other nav items ... -->
    <ul class="navbar-nav navbar-nav mr-auto">
    <!--  <li class="nav-item">
        <router-link class="nav-link" to="/home">Home</router-link>
      </li>  -->
      <!-- ... other nav items ... -->
      <li class="nav-item">
        <router-link class="nav-link active" to="/sign_up">Register</router-link>
      </li>
    </ul>
  </div>
</nav>

<h3 style="display: flex; justify-content: center;align-items: center;padding-top:5%; font-weight:700">Login</h3>
<div class="form" style="display: flex; justify-content: center;align-items: center;padding-top:20px;padding-bottom:130px">
  <form @submit.prevent="login">
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input v-model="email" type="email" class="form-control" id="email" name="email">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input v-model="password" type="password" class="form-control" id="password" name="password">
    </div>
    <p>Are You Registered? <router-link to="/sign_up"> Register</router-link> </p>
    <button type="submit" class="btn btn-primary" >Login</button>
  </form>
</div>
</div>
    `,
    data() {
        return {
            password: '',
            email: '',
            is_admin:''
        }
    },
    methods: {
        login() {
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: this.email,
                    password: this.password,
                })
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log(username)
                    throw new Error("Invalid credentials");
                }
            })
            .then(data => {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('is_admin', data.is_admin);
                console.log(data.access_token)
                this.$router.push('/home');
                
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Invalid credentials. Please try again.");
            })
        }
    }
})


export default Login