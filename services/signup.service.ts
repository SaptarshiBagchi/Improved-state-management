export class SignupService {
  private workspace: string
  public company: Record<string, any>
  public user: Record<string, any>
  constructor(workspace: string) {
    this.workspace = workspace
    this.company = {}
    this.user = {}
  }

  //checks workspace in db
  private checkSlugExistsInDB() {
    const takenWorkspaces = ['fakeinc', 'etc', 'codeclouds']
    return takenWorkspaces.includes(this.workspace)
  }

  private checkWorkspaceInCloudFlare() {
    const takenWorkspaces = ['fakeinc', 'etc', 'codeclouds', 'codeclouds1', 'codecloudss1']
    return takenWorkspaces.includes(this.workspace)
  }

  public generateSlug() {
    const regenerateWorkspaceAndRecall = () => {
      this.workspace = this.workspace + this.workspace[this.workspace.length - 1] + 1
      this.generateSlug()
    }
    if (this.checkSlugExistsInDB()) regenerateWorkspaceAndRecall()
    if (this.checkWorkspaceInCloudFlare()) regenerateWorkspaceAndRecall()

    return this
  }

  public createCompany() {
    this.company = { workspace: this.workspace, id: 123 }
    //we can produce to kafka here
    return this
  }

  public createUser() {
    this.user = { company: this.company.id, name: 'TestUser', id: '123' }
    //we can create to kafka here as well
    return this
  }
}

export class SignupBuilder {
  static build(workspace: string): SignupService {
    return new SignupService(workspace).generateSlug().createCompany().createUser()
  }
}
