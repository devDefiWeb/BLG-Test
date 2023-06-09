<template>
    <div class="login-container">
        <LoginHeader v-if="currentPage === PAGE_TYPE.LOGIN_FORM" />
        <v-row class="login-body pt-6">
            <!-- SIGN UP FORM  -->
            <v-form v-if="currentPage === PAGE_TYPE.LOGIN_FORM" ref="form" class="full-width">
                <v-row class="relative mt-0">
                    <v-text-field 
                        :label="t('signup.formPage.emailAddress')"
                        class="form-textfield dark-textfield" 
                        variant="solo"
                        density="comfortable"
                        v-model="formData.emailAddress"
                    />
                </v-row>
                <v-row class="mt-2 relative">
                    <v-text-field 
                        :label="t('signup.formPage.password')"
                        class="form-textfield dark-textfield" 
                        variant="solo"
                        density="comfortable"
                        :type="isShowPassword ? 'text' : 'password'"
                        :append-inner-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        v-model="formData.password"
                        @click:append-inner="isShowPassword = !isShowPassword"
                    />
                </v-row>
                <v-row>
                    <p class="ml-9 login-forget-passwrod-text" 
                        @click="currentPage = PAGE_TYPE.FORGOT_PASSWORD"
                    >
                        {{ t('login.formPage.forgetPassword') }}
                    </p>
                </v-row>
                <v-row class="mt-12">
                    <v-btn
                        class="ma-3 button-bright text-none"
                        width="-webkit-fill-available"
                        height="60px"
                        :disabled="!isFormDataReady"
                        :onclick="handleLoginFormSubmit"
                    >
                        {{ t('login.formPage.button') }}
                    </v-btn>
                </v-row>
                <v-row class="d-flex justify-center mb-6 mt-10">
                    <p class="signin-text mr-2">{{ t('login.formPage.donthaveAccount') }}</p>
                    <p class="signin-text2"
                        @click="$emit('switch')"
                    >
                        {{ t('login.formPage.createOne') }}
                    </p>
                </v-row>
                <v-row class="mt-2">
                    <p class="divide-text">
                        {{ t('signup.formPage.divider') }}
                    </p>
                    <v-divider
                        color="white"
                    />
                </v-row>
                <v-row class="mt-10">
                    <v-col cols="8" offset="2">
                        <div class="d-flex justify-space-around bg-surface-variant social-icon-wrapper">
                            <v-sheet
                                v-for="n in 4"
                                :key="n"
                                color="#131828"
                                class="rounded"
                            >
                                <v-btn
                                    color="grey-darken-4"
                                    class="social-icon-button"  
                                    icon=""
                                >
                                    <img :src="`src/assets/${iconNameList[n - 1]}.svg`" />
                                </v-btn>
                            </v-sheet>
                        </div>
                    </v-col>
                </v-row>
            </v-form>
            <!-- Forgot password -->
            <div v-if="currentPage == PAGE_TYPE.FORGOT_PASSWORD" class="full-width">
                <v-row class="mt-8 d-flex justify-center">
                    <img src="@/assets/logo2.svg" class="logo-image mr-2">
                    <span class="logo-text purple text-large">BLUE</span> 
                    <span class="logo-text yellow text-large">GAME</span> 
                </v-row>
                <v-row class="mt-8">
                    <p class="label-text-md2 white center full-width pl-12 pr-12">
                        {{ t('login.forgotPasswordPage.title') }}
                    </p>
                </v-row>
                <v-row class="relative mt-8">
                    <v-text-field 
                        :label="t('signup.formPage.emailAddress')"
                        class="form-textfield dark-textfield" 
                        variant="solo"
                        density="comfortable"
                    />
                </v-row>
                <v-row class="mt-8">
                    <v-btn
                        class="ma-3 button-bright text-none"
                        width="-webkit-fill-available"
                        height="60px"
                        autocapitalize="off"
                        @click="snackbar = true"
                    >
                        {{ t('login.forgotPasswordPage.submit') }}
                    </v-btn>
                </v-row>
            </div>
        </v-row>
        <v-btn
            class="close-button"
            icon="true"
            @click="$emit('close')"
        >
            <v-icon :color="currentPage !== PAGE_TYPE.LOGIN_FORM ? '#7782AA' : '#FFFFFF'">
                mdi-close
            </v-icon>
        </v-btn>
        <v-snackbar
            v-model="snackbar"
            multi-line
            color="#181522"
            class="snack-bar"
        >
            <template v-slot:actions>
                <v-icon class="ml-4 mr-4" color="#01983A" size="x-large">
                    mdi-check
                </v-icon>
                <p class="label-text-sm slate-gray notification-text">
                    {{ t('login.forgotPasswordPage.notification') }}
                </p>
                <v-btn
                class="close-button mt-3 mr-2"
                variant="text"
                @click="snackbar = false"
                >
                    <v-icon :color="currentPage !== PAGE_TYPE.LOGIN_FORM ? '#7782AA' : '#FFFFFF'">
                        mdi-close
                    </v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import LoginHeader from '../Login/Header.vue'

const Login = defineComponent({
    components: {
        LoginHeader,
    },
    setup() {
        // translation
        const { t } = useI18n();

        // initiate component state
        const state = reactive({
            currentPage: 0,  // default login form
            PAGE_TYPE: {
                LOGIN_FORM: 0,
                FORGOT_PASSWORD: 1,
            },
            formData: {
                emailAddress: "",
                password: ""
            },
            iconNameList: [
                "Facebook",
                "Twitter",
                "Tiktok",
                "Linkedin",
            ],
            isShowPassword: false,
            snackbar: false,
        });

        // computed variables
        const isFormDataReady = computed((): boolean => 
            state.formData.emailAddress.length > 0 && state.formData.password.length > 0
        )

        // methods
        const handleLoginFormSubmit = (): void => {
            state.currentPage = state.PAGE_TYPE.FORGOT_PASSWORD;
        }

        return {
            t,
            ...toRefs(state),
            isFormDataReady,
            handleLoginFormSubmit,
        }
    },
  })
  
  export default Login
  </script>
  <style lang="scss">
    // container
    .login-container {
        background-color: #2E274C;
        border-radius: 16px !important;
    } 
    // wrapper
    .login-body {
        margin: 0px !important;
        padding: 48px;
    }
    // close modal button
    .close-button {
        box-shadow: none !important;
        background-color: transparent !important;
        position: absolute !important;
        top: 5px;
        right: 5px;
    }
    // divider
    .divide-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        color: #414968;
        position: relative;
        top: 12px;
        text-align: center;
        width: 120px;
        background-color: #2E274C;
        margin: auto;
        z-index: 1;
    }
    // social icon list component
    .social-icon-wrapper {
        background-color: #2E274C !important;
  
        .v-sheet {
            border-radius: 50px !important;
        }
    }
    .social-icon-button {
        background-color: #131828 !important;
    }
    .login-forget-passwrod-text {
        cursor: pointer;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #7782AA;
    }
    .text-large {
        font-size: 32px !important;
    }
    .snack-bar {
        .v-overlay__content  {
            position: absolute;
            bottom: 85% !important;
            left: 85% !important;
        }

        .notification-text {
            width:  207px;
        }
    }
  </style>