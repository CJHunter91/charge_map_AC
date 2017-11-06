
# Charge Device Map

Tech Stack:
  
  * MongoDB
  * JS
  * Express
  * React

This app uses JS with an Express backend to serve API endpoints from a MongoDB. It returns the locations of all the charge devices that have no access restrictions. 

The user can then click on map markers to get the deatails of a specific charge device or use the checkboxes to filter the map for specific connector types.

Author: Christopher Hunter

## Installation Process

* Install dependencies `npm install` in the `root` directory.
* Install dependencies `npm install` in the `client` directory.
* Make sure mongoDB is installed.
* Run `mongod` 
* Seed database using `node db/seed.js`.
* Run the server in `root` directory via `npm start`.
* Run the server in `client` directory via `npm start`.
* Use browser to visit [http://localhost:3000/](http://localhost:3000/) for Map view
* Use browser to visit [http://localhost:3001/](http://localhost:3001/api/locations) for JSON view from backend

## Known Issues

Due to using React I ran into a few issues which I did not foresee. In hindsight vanilla JS may have been easier.

* Map clustering works unless there are two devices in the same spot.

A Potential fix would be to get a hook into the goolge-maps-react package and use OverlappingMarkerSpiderfier to allow the user to select a specific marker.

* Setting the zoom on the map as a state isn't updated when user scrolls

This results in the state not being changed if it is the same as the current state. My work around is to add one if it equals the state.

* The connection filter is very slow if there a lots of clusters

Due to the way the google-maps-react package deals with adding and removing clusters, there is a UI hang while the package loops through all the clusters and reassigns them. A Potential fix would be to create an array of markers and then removing them.

* User directions were not implemented due to time factors.




