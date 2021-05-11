<template>
  <div id="org-page-contact">
    <h3 is="sui-header"
        class="ui center aligned"
        s>Contact:</h3>
    <sui-grid :columns="2"
              stackable>
      <sui-grid-column>
        <p>
          <b>
            <sui-icon name="user" /> {{info.PrimaryContact}}
          </b>
        </p>
      </sui-grid-column>
      <sui-grid-column>
        <p>
          <b>
            <sui-icon name="phone
           " /> {{info.Telephone}}
          </b>
        </p>
      </sui-grid-column>
      <sui-grid-column>
        <sui-icon name="envelope
           " />
        <b><a :href="`mailto:${info.Email}`">{{info.Email}} </a></b>
      </sui-grid-column>
      <sui-grid-column>
        <p>
          <b>
            <sui-icon name="home
           " />
            <a :href="info.WebAddress"
               target="_blank">{{info.WebAddress}}</a>
          </b>
        </p>
      </sui-grid-column>
    </sui-grid>
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  }
};
</script>

<style scoped lang="scss">
@import "../style/style.scss";

#org-page-contact {
  > h3 {
    padding: 0.5rem 1rem 1.25rem;
  }
  @extend .m-b-lg;
  padding: 1.5rem 2rem 2rem;
  background: $offWhite;
  border-top: 1px solid rgba(34, 36, 38, 0.15);
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  a {
    color: $primaryColor;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
