/** Using factory pattern with builder */

abstract class ThirdPartyLoginProvider {
  /** Find activated user  */
  async fetchActiveUser(userData: { email: string; password: string }) {
    return new Promise<{ email: string; password: string }>((res, _j) => {
      res(userData)
    })
  }

  /** All of the common stuff with custom implementation needs to go here */
  abstract getThirdPartyUserDetails(userData: { email: string }): Promise<typeof userData>
}

class GoogleProviderSigninBuilder extends ThirdPartyLoginProvider {
  async getThirdPartyUserDetails(userData: {
    email: string
    password: string
  }): Promise<{ email: string; password: string; dp: string }> {
    return new Promise<{ email: string; password: string; dp: string }>((res, _) => {
      return res({ ...userData, dp: 'stuff.jpg' })
    })
  }
}

class MicrosoftProviderSigninBuilder extends ThirdPartyLoginProvider {
  async getThirdPartyUserDetails(userData: {
    email: string
    password: string
  }): Promise<{ email: string; password: string; dp: string }> {
    return new Promise<{ email: string; password: string; dp: string }>((res, _) => {
      return res({ ...userData, dp: 'stuff.jpg' })
    })
  }
}

/** The factory method */
class SocialLoginFactory {
  static getSocialLoginBuilder(provider: 'google' | 'microsoft'): ThirdPartyLoginProvider {
    // * This can be used dynamically as well like new[`${provider}ProviderSigninBuilder`](), but this is much easier to read
    switch (provider) {
      case 'google':
        return new GoogleProviderSigninBuilder()
      default:
        return new MicrosoftProviderSigninBuilder()
    }
  }
}

//  Builder builds our logic flow step by step (synonymous to our service)
class Builder {
  static async getSignedInUserCredentials(
    provider: 'google' | 'microsoft',
    userData: { email: string; password: string }
  ) {
    const thirdPartyProvider = SocialLoginFactory.getSocialLoginBuilder(provider)
    const userDetails = await thirdPartyProvider.fetchActiveUser(userData)
    if (!userDetails) throw new Error('User not active')
    return thirdPartyProvider.getThirdPartyUserDetails(userDetails)
  }
}

// Now our calling function. To be more precise, this is like a service
const fetchDetailsFromOurUser = Builder.getSignedInUserCredentials('google', {
  email: 'roni.bagchi@gmail.com',
  password: 'test123',
})
