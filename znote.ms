# note

- contextual content ( masi dipake apa enggak )
- context direction
- region hot issue
- Leader Persona Prediction

// prisma.schema model
model User {
  id         String    @id @default(cuid())
  name       String?
  email      String?   @unique
  password   String?
  phone      String?   @unique
  UserRole   UserRole? @relation(fields: [userRoleId], references: [id])
  userRoleId Int       @default(1)
}

convert into typecript interface with regex


const data = [{
    id: 89,
    candidate1Id: 1,
    candidate2Id: 1,
    cityId: 89,
    text: 'To create a new array with a specific number of elements using lodash, you can use the times function. This function takes two arguments: the number of iterations and the function that should be executed for each iteration. The function receives the current iteration index and returns the value to be included in the resulting array.',
    rate: '55',
    trust: '9',
    joy: '72',
    surprise: '96',
    anticipation: '82',
    sadness: '26',
    fear: '65',
    anger: '63',
    disgust: '6'
  }, {
    id: 88,
    candidate1Id: 1,
    candidate2Id: 1,
    cityId: 88,
    text: 'To create a new array with a specific number of elements using lodash, you can use the times function. This function takes two arguments: the number of iterations and the function that should be executed for each iteration. The function receives the current iteration index and returns the value to be included in the resulting array.',
    rate: '51',
    trust: '84',
    joy: '12',
    surprise: '42',
    anticipation: '30',
    sadness: '45',
    fear: '39',
    anger: '61',
    disgust: '93'
  }]

  please convert to sql string insert,  use javascript 

  