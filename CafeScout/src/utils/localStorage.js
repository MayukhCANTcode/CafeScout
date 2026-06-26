// =====================================================
// LOCAL STORAGE UTILITY
// =====================================================
//
// This file contains helper functions for storing
// favorite cafes inside the browser.
//
// Why use a utility?
//
// Instead of writing localStorage code inside
// multiple React components,
// we keep everything here.
//
// Benefits:
// • Cleaner components
// • Reusable code
// • Easier maintenance
//
// =====================================================



// =====================================================
// STORAGE KEY
// =====================================================
//
// All favorite cafes will be stored under this key.
//
const STORAGE_KEY = "favoriteCafes";



// =====================================================
// GET FAVORITES
// =====================================================
//
// Reads favorite cafe IDs from Local Storage.
//
// Returns:
//
// [1,3,5]
//
// or
//
// []
//
export function getFavorites() {

  // Read data from Local Storage.
  const data = localStorage.getItem(STORAGE_KEY);

  // If nothing exists,
  // return an empty array.
  if (!data) {

    return [];

  }

  // Convert JSON string back into an array.
  return JSON.parse(data);

}



// =====================================================
// SAVE FAVORITES
// =====================================================
//
// Saves the entire favorites array.
//
export function saveFavorites(favorites) {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(favorites)

  );

}



// =====================================================
// TOGGLE FAVORITE
// =====================================================
//
// Adds or removes a cafe ID.
//
// Example:
//
// Current:
//
// [1,2]
//
// Click cafe 3
//
// Result:
//
// [1,2,3]
//
// Click cafe 2
//
// Result:
//
// [1,3]
//
export function toggleFavorite(cafeId) {

  // Load existing favorites.
  let favorites = getFavorites();



  // Check if the cafe already exists.
  const exists = favorites.includes(cafeId);



  if (exists) {

    // Remove the cafe.
    favorites = favorites.filter(

      (id) => id !== cafeId

    );

  }

  else {

    // Add the cafe.
    favorites.push(cafeId);

  }



  // Save updated array.
  saveFavorites(favorites);



  return favorites;

}