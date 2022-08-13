export type StateType<T> = Record<string, { approved: T | null; pending: T | null; history: T[] }>

export class StateManagement<T> {
  // A state is a record of a key and three types. 1. Pending 2. Approved 3. History
  protected state: StateType<T>
  constructor() {
    this.state = {}
  }
  // Add a key to the state machine
  addFieldToState(field: string) {
    if (!this.state[field]) this.state[field] = { approved: null, pending: null, history: [] }
  }

  setField(field: string, value: T) {
    // @ts-ignore
    if (this.state[field].pending) this.state[field].history.push(this.state[field].pending)
    this.state[field].pending = value
  }

  getApprovedStateOfField(field: string) {
    return this.state[field].approved
  }

  getPendingStateOfField(field: string) {
    return this.state[field].pending
  }
  getHistoryOfaField(field: string) {
    return this.state[field].history
  }

  approveAField(field: string) {
    if (this.state[field].pending) {
      //@ts-ignore
      if (this.state[field].approved) this.state[field].history.push(this.state[field].approved)
      this.state[field].approved = this.state[field].pending
      this.state[field].pending = null
    }
  }
  returnState() {
    return this.state
  }
}
