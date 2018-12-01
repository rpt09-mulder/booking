# Project Name
Booking Component for the FireBnb Web Application

> Project description
this component will allow the user to see available dates for a listing and make a booking request. 

## Related Projects

  - https://github.com/rpt09-mulder/rooms
  - https://github.com/rpt09-mulder/gallery
  - https://github.com/rpt09-mulder/reviews


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Simply fire up the start script and connect to a db.

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

##Seed Script 
The seeding script will populate the database with 100 records of mockdata which includes 1. 50 random dates between 12/01/2018 and 06/01/2019 (as an array with each string record formated as month/day/year) 2. a listing ID 3. an automatically document id. This should hopfully create enough dates that when to provide the user with a realistic user experience. The script is run from the root level via 'nmp run seeder'. 

##Get dates route
This route will fetch and return booked dates based on a listing id query. It will also return an informative error message to the client if no records have been found.
