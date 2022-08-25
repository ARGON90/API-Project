# TODO

Questions:
frontend authentication: how to check if user is logged in?
frontend authorization: how to get user information on frontend?


# Frontend (functionality)

## Spots

### Get all spots (done)
### Get all spots by Id (done)
### Create a spot (done)
### Edit a spot on ID (done)
### Get spots of current user (done)
### Delete a spot on ID (done)

### Add image to spot based on spot Id (partial)

## Reviews

### get all reviews of current user (done)
### get all reviews by spot Id (done)
### create reviews by spotId (done)

### delete a review by reviewId

### add use history for routing on reviews?


# MISC

### better understand proxy

### make frontend error validations with a modal or an alert

### refactor routes

### work on normalization of data in reducers (both spots and reviews)


# NOTES
Notes:
Potential Addons
*ADD IMG TO SPOT ON ID
--in the spotbyId component, should I only have the link for adding an image available if the person who owns that spot is the currently logged in user?


--BUGS

*ADD IMG TO SPOT ON ID
--the state turns all of the image id's to the respective spot number when it is refreshed upon image creation - if it isn't refreshed, it shouldn't be a problem. If I'm not fetching all Images, I don't think it'll be a problem
--the server tries to perform a fetch to spots/{color} upon loading. Is it just trying to fetch the data?

*REVIEWSCURRENTUSER
--currently, the Images shown are not iterating, it just pics the first one (should be fine?)
--found a bug with logging out and logging in- maybe redirect after logout?
--usecurrent num state to do that

*REVIEWSCURRENTSPOT
--currently, the Images shown are not iterating, it just pics the first one (should be fine?)
--current spot reviews -> current user reviews -> error
