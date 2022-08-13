import { UserObject } from './mul_state.api'

describe('mul state test suite', () => {
  const userObject = new UserObject()
  it('Should add a field to the object', () => {
    userObject.addFieldToObject('email')
    expect(userObject.returnObject()).toEqual({
      email: { approved: null, pending: null, history: [] },
    })
  })

  it('Should set a field to the object', () => {
    userObject.setFieldInObject<string>('email', 'roni.bagchi@gmail.com')
    expect(userObject.returnObject()).toEqual({
      email: { approved: null, pending: 'roni.bagchi@gmail.com', history: [] },
    })
  })
  it('Should add another field with a different type to the object', () => {
    userObject.addFieldToObject('reportingTo')
    userObject.setFieldInObject<string[]>('reportingTo', ['raunak', 'rana'])
    userObject.addFieldToObject('employment')
    userObject.setFieldInObject<{ location: string; doj: string }>('employment', { location: 'home', doj: 'noyb' })
    expect(userObject.returnObject()).toEqual({
      email: { approved: null, pending: 'roni.bagchi@gmail.com', history: [] },
      reportingTo: { approved: null, pending: ['raunak', 'rana'], history: [] },
      employment: { approved: null, pending: { location: 'home', doj: 'noyb' }, history: [] },
    })
  })

  it('should approve a state', () => {
    userObject.approveField('reportingTo')
    expect(userObject.returnObject()).toEqual({
      email: { approved: null, pending: 'roni.bagchi@gmail.com', history: [] },
      reportingTo: { approved: ['raunak', 'rana'], pending: null, history: [] },
      employment: { approved: null, pending: { location: 'home', doj: 'noyb' }, history: [] },
    })
  })
})
