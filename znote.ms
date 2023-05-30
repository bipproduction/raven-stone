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


const data = [
  [
    {
      "title": "Pekerja Keras",
      "value": 87
    },
    {
      "title": "Cerdas",
      "value": 11
    },
    {
      "title": "Jujur",
      "value": 88
    },
    {
      "title": "Merakyat",
      "value": 92
    },
    {
      "title": "Tegas",
      "value": 21
    },
    {
      "title": "Berpengalaman Memimpin",
      "value": 0
    },
    {
      "title": "Berprestasi",
      "value": 0
    },
    {
      "title": "Latar Belakang Militer",
      "value": 0
    },
    {
      "title": "Agamis",
      "value": 0
    }
  ],
  [
    {
      "title": "Pekerja Keras",
      "value": 13
    },
    {
      "title": "Cerdas",
      "value": 1
    },
    {
      "title": "Jujur",
      "value": 2
    },
    {
      "title": "Merakyat",
      "value": 10
    },
    {
      "title": "Tegas",
      "value": 2
    },
    {
      "title": "Berpengalaman Memimpin",
      "value": 0
    },
    {
      "title": "Berprestasi",
      "value": 0
    },
    {
      "title": "Latar Belakang Militer",
      "value": 0
    },
    {
      "title": "Agamis",
      "value": 0
    }
  ],
  [
    {
      "title": "Pekerja Keras",
      "value": 33
    },
    {
      "title": "Cerdas",
      "value": 6
    },
    {
      "title": "Jujur",
      "value": 11
    },
    {
      "title": "Merakyat",
      "value": 11
    },
    {
      "title": "Tegas",
      "value": 7
    },
    {
      "title": "Berpengalaman Memimpin",
      "value": 0
    },
    {
      "title": "Berprestasi",
      "value": 0
    },
    {
      "title": "Latar Belakang Militer",
      "value": 0
    },
    {
      "title": "Agamis",
      "value": 0
    }
  ]
]


carilah nilai rata rata masing masing item  sesuai nama itemnya dan gunakan lodash