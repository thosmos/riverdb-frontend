<template>
  <div class="home">
    <sui-container>
      <sui-header size="huge"
                  textAlign="center">Participating Organizations:</sui-header>
      <organizations-list/>
    </sui-container>
  </div>
</template>

<script>
import OrganizationsList from "../components/OrganizationList";

export default {
  name: "home",
  components: { OrganizationsList }
};
</script>
