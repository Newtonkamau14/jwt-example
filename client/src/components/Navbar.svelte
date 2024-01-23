<script>
  let user;
</script>

<main>
  <nav class="primary-navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/">About</a></li>
      <li>
        {#if user}
          <a href="/"
            >{user.username}<span style="margin-left: 5px;"
              ><i class="fa-solid fa-sort-down"></i></span
            ></a
          >
          <ul class="dropdown">
            <li>
              <span style="color: #ffc107; margin-right: 5px;"
                ><i class="fa-solid fa-repeat"></i></span
              ><a style="color: #ffc107;" href="/user/changepassword"
                >Change Password</a
              >
            </li>
            <li>
              <span style="color: #6c757d; margin-right: 5px;"
                ><i class="fa-solid fa-user-minus"></i></span
              ><a style="color: #6c757d;" href="/user/logout">Logout</a>
            </li>
            <li>
              <span style="color: #DC3545;"
                ><i class="fa-solid fa-trash"></i></span
              ><a
                style="color: #DC3545; margin-left: 5px;"
                href="/user/deleteaccount">Delete Account</a
              >
            </li>
          </ul>
        {/if}
      </li>
    </ul>
  </nav>
</main>

<style>
  nav.primary-navigation {
    margin: 0 auto;
    display: block;
    padding: 120px 0 0 0;
    text-align: center;
    font-size: 16px;
  }
  nav.primary-navigation ul li {
    list-style: none;
    margin: 0 auto;
    border-left: 2px solid #3ca0e7;
    display: inline-block;
    padding: 0 30px;
    position: relative;
    text-decoration: none;
    text-align: center;
    font-family: arvo;
  }
  nav.primary-navigation li a {
    color: black;
  }
  nav.primary-navigation li a:hover {
    color: #3ca0e7;
  }
  nav.primary-navigation li:hover {
    cursor: pointer;
  }
  nav.primary-navigation ul li ul {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    padding-left: 0;
    left: 0;
    display: none;
    background: white;
  }
  nav.primary-navigation ul li:hover > ul,
  nav.primary-navigation ul li ul:hover {
    visibility: visible;
    opacity: 1;
    display: block;
    min-width: 250px;
    text-align: left;
    padding-top: 20px;
    box-shadow: 0px 3px 5px -1px #ccc;
  }
  nav.primary-navigation ul li ul li {
    clear: both;
    width: 100%;
    text-align: left;
    margin-bottom: 20px;
    border-style: none;
  }
  nav.primary-navigation ul li ul li a:hover {
    padding-left: 10px;
    border-left: 2px solid #3ca0e7;
    transition: all 0.3s ease;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    color: #3ca0e7;
  }
  ul li ul li a {
    transition: all 0.5s ease;
  }
</style>
