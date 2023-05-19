<template>
  <div class="text-center">
    <img src="@/assets/background-image.png" class="background-img">
    <v-dialog
      v-model="dialog"
      width="471"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="deep-purple-darken-3"
          v-bind="props"
          class="register-button"
        >
          Register
        </v-btn>
      </template>
      <Signup @close="closeDialog" />
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import { defineComponent, toRefs, reactive } from 'vue'
  import Signup from '@/components/Signup/index.vue'

  const Dashboard = defineComponent({
    setup() {
      // initiate component state
      const state = reactive({
        dialog: false,
      });

      const closeDialog = () => {
        state.dialog = false
      }

      return {
        ...toRefs(state),
        closeDialog,
      }
    },
    components: {
      Signup
    }
  })
  
  export default Dashboard
</script>
<style>
.background-img {
  width: 100%;
  margin-bottom: -20px;
}
.register-button {
  position: absolute;
  right: 21.0%;
  top: 1.3%;
  width: 6.3%;
  height: 4.2% !important;
}
</style>