export type langType = {
  main: {
    signupButton: string,
  },
  signup: {
    formPage: {
      header: {
        titleLine1: string,
        titleLine2: string,
      },
      emailAddress: string,
      password: string,
      validation: {
        email: {
          title: string,
          title2: string,
        },
        password: {
          items: [
            string,
            string,
            string,
          ]
        },
      },
      promoCode: string,
      agree: {
        prefix: string,
        bold: string,
        suffix: string,
      },
      alreadyAccount: string,
      signIn: string,
      button: string,
      divider: string,
    },
    confirmCancelPage: {
      title: string,
      description: string,
      continue: string,
      cancel: string,
    },
    alreadyRegisterPage: {
      title: string,
      confirm: string,
      cancel: string,
    },
    displayNamePage: {
      title: string,
      username: string,
      validation: {
        username: {
          title: string,
          items: [
            string,
            string,
          ]
        }
      },
      submit: string,
    },
  }
};