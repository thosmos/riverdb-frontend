<template>
  <div id="cookie-msg">
    <sui-message color="red">
      <sui-message-header>We're using cookies</sui-message-header>
      <p>
        In order to understand how people are using our site we're using cookies
      </p>
      <div class="m-t-md d-flex flex-row justify-content-center">
        <sui-button circular
                    fluid
                    secondary
                    basic
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
  left: 0;
  right: 0;
  z-index: 3000;
}
</style>
