<template>
  <div id="footer"
       class="flex-row">
    <span>
      <h4>RiverDB &copy; {{year}}</h4>
    </span>
    <span>
      <h4>
        <!-- TODO: get real email address -->
        <a href="mailto:XXXXXXXXXXXXXXXXXXXXX@example.com">Contact:
          info@riverdb.org</a>
      </h4>
    </span>
  </div>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    year: function() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";

#footer {
  background: $blue;
  color: $offWhite;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  h4 {
    font-size: 1rem;
  }
  a {
    color: $offWhite;
  }
}

.flex-row {
  display: flex;
  justify-content: space-between;
}
</style>
