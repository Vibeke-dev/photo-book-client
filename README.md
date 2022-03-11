### Description of the project

This project contains of two parts, a server side and a client side. With this app you can create and purchase a photo book with images and descriptions. This part is the client side, which is handling the views and logic behind user login, uploading and selecting pictures for your photo book, and finally the purchase step. 

#### Wireframes
The wireframe is the idea of the project and the functionalities that should be build. Below are listed the user stories to accomplish that.

##### User stories
- Creation of AddPicture (image, headline, description, post) - Picture.model.js
- Creation of AddCart (theme, array with pictures, number where picture should be placed)
- Creation of PictureCard - details for adding picture in book (image, headline, description)
- Creation of EditPicturePage (headline, description, delete)
- Creation of UploadPicturePage
- Creation of CreationBookPage
- CartPage (should be able to return to CreationBookPage, when buy then book is saved in Book.model, user will for now not be able to access it again (mvp))
- Creation of PrintBookPage (admin page to print book with info from Book.model)
- Creation of AddressCard
- Creation of Navbar
- Creation of HomePage/SignupPage/LoginPage

![image](https://user-images.githubusercontent.com/59952389/157823324-baf4ecf9-f21f-4c2e-aa35-8cfb663c10ac.png)
![image](https://user-images.githubusercontent.com/59952389/157823389-eae9f559-fff9-4ff5-b9af-aee6673bc320.png)


#### Technoligies Used
- React
- react-router-dom
- reactstrap
- bootstrap/dist/css/bootstrap.css
- CSS
- Axios

#### Components and Pages structure

##### Components

| Name          | Action                                                                        |
| ------------- | ----------------------------------------------------------------------------- |
| AddPicture    | Upload the pictures to cloudinary, uses this url when uploading to data base  |
| AddressCard   | Address card                                                                  |
| IsAnon        | Used for pages that all users can see                                         |
| IsPrivate     | Used for pages that are only visible to logged in users                       |
| Navbar        | Used on each page, link to the different pages of the app                     |
| PictureCard   | Card to show the picture                                                      |
| PrintBookCard | Card to show the user information when book should be printed                 |

##### Pages

| HTTP verb       | URL                   | Action                                                                                                                      |
| --------------- | ----------------------| ----------------------------------------------------------------------------------------------------------------------------|
| CartPage        | `/basket`             | Uses the address card to show address information based on the user logged in. User can then buy the book and it will then be created in data base.                                                                                                                                                           |
| EditPicturePage | `/pictures/edit/:id`  | Get picture based on id, can update or delete the specific picture                                                          |
| HomePage        | `/`                   | Picture gallery                                                                                                             |
| LoginPage       | `/login`              | Page to log in                                                                                                              |
| PictureListPage | `/pictures`           | Page to add new pictures (AddPicture), show pictures (PictureCard), functionalities to add to photo book and add to basket  |
| PrintPage       | `/print`              | Page to print books that has been purchased, with the address information (PrintBookCard)                                   |
| SignupPage      | `/signup`             | Page to sign in                                                                                                             |

<hr>

#### Project Link
Below link is the final app and link to the server part:
- https://photo-book2.netlify.app/pictures
- https://github.com/Vibeke-dev/photo-book-server.git

#### Future Work
- Add more pages to the photo book
- Make it more dynamic in the style so that when you increase and decrease the screen content follows
- Add the possibility to buy the book with payment
- Add the react-use-cart so that it is possible to add more than one book and remove books 
- Admin rights should be added
- In the print page it should be possible for the admin to see the book that should be printed


#### Team member
This project is done by me - Vibeke G Jørgensen


