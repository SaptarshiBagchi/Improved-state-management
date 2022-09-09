import { SignupBuilder } from '../signup.service'
describe('Signup Service test', () => {
  it('Should create a workspace with a company successfully', () => {
    const result = SignupBuilder.build('codeclouds')
    expect(result.company).toEqual({
      id: 123,
      workspace: 'codecloudss111',
    })
    expect(result.company).toEqual({
      id: 123,
      workspace: 'codecloudss111',
    })

    expect(result.user).toEqual({
      id: '123',
      name: 'TestUser',
      company: result.company.id,
    })
  })
})
