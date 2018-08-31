<template>
  <div id="org-page-contact"
       class="m-b-lg">
    <sui-divider></sui-divider>
    <h3 is="sui-header"
        class="ui center aligned"
        s>Contact:</h3>
    <sui-grid :columns="2"
              stackable>
      <sui-grid-column>
        <p>
          <b>
            <sui-icon name="user" /> {{info.contactPerson}}
          </b>
        </p>
      </sui-grid-column>
      <sui-grid-column>
        <p>
          <b>
            <sui-icon name="phone
           " /> {{info.phone}}
          </b>
        </p>
      </sui-grid-column>
      <sui-grid-column>
        <p>
          <b>
            <sui-icon name="envelope
           " /> {{info.email}}
          </b>
        </p>
      </sui-grid-column>
      <sui-grid-column>
        <p>
          <b>
            <sui-icon name="home
           " />
            <a :href="info.URL"
               target="_blank">{{info.URL}}</a>
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

<style scoped>
#org-page-contact h5 a {
  color: rgba(0, 0, 0, 0.87);
}
</style>
