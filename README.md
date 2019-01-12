# Booking Component of the AireBnb Web Application

Booking Component component is found on the AirBnb listing page and allows the user to view available dates for a listed property, make a date range selection, and request a booking for the selected date range. It is part of a SOA (Service Oriented Architecture) Project with the intent to learn more about SOA, gain experience about the importance of SOA with a practical usecase, understand the interaction of micro-services and learn how to work in a team using a pre-determined workflow. 

View live hosted on AWS: http://booking.jtaqrb8zaa.us-west-2.elasticbeanstalk.com
<img width="455" alt="screen shot 2019-01-10 at 10 23 01 pm" src="https://user-images.githubusercontent.com/33808429/51016756-50cc0800-1526-11e9-903c-f84861e87016.png">


## Table of Contents
1. [Related Projects](#Related-Projects)
1. [Requirements](#Requirements)
1. [Usage](#Usage)
1. [Tech Stack](#Tech-Stack)
1. [Back End](#Back-End)
   1. [Data](#Data)
   1. [Business Logic](#Business-Logic)
   1. [Challenges](#Challenges)
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
  
 All components deployed and rendering (view hosted on AWS: http://proxy-philipp.dxpxpip3pn.us-west-2.elasticbeanstalk.com/):
  
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


## Tech Stack
I used the following technologies where used in the making of this project:
#### Back End
1. Express - Server
1. Jest - Testing
1. Moment - JS date manipulation
1. Faker - Create mock data
1. MongoDB/Mongoose - Database & ODM
1. Lodash

#### Front End
1. React 
1. Moment
1. Axios
1. Webpack
1. Babel

#### Deployment 
1. Elasticbeanstalk (AWS)

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
The GET route will attempt fetch and return booked dates and the listing price based on a query usting a listing id. It first performs the query using the Mongoose *findOne* helper function. If no record has been found, it will return an informative error message to the client. If it finds the requested listing, it will create a **currentListing** object with an empty **days** array and a **price** as its keys. It then attached the price and loops through the details objects of the listing to push the dates in to the days array. Once all dates have been included the currentListing object will be send to the client. 

### POST route
The POST route is responsible for booking a received date range and is a bit more tricky as it is responsible to handle quite of bit of logic & data shaping. I've listed below the chronological flow of events once in attempt to explain what's going on:

1. The route receives 
   1. a listing ID as a query string
   1. the # of guests 
   1. a booking request start date and 
   1. a booking request end date.
1. Although the client is set to have at least one adult with each party we want to verify this to prevent non-adult supervised parties to book to our system. Therefore the route will then verify that the received guest object contains an *adult* key with a value greater than one. If it doesnt, it will send back a message indicatin that at least one adult must be present. 
1. We are then stripping the start and end date of the request body and setting them equal to *startDate* and *endDate*, respectively. We'll be working with those 2 variables quite a bit so we just want them to be easily manageable. 
1. Now the fun begins, we first dive into the database, using the helper method *findOne* with the *listing_id* as a parameter we got from the query string to pull out the listing for which the user is tryin to request a booking for. 
1. It is here where meet our first challenge, we have to first validate that the request does not contain any dates that have already been booked. We do this via the helper function *checkForConflictingDates* from our *controller* module. The *checkForConflictingDates* receives the found listing, the start date and the end date as a parameter. It then loops through each details object and applies the underscore *_.find* method to check for any matching dates. If it a matching date is found it will return true and kick us out of the loop. Back within our POST route, if checkForConflictingDate returns true, we respond to the client with a status code 400 and an informative error message that the selected date range is not available.
1. If no conflicting dates have been found, we use our second helper method *bookDates* (also on the *controller* module) to book our dates. The *bookDates* method loops over each date and within the start and the end date to 1) create a detail object with a key for the date and second key a the guest object that contains a key for each guest type (adult, children, infants). Once all the detail objects have successfully been saved to the database, the *bookDates* resolves in a promise. 
1. Back in our POST route we now let the client know that the dates have a been successfully saved via a 201 status code and a success message.

### Challenges
Some of the challenges that I encountered were as follows:
1. **Deciding on a Data Schema**
   Initially I was considred to have a simply an object with a listing_ID and a date range. However it became evident very        quickly that in order to avoid double bookings I would have to create a schema that could handle an array into which to        then push the each booked date. This was working fine until I introduced the additional feature of selecting guest as part    of the booking. The challenge was that each date needed to be associated with a unique party who booked the stay. I            therefore decided on a nested schema where the date and and the guest is a child schema of the listing schema. Althoug        using nested object would have accomplished a similar goal, I found it valuable to have an id automatically added to the      each detail for uniquness sake. 
1. **Working with Dates**
   Turns out dates are a bit trickey to work with. The issue presented it self when I tried to validate each date to what had    already been booked. I started out with receiving a simple JavaScript date object with each booking attempt. The seeder        however uses faker.js to randomly create mock dates. When I tried to compare what I was receiving from the client to the      mock date I noticed that event though the dates mached, the time stamps wouldn't allow for a clean match. I therefore used    moment.js, a popular data-manipulation library to set the hours and minutes to 0 on both the client and the server. What      also presented a challenge was having to loop throgh the incoming dates. The following while loop took a bit to figure out    but ulimately solved this issue as well.
   
```sh
    let startDate = moment(req.body.startDate);
    let endDate = moment(req.body.endDate);
    
     while(startDate <= endDate){
    
      ... Performing logic on each date ...
    
     startDate = startDate.clone().add(1, 'd');
   
    } 
```
   
### Testing
During the creation of this project several test were written using Jest (in conjunction with Supertest), focusing primarily on the POST and GET routes to ensure that the stytem was running in good health, validate expecations on calling on these routes and to identify potential error sources.

<img width="1012" alt="screen shot 2019-01-11 at 5 23 04 pm" src="https://user-images.githubusercontent.com/33808429/51067279-a1467280-15c5-11e9-947b-f32ea158bb10.png">


## Client

![ezgif com-video-to-gif 1](https://user-images.githubusercontent.com/33808429/51067806-6c88ea00-15ca-11e9-8d56-3b4fc59bf5f8.gif)


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



