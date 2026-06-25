// =====================================================
// LOCATION SERVICE
// =====================================================
//
// This file is responsible for getting the user's
// current location.
//
// Instead of writing Geolocation code everywhere,
// we keep it inside one reusable function.
//
// Any component can simply write:
//
// const location = await getCurrentLocation();
//
// and receive:
//
// {
//    lat: ...,
//    lng: ...
// }
//
// =====================================================



// Export this function so other files can use it.
//
// Example:
//
// import { getCurrentLocation }
// from "../services/locationService";
//
export function getCurrentLocation() {

  // Return a Promise.
  //
  // Why?
  //
  // Getting the user's location takes time.
  // The browser needs to:
  //
  // 1. Ask permission
  // 2. Wait for GPS/WiFi
  // 3. Calculate the location
  //
  // Since this doesn't happen instantly,
  // JavaScript uses a Promise.
  return new Promise((resolve, reject) => {

    // -----------------------------------------------
    // CHECK IF THE BROWSER SUPPORTS GEOLOCATION
    // -----------------------------------------------

    // Some very old browsers don't support
    // navigator.geolocation.
    //
    // If it doesn't exist,
    // immediately reject the Promise.
    if (!navigator.geolocation) {

      reject(
        new Error("Geolocation is not supported.")
      );

      // Stop executing the function.
      return;
    }



    // -----------------------------------------------
    // ASK THE BROWSER FOR THE USER'S LOCATION
    // -----------------------------------------------

    navigator.geolocation.getCurrentPosition(

      // SUCCESS CALLBACK
      //
      // This function runs if the browser
      // successfully gets the user's location.
      (position) => {

        // Resolve the Promise.
        //
        // Return only the information
        // our application needs.
        resolve({

          // Latitude
          lat: position.coords.latitude,

          // Longitude
          lng: position.coords.longitude,
        });

      },



      // ERROR CALLBACK
      //
      // This function runs if:
      //
      // • User clicks "Don't Allow"
      // • GPS fails
      // • Browser cannot determine location
      //
      (error) => {

        // Reject the Promise.
        reject(error);

      }

    );

  });

}