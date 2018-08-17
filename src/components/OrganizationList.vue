<template>
  <sui-grid :columns="3"
            centered
            stackable>
    <sui-grid-column v-for="org in organizations">
      <organization-card :org="org"></organization-card>
    </sui-grid-column>
  </sui-grid>
</template>

<script>
import organizations from "../assets/organizations.js";
import OrganizationCard from "./OrganizationCard";

export default {
  name: "OrganizationsCards",
  components: {
    OrganizationCard
  },
  data() {
    return {
      organizations
    };
  }
};
</script>

<style>
</style>
