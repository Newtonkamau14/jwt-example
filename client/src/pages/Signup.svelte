<script>

</script>

<main>
<form action="/user/signup" method="post">
      <div class="wrapper">
        <h1>Signup Page</h1>
        <br>
        <p>Create an account</p>
        <br>
          <input type="text" placeholder="Enter username" name="username" id="username"/>
          <input type="email" placeholder="Enter email" name="email" id="email"/>
          <input type="password" placeholder="Password" name="password" id="password"/>
        <button type="submit">Sign Up</button>
        <div class="not-member">Have an account? <a href="/user/login">Login</a></div>
      </div>
    </form>
</main>

<style>
.wrapper {
  width: 330px;
  padding: 2rem 0 1rem 0;
  margin: 50px auto;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
}
h1 {
  font-size: 2rem;
  color: #07001f;
}
p {
  margin-bottom: 1.7rem;
}
form input {
  width: 85%;
  outline: none;
  border: none;
  background: #dfe9f5;
  padding: 12px 14px;
  margin-bottom: 10px;
  border-radius: 10px;
}
button {
  font-size: 1.1rem;
  margin-top: 1rem;
  padding: 8px 0;
  border-radius: 5px;
  outline: none;
  border: none;
  width: 85%;
  background: tomato;
  color: #fff;
  cursor: pointer;
}
button:hover {
  background: rgba(122, 30, 30, 0.767);
}

.not-member {
  font-size: 0.8rem;
  margin-top: 1.4rem;
}
.not-member a {
  color: tomato;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

</style>