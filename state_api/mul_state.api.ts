type FieldWithStates<T> = Record<string, { approved: T | null; pending: T | null; history: T[] }>

// I need an implementation that can hold multiple states
export class UserObject {
  protected userObject: Record<string, any>

  constructor() {
    this.userObject = {}
  }

  addFieldToObject(field: string) {
    this.userObject[field] = { approved: null, pending: null, history: [] }
  }

  setFieldInObject<T>(field: string, value: T) {
    this.userObject[field].pending = value
  }

  approveField(field: string) {
    if (this.userObject[field].approved) this.userObject[field].history.push(this.userObject[field].approved)
    this.userObject[field].approved = this.userObject[field].pending
    this.userObject[field].pending = null
  }
  returnObject() {
    return this.userObject
  }

  returnApprovedStates() {
    const returnObj = {}
    for (const key in this.userObject) {
      returnObj[key] = this.userObject[key].approved
    }
    return returnObj
  }
}
