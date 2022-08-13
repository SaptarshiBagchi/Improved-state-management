import { StateManagement } from './state.api'

describe('State test suite for a string', () => {
  const userState = new StateManagement<string>()

  it('Should add a field to the state', () => {
    userState.addFieldToState('email')
    expect(userState.returnState()).toEqual({
      email: { approved: null, pending: null, history: [] },
    })
  })

  it('Should add a field to the state and set it to pending', () => {
    userState.setField('email', 'roni.bagchi@gmail.com')
    expect(userState.returnState()).toEqual({
      email: { approved: null, pending: 'roni.bagchi@gmail.com', history: [] },
    })
  })

  it('Should approve a field and history should be null while setting pending to null', () => {
    userState.approveAField('email')
    expect(userState.returnState()).toEqual({
      email: { approved: 'roni.bagchi@gmail.com', pending: null, history: [] },
    })
  })

  it('Should reset the field to add another value', () => {
    userState.setField('email', 'test@gmail.com')
    expect(userState.returnState()).toEqual({
      email: { approved: 'roni.bagchi@gmail.com', pending: 'test@gmail.com', history: [] },
    })
  })

  it('Should approve a field and history should be null while setting pending to null', () => {
    userState.approveAField('email')
    expect(userState.returnState()).toEqual({
      email: { approved: 'test@gmail.com', pending: null, history: ['roni.bagchi@gmail.com'] },
    })
  })
})

describe('State test suite for an object', () => {
  const userState = new StateManagement<{ supervisor: string; tl: string }>()
  it('Should add a field to the state', () => {
    userState.addFieldToState('senior')
    expect(userState.returnState()).toEqual({
      senior: { approved: null, pending: null, history: [] },
    })
  })
  it('Should set a field to pending', () => {
    userState.setField('senior', { supervisor: 'raunak', tl: 'indranil' })
    expect(userState.returnState()).toEqual({
      senior: {
        approved: null,
        pending: { supervisor: 'raunak', tl: 'indranil' },
        history: [],
      },
    })
  })

  it('Should approve a field', () => {
    userState.approveAField('senior')
    expect(userState.returnState()).toEqual({
      senior: {
        approved: { supervisor: 'raunak', tl: 'indranil' },
        pending: null,
        history: [],
      },
    })
  })
})
