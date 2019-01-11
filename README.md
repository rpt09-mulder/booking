# Project Name
Booking Component for the FireBnb Web Application

> Project description
this component will allow the user to see available dates for a listing and make a booking request for a specific date range.

<img width="455" alt="screen shot 2019-01-10 at 10 23 01 pm" src="https://user-images.githubusercontent.com/33808429/51016756-50cc0800-1526-11e9-903c-f84861e87016.png">


## Table of Contents
1. [Related Projects](#Related Projects)
1. [Usage](#Usage)
1. [Requirements](#Requirements)
1. [Development](#Development)


## Related Projects

The rooms, picture gallery and reviews components have been tackled by my teammates, you'll be able to learn more about them by visiting their respective repos.

  - https://github.com/rpt09-mulder/rooms
  - https://github.com/rpt09-mulder/gallery
  - https://github.com/rpt09-mulder/reviews
  
 Refference the screen shot below to view all components put together:
 
 
  <img width="1440" alt="screen shot 2019-01-10 at 10 32 13 pm" src="https://user-images.githubusercontent.com/33808429/51017110-a2c15d80-1527-11e9-9520-e0a8f2eebc9c.png">








## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## Usage

To launch the server in a development environment:

```sh
npm run start-dev
```

To launch the client in a development environment, run the following from the 'client' directory:

```sh
npm run start-dev
```


To launch the server in a production environment:

```sh
npm start
```

To launch the client in a production environment, run the following from the 'client' directory:

```sh
npm start
```

###Data Seed Script 

The seeding script will populate the database with 100 records of mockdata. 

To run the seeder script from the root directory:

```sh
npm run seeder
```

Each record will have a listing ID, a price and a details array. The details array contains detail objects for each date that has been booked and how many guests have booked for that date. Guests is also an object that consits of 3 key/value pairs; adults, children & infants. An visual example of a record is shown below: 

```sh
{
  lising_id: 1,
  price: $50,
  details: [
    {
      date: 2019-07-05T07:00:00.000Z,
      guests: {
        adults: 2,
        children: 2,
        infants: 1
      }
    },
        {
      date: 2019-07-06T07:00:00.000Z,
      guests: {
        adults: 2,
        children: 2,
        infants: 1
      }
          {
      date: 2019-07-06T07:00:00.000Z,
      guests: {
        adults: 2,
        children: 2,
        infants: 1
      }
    },
  ]
}
```

##Booking Component Business Logic

###GET route
This route will fetch and return booked dates based on a listing id query. It will also return an informative error message to the client if no records have been found.

###POST route

###Challenges/Learning experiences



##Booking Component Client 

####App.js
This is the main component that holds most of the client side logic. I handles the get request upon mounting and receives all relevant listing data for its sub components.

####DateSelector.js
This is the date selector that allows the user to select a data range.

####guests.js
The guest components allows the user to select the amount of guests he/she would like to include in the booking.

####Overview.js
The guest components allows the user to select the amount of guests he/she would like to include in the booking.

####Price.js
The Price component receives the listing price via its props from the App component and reflects it to the user.

####Stars.js

