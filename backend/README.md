# GoBarber

 Project developed in Rocketseat :rocket: GoStack Bootcamp. The application developed is an app for barbershops and their clients called   GoBarber.
 
 ## About GoBarber
 
 As mentioned previously, GoBarber is an application for scheduling barber schedules. It is possible to register users as well as service providers. In its development, the PostgreSQL databases were used for data that needed structure, MongoDB for data that did not require structured structuring and also Redis for the control and sending of mails. Jwt authentication was used. The same has several functionalities as:
 
- create users and providers, as well as update their data;
- create sessions for users;
- possibility of adding avatar to the provider;
- list service providers;
- create, list and cancel schedules;
- send mails to the service provider in case the schedule is canceled;
- notify the service provider of new schedules;
- List the schedules that a service provider has on a given day.
 
 
 ## Pre-Install
 
 Before you use this application, you need to install a postgreSQL database, Redis and MongoDB. I strongly recommend you use docker.
 
 ## Installation
 
- Clone this with git clone https://github.com/DavidStinghen/GoBarber/backend.git;
- Run yarn to install node dependencies;
- Configure .env file like .env.example, using your own credentials;
- Run yarn sequelize db:migrate;
- Launch yarn dev to run API;
- Launch yarn queue, to run Bee-Queue.

## Examples of what GoBarber can do

### Create a new user

You can create a new user by adding name, mail, and password.

POST route:
```
http://localhost:3333/users
````

JSON body:
```
{
	"name": "Test User",
	"email": "testuser@mailtest.com.br",
	"password": "12345678"
}
```

Return:
```
{
  "id": 1,
  "name": "Test User",
  "email": "testuser@mailtest.com.br",
  "provider": false
}
```

### Create a session

you can start a session using the email and password used in the registration, the session will generate a token for the authorizations required to use the application.

POST route:
```
http://localhost:3333/session
```

JSON body:
```
{
  "email": "testuser@mailtest.com.br",
  "password": "12345678"
}
```

Return:
```
{
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "testuser@mailtest.com.br"
  },
   "token":   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTYzMDM1ODIxLCJleHAiOjE1NjM2NDA2MjF9.lInf1Rw68CKgFhNRCt7FduULdsTTkb8JmPsm_iEfG_8"
}
```

### Create a new appointment

For the user to create a new appointment the same must be logged as also to choose the provider and the date / time of the appointment. When the user creates the appointment the provider will receive a notification of a new appointment created as the user name and date / time this appointment will also be visible in the provider's schedule.

POST route:
```
http://localhost:3333/appointments
```

JSON body:
```
{
	"provider_id": 2,
	"date": "2019-07-23T13:00:00-03:00"
}
```

Return:
```
{
  "id": 1,
  "user_id": 1,
  "provider_id": 2,
  "date": "2019-07-23T16:00:00.000Z",
  "updatedAt": "2019-07-13T23:09:22.604Z",
  "createdAt": "2019-07-13T23:09:22.604Z",
  "canceled_at": null
}
```
***You can see more exemples of usage inporting [insomniaTestExamples](https://raw.githubusercontent.com/DavidStinghen/GoBarber/backend/master/insomniaTestExamples.json 'Insomnia config') to your Insomnia workspace***

### Thanks to

[Rocketseat](https://rocketseat.com.br/)
