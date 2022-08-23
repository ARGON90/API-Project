# TODO

Questions: how to do frontend authorization?
frontend authentication: how to check if user is logged in?


## Frontend (functionality)
## Spots

### Get all spots (done)
### Get all spots by Id (done)
### Create a spot (done)

### Get spots of current user
### Add image to spot based on spot Id
### Edit a spot
### Delete a spot

## Reviews


## Backend

### change spot Star rating to 1 decimal pt

## MISC

### better understand proxy

### make frontend error validations with a modal or an alert


Notes:
for add image to Id:
--in the spotbyId component, should I only have the link for adding an image available if the person who owns that spot is the currently logged in user?
--BUG
--the state turns all of the image id's to 1 when it is refreshed upon image creation - if it isn't refreshed, it shouldn't be a problem...
