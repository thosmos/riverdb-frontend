<template>
  <div id="footer"
       class="flex-row">
    <span>
      <h4>RiverDB &copy; {{year}}</h4>
    </span>
    <span>
      <h4>
        <a href="mailto:info@riverdb.org">Contact: info@riverdb.org</a>
      </h4>
    </span>
    <span><a href="mailto:support@riverdb.org">Support: support@riverdb.org</a></span>
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
  flex-direction: row;
  /* align-items: center; */
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
