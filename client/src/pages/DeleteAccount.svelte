<script>
</script>

<main>
  <div class="container">
    <div class="col-sm-6 col-md-6">
      <div class="alert alert-warning mt-2">
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
        >
        </button>
        <span class="glyphicon glyphicon-record"></span>
        <strong>Warning Message</strong>
        <hr class="message-inner-separator" />
        <p>Are you sure you want to delete your account?</p>
      </div>
      <div class=" m-3">
        <form class="p-0 m-0" action="/user/deleteaccount" method="post">
          <button class="btn btn-danger btn-lg p-3 m-2" type="submit"
            >Delete Account</button
          >
        </form>
        <a class="btn btn-primary btn-lg p-3 m-2" href="/">Go to homepage</a>
      </div>
    </div>
  </div>
</main>

<style>
</style>
