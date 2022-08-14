## This is a Repo of good coding principles I came across in my software engineering journey (Typically with OOP concepts)

---

### Third party login providers in a combination with Factory and Builder design pattern

Separating the logic into responsible components help to not only scale but maintain the code a lot easier

I have created an abstract class as a contract which every third party provider needs to implement and extend. By separating the builder logic into its separate class helps to keep the business logic in place while automatically scaling with any provider as long as the providers are following the same principles
