<template>
    <v-row class="signup-header-container">
        <v-col cols="10" offset="1" class="pl-11 pt-9">
            <v-row>
                <span class="logo-text purple">BLUE</span> 
                <span class="logo-text yellow">GAME</span> 
            </v-row>
            <v-row>
                <p class="logo-text2 white">
                    {{ t('signup.formPage.header.titleLine1') }} 
                    <br>
                    {{ t('signup.formPage.header.titleLine2') }} 
                </p>
            </v-row>
        </v-col>
        <img src="@/assets/bg-image1.svg" class="bg-image">
        <img src="@/assets/logo2.svg" class="logo-image">
        <img src="@/assets/coin-bg.svg" class="coin-image">
    </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

const SignupHeader = defineComponent({
    setup() {
        const { t } = useI18n();

        return {
            t,
        }
    }
})

export default SignupHeader
</script>

<style lang="scss">
    .signup-header-container {
        z-index: 1;
        height: 187px;
        margin: 0px !important;

        .v-col {
            z-index: 1;
        }
        img.bg-image {
            position: absolute;
            width: 100%;
            height: 187px;
            z-index: 0;
        }
        img.logo-image {
            position: absolute;
            top: 24px;
            left: 24px;
        }
        img.coin-image {
            position: absolute;
            top: -10px;
            right: 7px;
            width: 324px;
            height: 197px;
        }
    }
    .logo-text {
        font-family: 'Bauhaus 93';
        font-style: normal;
        font-weight: 400;
        font-size: 28px;
        line-height: 41px;
        text-shadow: #522A59 0px 2px 0px;
    }
    .logo-text2 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
    }
</style>