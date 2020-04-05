const userTypes = () => `
    type ResetSuccessType {
      ok: Boolean,
      message: String!
    }

    input ProfileInputType {
      firstname: String
      lastname: String
    }

    input PasswordInputType {
      password: String!
    }

    type ProfileSuccessType {
      firstname: String
      lastname: String
      _id: String
    }

    type EmailRequestSuccessType {
        ok: Boolean
        message: String
        hashToken: String!
    }

    type UserInfoType {
      email: String!
      id: ID!
      firstname: String
      lastname: String
    }

    type UserLoginSuccessType {
      message: String!
      token: String!
      user: UserInfoType!
    }

    input UserLoginInputType {
      email: String!
      password: String!
    }

    input ResetPasswordInputType {
      password: String!
      hashToken: String!
    }

    input UserForgotPasswordInputType {
      email: String!
    }

    input UserRegisterInputType {
      email: String!
      password: String!
    }


    input EmailVerificationInputType {
      hashToken: String!
      otp: String!
    }

    extend type Query {
      login(input: UserLoginInputType!): UserLoginSuccessType!
      profile: UserInfoType!
    }

    extend type Mutation {
      register(input: UserRegisterInputType!): EmailRequestSuccessType
      emailVerificationByOtp(input: EmailVerificationInputType!): EmailRequestSuccessType
      userForgotpassword(input: UserForgotPasswordInputType!): EmailRequestSuccessType
      userResetPassword(input: ResetPasswordInputType!): ResetSuccessType,
      updateProfile(input: ProfileInputType): ProfileSuccessType,
      updatePassword(input: PasswordInputType!): SuccessType,
    }
`;

module.exports = {
  userTypes: userTypes()
};
