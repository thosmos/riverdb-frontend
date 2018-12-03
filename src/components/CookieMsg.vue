<template>
  <div id="cookie-msg">
    <sui-message color="red">
      <sui-message-header>We're using cookies in order to understand how people
        are using our site</sui-message-header>
      <div class="m-t-md d-flex flex-row justify-content-center">
        <sui-button circular
                    fluid
                    color="red"
                    @click="cookiesOKClick">Thanks, I'm OK with that.</sui-button>
      </div>
    </sui-message>
  </div>
</template>

<script>
export default {
  name: "CookieMsg",
  methods: {
    cookiesOKClick: function() {
      this.$store.commit("ui/CLEAR_COOKIE_MSG");
      localStorage.setItem("cookiesOK", true);
    }
  }
};
</script>

<style lang="scss" scoped>
#cookie-msg {
  position: fixed;
  bottom: 0;
  right: 0;
  @media screen and (min-width: 992px) {
    body {
      width: 50%;
    }
  }
  @media screen and (max-width: 992px) {
    body {
      width: 100%;
    }
  }
  z-index: 3000;
  font-size: 0.8rem;
  button {
    font-size: 0.8rem;
  }
}
</style>
