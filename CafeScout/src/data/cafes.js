// =====================================================
// DUMMY CAFE DATA
// =====================================================
//
// This file contains all the cafe information used by
// our application.
//
// Why is this data stored separately?
//
// Instead of hardcoding cafe data inside CafeList,
// we keep it inside its own file.
//
// Benefits:
// • Cleaner components
// • Easier to maintain
// • Easier to replace with API data later
//
// Later we'll simply replace:
//
// import cafes from "../data/cafes";
//
// with:
//
// const cafes = await getNearbyCafes(...);
//
// and the UI will continue to work.
//
// =====================================================



// Array of cafe objects.
//
// Every cafe has:
//
// id
// name
// rating
// distance
// latitude
// longitude
// address
// category
// open status
//
const cafes = [

  {
    id: 1,

    name: "Cafe Coffee Day",

    rating: 4.4,

    distance: "1.2 km",

    lat: 24.7588,

    lng: 92.7865,

    address: "Park Road, Silchar",

    category: "Coffee",

    isOpen: true,
  },



  {
    id: 2,

    name: "Cafe HQ",

    rating: 4.6,

    distance: "2.1 km",

    lat: 24.7615,

    lng: 92.7897,

    address: "Premtola, Silchar",

    category: "Cafe",

    isOpen: true,
  },



  {
    id: 3,

    name: "Beans & Brews",

    rating: 4.5,

    distance: "2.8 km",

    lat: 24.7644,

    lng: 92.7829,

    address: "Tarapur, Silchar",

    category: "Coffee House",

    isOpen: false,
  },



  {
    id: 4,

    name: "Brew Brothers",

    rating: 4.7,

    distance: "3.3 km",

    lat: 24.7672,

    lng: 92.7810,

    address: "Central Road, Silchar",

    category: "Specialty Coffee",

    isOpen: true,
  },



  {
    id: 5,

    name: "Mocha Magic",

    rating: 4.3,

    distance: "4.1 km",

    lat: 24.7701,

    lng: 92.7845,

    address: "College Road, Silchar",

    category: "Coffee",

    isOpen: true,
  },



  {
    id: 6,

    name: "The Daily Grind",

    rating: 4.8,

    distance: "5.0 km",

    lat: 24.7728,

    lng: 92.7903,

    address: "Rangirkhari, Silchar",

    category: "Cafe",

    isOpen: false,
  }

];



// Export the array.
//
// Any component can now write:
//
// import cafes from "../data/cafes";
//
export default cafes;
