<template>
  <div>
    <v-img 
      src="@/assets/background-image1.png" 
      class="background-img" 
    />
    <v-switch
      :label="currentLanguage === 'en' ? 'English' : '中文'"
      color="success"
      value="success"
      @change="toggleLanguage"
      hide-details
      class="toggle-language-switch"
    />
    <v-btn
      color="deep-purple-darken-3"
      class="register-button"
      @click="openDialog"
    >
      {{ t('main.signupButton') }}
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
  import { defineComponent, toRefs, reactive, watch, ref } from 'vue'
  import { useI18n } from 'vue-i18n';
  import { loadLang, setLang } from '@/locale/index'
  import Signup from '@/components/Signup/index.vue'
  import { onMounted } from 'vue';

  const Dashboard = defineComponent({
    setup() {
      // translation
      const { t } = useI18n();
      const currentLanguage = ref("en");

      // initiate component state
      const state = reactive({
        // dialog: true,
        dialog: false,
      });

      // methods
      const closeDialog = () => {
        state.dialog = false
      }
      const openDialog = () => {
        state.dialog = true
      }

      const toggleLanguage = () => {
        currentLanguage.value = currentLanguage.value === "en" ? "zh" : "en";
      }

      // watches
      watch(currentLanguage, (newLang, oldLang) => {
        setLang(newLang);
      });

      return {
        ...toRefs(state),
        currentLanguage,
        closeDialog,
        openDialog,
        toggleLanguage,
        t,
      }
    },
    components: {
      Signup
    }
  })
  
  export default Dashboard
</script>

<style lang="scss">
.toggle-language-switch {
  position: absolute;
  top: 1%;
  left: 56%;
}
.v-selection-control.v-selection-control--density-default {
  div.v-switch__track {
    background-color: #e9e9e9;
  }
  .v-label {
    font-size: larger;
    color: white;
    font-weight: 400;
  }
}
.v-selection-control.v-selection-control--dirty.v-selection-control--density-default {
  div.v-switch__track {
    background-color: rgb(76, 175, 80);
  }
}
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