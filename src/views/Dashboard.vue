<template>
  <div>
    <v-img 
      src="@/assets/background-image1.png" 
      class="background-img" 
    />
    <v-btn
      color="deep-purple-darken-3"
      class="register-button"
      @click="openDialog"
    >
      Register
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="471"
    >
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
        dialog: true,
        // dialog: false,
      });

      // methods
      const closeDialog = () => {
        state.dialog = false
      }
      const openDialog = () => {
        state.dialog = true
      }

      return {
        ...toRefs(state),
        closeDialog,
        openDialog,
      }
    },
    components: {
      Signup
    }
  })
  
  export default Dashboard
</script>

<style lang="scss">
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