<template>
  <div class="ui centered grid">
    <div v-for="org in organizations"
         :key="org.abbreviation"
         class="five wide computer eight wide tablet sixteen wide mobile column">
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
