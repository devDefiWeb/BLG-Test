<template>
    <div class="signup-container">
        <SignupHeader v-if="currentPage !== PAGE_TYPE.DISPLAY_NAME" />
        <v-row class="signup-body pt-6">
            <!-- SIGN UP FORM  -->
            <v-form v-if="currentPage === PAGE_TYPE.SIGNUP_FORM" ref="form">
                <v-row class="relative mt-0">
                    <v-text-field 
                        label="Email Address"
                        class="form-textfield dark-textfield" 
                        variant="solo"
                        density="comfortable"
                        v-model="formData.emailAddress"
                        :onblur="handleOnEmailInputBlur"
                    />
                    <ValidationBox
                        v-if="isShowEmailValidaton"
                        title="Please fill in this field"
                        :withCautionIcon="false"
                    />
                </v-row>
                <v-row class="mt-2 relative">
                    <v-text-field 
                        label="Password"
                        class="form-textfield dark-textfield" 
                        variant="solo"
                        density="comfortable"
                        :type="isShowPassword ? 'text' : 'password'"
                        :append-inner-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        v-model="formData.password"
                        :onfocus="handleOnPasswordInputFocus"
                        :onblur="handleOnPasswordInputBlur"
                        @click:append-inner="isShowPassword = !isShowPassword"
                    />
                    <ValidationBox
                        v-if="isShowPasswordValidation"
                        :descriptionList="passwordValidationStrList"
                        :validationList="passwordValidationList"
                    />
                </v-row>
                <v-row class="mt-4">
                    <v-text-field 
                        label="Referral/Promo Code(Optional)"
                        class="form-textfield normal-textfield" 
                        variant="solo"
                        density="comfortable"
                        v-model="formData.promoCode"
                        :onfocus="handleOnPromoCodeInputFocus"
                    />
                </v-row>
                <v-row class="mt-2">
                    <v-col cols="1" class="pl-1">
                        <v-checkbox
                            v-model="formData.isAgreed"
                            color="success"
                            hide-details
                            class="agreement-checkbox"
                        />
                    </v-col>
                    <v-col cols="10">
                        <p class="agreement-text">
                            I agree to the <span class="white pointer">User Agreement & confirm</span> I am at least 18 years old
                        </p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-btn
                        class="ma-3 button-bright"
                        width="-webkit-fill-available"
                        height="60px"
                        :disabled="!isFormDataReady"
                        :onclick="handleSignupFormSubmit"
                    >
                        Sign Up
                    </v-btn>
                </v-row>
                <v-row>
                    <v-col cols="8" class="pr-0">
                        <p class="signin-text">Already have an account? </p>
                    </v-col>
                    <v-col cols="4">
                        <p class="signin-text2">Sign in </p>
                    </v-col>
                </v-row>
                <v-row class="mt-2">
                    <p class="divide-text">OR</p>
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
            <!-- Already registered notification -->
            <v-row v-if="currentPage == PAGE_TYPE.ALREADY_REGISTERED">
                Already registered.
            </v-row>
            <!-- Confirm cancel. -->
            <v-row v-if="currentPage == PAGE_TYPE.CONFIRM_CANCEL">
                Confirm cancel.
            </v-row>
            <!-- Enter avatar and display name -->
            <div v-if="currentPage == PAGE_TYPE.DISPLAY_NAME" class="full-width">
                <v-row class="carousel-container ml-0">
                    <v-carousel
                        height="400"
                        show-arrows
                        hide-delimiters
                        class="carousel"
                    >
                        <template v-slot:prev="{ props }">
                            <v-btn
                                class="button-carousel ma-2"
                                variant="text"
                                icon="mdi-chevron-left"
                                @click="props.onClick"
                            ></v-btn>
                        </template>
                        <template v-slot:next="{ props }">
                            <v-btn
                                class="button-carousel ma-2"
                                variant="text"
                                icon="mdi-chevron-right"
                                @click="props.onClick"
                            ></v-btn>
                        </template>
                        <v-carousel-item
                            v-for="(slide, i) in slides"
                            :key="i"
                        >
                            <img src="@/assets/Avatar/1.svg">
                        </v-carousel-item>
                    </v-carousel>
                </v-row>
                <v-row class="mt-4 mb-2">
                    <p class="label-text-bg white full-width center">
                        Enter a display name
                    </p>
                </v-row>
                <v-row class="mt-4 relative">
                    <v-text-field 
                        label="Username"
                        class="form-textfield dark-textfield" 
                        variant="solo"
                        density="comfortable"
                        v-model="userName"
                        :onfocus="handleOnUserNameInputFocus"
                        :onblur="handleOnUserNameInputBlur"
                    />
                    <ValidationBox
                        v-if="isShowUsernameValidation"
                        title="This is the name others will see on Blue.game"
                        :descriptionList="userNameValidationStrList"
                        :validationList="userNameValidationList"
                    />
                </v-row>
                <v-row>
                    <v-btn
                        class="ma-3 mt-8 button-bright"
                        width="-webkit-fill-available"
                        height="60px"
                        :disabled="!validateUserName()"
                        :onclick="handleUsernameSubmit"
                    >
                        Submit
                    </v-btn>
                </v-row>
            </div>
        </v-row>
        <v-btn
            class="close-button"
            icon="true"
            @click="$emit('close')"
        >
            <v-icon :color="currentPage === PAGE_TYPE.DISPLAY_NAME ? '#7782AA' : '#FFFFFF'">
                mdi-close
            </v-icon>
        </v-btn>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue';
import ValidationBox from '@/components/Signup/ValidationBox.vue';
import SignupHeader from '@/components/Signup/Header.vue';

const Signup = defineComponent({
    components: {
        ValidationBox,
        SignupHeader,
    },
    setup() {
        // initiate component state
        const state = reactive({
            currentPage: 0,  // default signup form
            dialog: true,
            isAgreed: false,
            iconNameList: [
                "Facebook",
                "Twitter",
                "Tiktok",
                "Linkedin",
            ],
            PAGE_TYPE: {
                SIGNUP_FORM: 0,
                CONFIRM_CANCEL: 1,
                ALREADY_REGISTERED: 2,
                DISPLAY_NAME: 3,
            },
            formData: {
                emailAddress: "",
                password: "",
                promoCode: "",
                isAgreed: false,
            },
            userName: "",
            isShowPassword: false,
            // isShowEmailValidaton: true,
            isShowEmailValidaton: false,
            // isShowPasswordValidation: true,
            isShowPasswordValidation: false,
            isShowUsernameValidation: false,
            passwordValidationStrList: [
                "8-30 Characters in length",
                "Contains one upper and one lowercase character",
                "Contains a number",
            ],
            userNameValidationStrList: [
                "2-20 characters in length",
                "Nickname must not be like your email",
            ],
            colors: [
                'indigo',
                'warning',
                'pink darken-2',
                'red lighten-1',
                'deep-purple accent-4',
            ],
            slides: [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Fifth',
            ],
        });

        // computed variables
        const isFormDataReady = computed((): boolean => 
            validateEmail() && validatePassword() && state.formData.isAgreed
        )

        const passwordValidationList = computed((): boolean[] => {
            const password = state.formData.password;
            // 8-30 Characters in length
            const condition1 = password.length <= 30 && password.length >= 8;
            // Contains one upper and one lowercase character
            const condition2 = /[A-Z]/.test(password) && /[a-z]/.test(password);
            // Contains a number
            const condition3 = /\d/.test(password);

            return [condition1, condition2, condition3];
        })

        const userNameValidationList = computed((): boolean[] => {
            const username = state.userName;
            // 2-20 characters in length
            const condition1 = username.length <= 20 && username.length >= 2;
            // Nickname must not be like your email
            const condition2 = !(username.toLowerCase().trim() === state.formData.emailAddress.toLowerCase().trim());

            return [condition1, condition2];
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
            return passwordValidationList.value.reduce((res, item) => res && item, true)
        }
        
        const validateUserName = (): boolean => {
            return userNameValidationList.value.reduce((res, item) => res && item, true)
        }

        // event handler functions, needs to be updated
        const handleOnPasswordInputFocus = (): void => {
            handleValidateEmail();
            if (validateEmail()) {
                state.isShowPasswordValidation = true;
            }
        }

        const handleOnPasswordInputBlur = (): void => {
            // state.isShowPasswordValidation = true;
            state.isShowPasswordValidation = false;
        }

        const handleOnUserNameInputFocus = (): void => {
            state.isShowUsernameValidation = true;
        }

        const handleOnUserNameInputBlur = (): void => {
            state.isShowUsernameValidation = false;
        }
        
        const handleOnPromoCodeInputFocus = (): void =>  {
            handleValidateEmail();
        }
        
        const handleOnEmailInputBlur = (): void => {
            handleValidateEmail();
        }

        // handle form submit
        const handleSignupFormSubmit = (): void => {
            state.currentPage = state.PAGE_TYPE.DISPLAY_NAME;
            console.log('sign up form submit!');
        }

        const handleUsernameSubmit = (): void => {
            console.log('user name submit!');
        }

        return {
            ...toRefs(state),
            isFormDataReady,
            passwordValidationList,
            userNameValidationList,
            validateUserName,
            handleOnPasswordInputFocus,
            handleOnPasswordInputBlur,
            handleOnUserNameInputFocus,
            handleOnUserNameInputBlur,
            handleOnPromoCodeInputFocus,
            handleOnEmailInputBlur,
            handleSignupFormSubmit,
            handleUsernameSubmit,
        }
    },
  })
  
  export default Signup
  </script>
  <style lang="scss">
    // container
    .signup-container {
        background-color: #2E274C;
        border-radius: 16px !important;
    } 
    // wrapper
    .signup-body {
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
    // ask signin text
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
        }
    }
    // carousel
    .carousel-container {
        width: 100%;
    }
  </style>