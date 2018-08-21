<template>
  <div class="ui centered grid stackable">
    <div v-for="org in organizations"
         :key="org.abbreviation"
         class="four wide computer six wide tablet  column">
      <organization-card :org="org"></organization-card>
    </div>
  </div>
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
