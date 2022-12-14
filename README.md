# About Bee & Bee

'Bee & Bee' is a full-stack web application inspired by Airbnb. It is designed to mimic the functionality of Airbnb in terms of hosting creating fictitious 'spots', which people may reserve, add reviews to, and rate.

Please view this repository's wiki page in order to learn more about the functionality of this app. 

This project is built with:
Javascript
React
Redux
Express
Sequelize
SQL-ite

## Features and Design

This project was required to be viewed on a 1024 pixel screen, and it is recommended that potential users do so. The design is based on Airbnb's own layout, and styling was done 'from scratch' using CSS without the use of any libraries. The functionality does not entirely compare to Airbnb, but Bee & Bee does have various features that are explained in-depth in the wiki of this repository. Visual comparisons are available between 'Bee & Bee' and Airbnb as a reference

### Home Page

* On this page:
  * A clickable logo that always leads back to the home page
  * 'Become a Host' link: if logged in, prompts the user to create a listing. If not logged in, prompts the user to sign up.
  * Profile button & 'hamburger' menu, mentioned in more detail below. 
  * A list of spots: Each of these spots is clickable and will take you to the details of that spot

![image](https://user-images.githubusercontent.com/54010874/187216500-3e75c1ca-4642-4fc0-9b1d-43662b6e1185.png)

Airbnb →→
![image](https://user-images.githubusercontent.com/54010874/187216693-b736370e-9872-4ec0-812a-762619d3e949.png)

### Login / Sign up

* On this page:
  * Login: if a user has already created a profile, entering their credentials properly will log them in and redirect to the home page
  * Sign up: if a user has not created a profile, the sign up form allows them to do so 
![image](https://user-images.githubusercontent.com/54010874/187217593-e20f3977-1a48-474f-864c-06ad733bfcb6.png)
![image](https://user-images.githubusercontent.com/54010874/187220167-70ceb18c-52c4-479b-989a-61c8d7ee13da.png)

Airbnb →→
![image](https://user-images.githubusercontent.com/54010874/187217450-c0a485dd-bdf2-4781-994b-8df547742be6.png)

### Profile Menu

* On this page:
  * If logged in, allows a user to create a listing, see their listings and reviews, as well as log out. 
  * If not logged in, this menu gives the user options to log in or sign up.
  * Demo-login is available for easy login, with prefilled credentials

![image](https://user-images.githubusercontent.com/54010874/187220994-30ac5c11-a630-4d6e-853b-20b7cc5c1419.png)
![image](https://user-images.githubusercontent.com/54010874/187221066-5be59519-0db8-4756-9ebc-e9e0996cbec8.png)

Airbnb ↓
![image](https://user-images.githubusercontent.com/54010874/187221124-bd20e940-e74b-4f03-9b8a-3a88c469dffd.png)


### View of a single spot

* On this page:
  * A list of all images of this spot, all reviews of this spot, name of host, and average 'star rating'.
  * If a user is logged in and owns this spot, links allow a user to edit this spot or delete this spot.
  * Delete a spot button deletes the spot from this page as well as the home page.
  * If a user is logged in and does not own this spot, a link allows them to create a review. Only one review is allowed per user per spot.
  * If not logged in, edit spot, create review, and delete spot options are not available.

![image](https://user-images.githubusercontent.com/54010874/187216960-7ab98eb1-191e-446c-96ec-869b5a856935.png)

Airbnb →→
![image](https://user-images.githubusercontent.com/54010874/187217138-608c1390-41a1-4577-a0ec-54b261f5afb7.png)

### Create a Spot form

* On this page:
  * Filling out this form results in the creation of a spot. Proper validation of this form redirects the user to the listing of this spot.
  * The newly-created spot is immediately available on the home page

![image](https://user-images.githubusercontent.com/54010874/187218072-a5b0ead1-4712-48bb-9ceb-25d764d5aaff.png)

Airbnb →→
![image](https://user-images.githubusercontent.com/54010874/187217957-bafbb753-5a05-49a1-8c7d-d513558b3a23.png)

### See Your Reviews
 
* On this page:
 * This page can be accessed from the profile button menu if a user is logged in
 * All of a user's reviews are lsited here, and clicked either the review or the image takes a user to that spot
 * A delete button deletes this review from the page, as well as the spot page that it belongs to

![image](https://user-images.githubusercontent.com/54010874/187223221-40f0a2cc-ead7-42b2-902c-e96b0d3aabfb.png)

Airbnb →→ No reference image was available for this page, styling based solely on personal judgment.


 








