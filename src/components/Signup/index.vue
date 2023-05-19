<template>
    <div class="signup-container">
        <v-row class="signup-header pd-0">
            <div class="header-picture pd-0">
                <img src="@/assets/Rectangle 60.svg" class="header-background-image">
                <img src="@/assets/logo 2.svg" class="header-logo-image">
                <div class="header-text-wrapper">
                    <span class="header-text purple">BLUE</span> 
                    <span class="header-text yellow">GAME</span> 
                    <br>
                    <p class="header-text2 white">
                        Register at 
                        <br>
                        BLUE.GAME
                    </p>
                </div>
                <img src="@/assets/Coin.svg" class="header-image">
                <v-btn
                    class="close-button"
                    icon="true"
                    @click="$emit('close')"
                >
                    <v-icon color="white">mdi-close</v-icon>
                </v-btn>
            </div>
        </v-row>
        <v-row class="signup-body">
        <v-form ref="form">
            <v-row v-if="isShowEmailValidaton" class="email-validation-container">
                <div class="email-validation">
                    <img src="@/assets/Caution.svg" width="16" class="email-validation-img" />
                    <span class="label-text email-validation-span">Please fill in this field</span>
                </div>
            </v-row>
            <v-row style="margin-top: -20px;">
                <v-text-field 
                    label="Email Address"
                    class="form-textfield dark-textfield" 
                    variant="solo"
                    density="comfortable"
                    v-model="formData.emailAddress"
                    :onblur="handleOnEmailInputBlur"
                />
            </v-row>
            <v-row style="margin-top: 12px;">
                <v-text-field 
                    label="Password"
                    class="form-textfield dark-textfield" 
                    variant="solo"
                    density="comfortable"
                    type="password"
                    v-model="formData.password"
                    :onfocus="handleOnPasswordInputFocus"
                />
            </v-row>
            <v-row style="margin-top: 24px;">
                <v-text-field 
                    label="Referral/Promo Code(Optional)"
                    class="form-textfield normal-textfield" 
                    variant="solo"
                    density="comfortable"
                    v-model="formData.promoCode"
                    :onfocus="handleOnPromoCodeInputFocus"
                />
            </v-row>
            <v-row style="margin-top: -4px;">
                <v-col md="1" lg="1" sm="1" class="pl-1">
                    <v-checkbox
                        v-model="formData.isAgreed"
                        color="success"
                        hide-details
                        class="agreement-checkbox"
                    ></v-checkbox>
                </v-col>
                <v-col md="10" lg="10" sm="10">
                    <p class="agreement-text">
                        I agree to the <span class="white">User Agreement & confirm</span> I am at least 18 years old
                    </p>
                </v-col>
            </v-row>
            <v-row>
                <v-btn
                    class="signup-button"
                    :color="isFormDataReady ? '#32CFEC' : '#353652'"
                    width="-webkit-fill-available"
                    height="60px"
                    rounded="12px"
                    :disabled="!isFormDataReady"
                    :onclick="handleSignupFormSubmit"
                >
                    <p :class="isFormDataReady ? 'button-text black' : 'button-text white'">
                        Sign Up
                    </p>
                </v-btn>
            </v-row>
            <v-row>
                <v-col md="8" lg="8" sm="8" class="pr-0">
                    <p class="signin-text">Already have an account? </p>
                </v-col>
                <v-col md="4" lg="4" sm="4">
                    <p class="signin-text2">Sign in </p>
                </v-col>
            </v-row>
            <v-row style="margin-top: 12px;">
                <p class="divide-text">OR</p>
                <v-divider
                    color="white"
                />
            </v-row>
            <v-row style="margin-top: 40px; margin-bottom: -20px;">
                <v-col md="2" lg="2" sm="2" />
                    <v-col md="8" lg="8" sm="8">
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
                <v-col md="2" lg="2" sm="2" />
            </v-row>
        </v-form>
    </v-row>
    </div>
  </template>
  <script lang="ts">
  import { toRefs } from 'vue';
import { computed } from 'vue';
import { defineComponent, reactive } from 'vue'
  
  const Signup = defineComponent({
    setup() {
        // initiate component state
        const state = reactive({
            dialog: true,
            isAgreed: false,
            iconNameList: [
                "Facebook",
                "Twitter",
                "Tiktok",
                "Linkedin",
            ],
            formData: {
                emailAddress: "",
                password: "",
                promoCode: "",
                isAgreed: false,
            },
            isShowEmailValidaton: false,
            isShowPasswordValidation: false,
        });

        // computed variables
        const isFormDataReady = computed(() => {
            return validateEmail() && validatePassword() && state.formData.isAgreed
        })

        // validation functions
        const validateEmail = (): boolean => {
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            const isMatch = state.formData.emailAddress.match(validRegex);

            return !!isMatch;
        }

        const handleValidateEmail = (): void => {
            if (validateEmail()) {
                state.isShowEmailValidaton = false;
            } else {
                state.isShowEmailValidaton = true;
            }
        }
        
        const validatePassword = (): boolean => {
            return !!state.formData.password.length;
        }

        // event handler functions, needs to be updated
        const handleOnPasswordInputFocus = (): void => {
            handleValidateEmail();
        }
        
        const handleOnPromoCodeInputFocus = (): void =>  {
            handleValidateEmail();
        }
        
        const handleOnEmailInputBlur = (): void => {
            handleValidateEmail();
        }

        // handle form submit
        const handleSignupFormSubmit = (): void => {
            console.log('sign up form submit!');
        }

        return {
            ...toRefs(state),
            isFormDataReady,
            handleOnPasswordInputFocus,
            handleOnPromoCodeInputFocus,
            handleOnEmailInputBlur,
            handleSignupFormSubmit,
        }
    },
  })
  
  export default Signup
  </script>
  <style lang="scss">
    // global （need to move to global）
    .label-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #7782AA;
    }
    .purple {
        color: #637BF9 !important;
    }
    .yellow {
        color: #F9BC01 !important;
    }
    .white {
        color: #FFFFFF !important;
    }
    .black {
        color: #000000 !important;
    }
    .dark-textfield .v-field__field {
        background-color: #211F31;
    }
    .normal-textfield .v-field__field {
        background-color: #29263C;
    }
    .custom-text-field {
        box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12);
    }
    .form-textfield {
        margin: 12px;
        height: 48px;
  
        div.v-field__field {
            padding-left: 8px;
            box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12);
            border-radius: 12px;

            input {
                color: white;
            }
  
            label.v-label.v-field-label {
                color: #7782AA; 
            }
        }
    }
    // signup containers
    .signup-container {
    }
    .signup-header {
        z-index: 1;
        height: 187px;
        margin: 0px !important;
    }
    .signup-body {
        margin: 0px !important;
        background: #2E274C;
        padding: 48px;
        border-radius: 0px 0px 16px 16px;
    }
    // header
    .header-text-wrapper {
        position: relative;
        left: 71px;
        top: -29px;
    }
    .header-image {
        position: absolute;
        top: -10px;
        right: 9px;
        visibility: visible;
        width: 324px;
        height: 197px;
    }
    .header-text {
        font-family: 'Bauhaus 93';
        font-style: normal;
        font-weight: 400;
        font-size: 28px;
        line-height: 41px;
        text-shadow: #522A59 0px 2px 0px;
    }
    .header-text2 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
    }
    .header-background-image {
        width: 100%;
        height: 187px;
        position: absolute;
        z-index: -1;
    }
    .header-logo-image {
        position: relative;
        top: 24px;
        left: 24px;
    }
    .close-button {
        box-shadow: none !important;
        background-color: transparent !important;
        position: absolute !important;
        top: 5px;
        right: 5px;
    }
    // email validation component
    .email-validation-span {
        margin-top: 22px !important;
        margin-left: 10px;
    }
    .email-validation-img {
        position: relative;
        top: 2px;
    }  
    
    .email-validation-container {
        display: flex;
        flex-direction: column;
        position: relative;
        top: -6px
    }
    .email-validation-container::after{
        display: flex;
        content: "";
        position: relative;
        align-self: center;
        float: right;
        top: -2px;
        bottom: 0px;
        right: 0px;
        width: 0px;
        height: 0px;
        border: 9px solid #211f31;
        border-right-color: transparent;
        border-left-color: transparent;
        border-bottom-color: transparent;
        z-index: 2;
        border-right-width: 5px;
        border-left-width: 5px;
    }
    .email-validation {
        width: 375px;
        height: 60px;
        border-radius: 12px;
        z-index: 2;
        background: #211F31;
        box-shadow: inset 2px 0px 4px 1px rgba(0, 0, 0, 0.12);
        margin: auto;
        padding-top: 16px;
        padding-left: 107px;
        position: relative;
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
    .signup-button {
        cursor: pointer;
        margin: 12px;
    }
    // sign in label 
    .button-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        color: #000000;
        text-align: center;
    }
    .signin-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
        text-align: right;
    }
    .signin-text2 {
        cursor: pointer;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 800;
        font-size: 16px;
        line-height: 19px;
        color: #32CFEC;
    }
    // agreement
    .agreement-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        margin-top: 13px;
        color: #7782AA;
    }
    .agreement-checkbox {
        i.mdi-checkbox-blank-outline {
            color: #13121d
            // color: #211F31
        }
    }
  </style>