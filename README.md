# Booking Component of the AireBnb Web Application

Booking Component component is found on the AirBnb listing page and allows the user to view available dates for a listed property, make a date range selection, and request a booking for the selected date range. It is part of a SOA (Service Oriented Architecture) Project with the intent to learn more about SOA, gain experience about the importance of SOA with a practical usecase, understand the interaction of micro-services and learn how to work in a team using a pre-determined workflow. 


<img width="455" alt="screen shot 2019-01-10 at 10 23 01 pm" src="https://user-images.githubusercontent.com/33808429/51016756-50cc0800-1526-11e9-903c-f84861e87016.png">


## Table of Contents
1. [Related Projects](#Related-Projects)
1. [Requirements](#Requirements)
1. [Usage](#Usage)
1. [Back End](#Back-End)
   1. [Data](#Data)
   1. [Business Logic](#Business-Logic)
   1. [Testing](#Testing)
1. [Client](#Client)
   1. [Component Architecture](#Component-Architecture)
   1. [User Interaction](#User-Interaction)
   1. [Styling](#Styling)


## Related Projects

The rooms, picture gallery and reviews components have been tackled by my teammates, you'll be able to learn more about them by visiting their respective repos.

  - https://github.com/rpt09-mulder/rooms
  - https://github.com/rpt09-mulder/gallery
  - https://github.com/rpt09-mulder/reviews
  
 All components deployed and rendering:
  
  ![project-airbnb](https://user-images.githubusercontent.com/33808429/51042522-6581bd80-1571-11e9-877d-5fbbbab14bda.jpg)


## Requirements

- Node 6.13.0
- Npm 6.4.1


## Usage

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

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

## Back End

### Data

#### Seeding Script

The seeding script will generate and populate the database with 100 records of mock listings. 

To run the seeder script from the root directory:

```sh
npm run seeder
```

Each mock listing will have a **listing ID**, a **price** and a **details array**. The details array will be filled by the seeder with 50 **details schemas**, one for a randomly booked date between *2018-01-01* and *2019-09-30*. The **details schema** includes the **date** and a **guest object**. The guests object consits of 3 keys; adults, children & infants each corresponding to a numerical value. An visual example of a record is shown below: 

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
      },
         {
      date: 2019-07-06T07:00:00.000Z,
      guests: {
        adults: 2,
        children: 2,
        infants: 1
      },
      
      ...
      
      ...
      
      ...
      
         {
      date: 2019-07-06T07:00:00.000Z,
      guests: {
        adults: 2,
        children: 2,
        infants: 1
      }
  ]
}
```




## Business-Logic

### GET route
This route will fetch and return booked dates based on a listing id query. It will also return an informative error message to the client if no records have been found.

### POST route

### Challenges/Learning experiences



## Client

### Component Architecture

   #### App.js
This is the main component that holds most of the client side logic. I handles the get request upon mounting and receives all relevant listing data for its sub components.

#### DateSelector.js
This is the date selector that allows the user to select a data range.

#### guests.js
The guest components allows the user to select the amount of guests he/she would like to include in the booking.

#### Overview.js
The guest components allows the user to select the amount of guests he/she would like to include in the booking.

#### Price.js
The Price component receives the listing price via its props from the App component and reflects it to the user.

#### Stars.js


### User Interaction

### Styling



