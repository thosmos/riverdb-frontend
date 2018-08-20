<template>
  <div class="m-b-lg">
    <sui-divider></sui-divider>
    <sui-grid :columns="2"
              stackable>
      <sui-grid-column>
        <h5>
          <sui-icon name="user
           outline
           " /> {{info.contactPerson}}
        </h5>
      </sui-grid-column>
      <sui-grid-column>
        <h5>
          <sui-icon name="phone
           " /> {{info.phone}}
        </h5>
      </sui-grid-column>
      <sui-grid-column>
        <h5>
          <sui-icon name="envelope
           " /> {{info.email}}
        </h5>
      </sui-grid-column>
      <sui-grid-column>
        <h5>
          <sui-icon name="home
           " /> {{info.URL}}
        </h5>
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

<style>
</style>
