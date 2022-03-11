### Description of the project

This project contains of two parts, a server side and a client side. With this app you can create and purchase a photo book with images and descriptions. This part is the client side, which is handling the views and logic behind user login, uploading and selecting pictures for your photo book, and finally the purchase step. 

#### Wireframes
![image](https://user-images.githubusercontent.com/59952389/157823324-baf4ecf9-f21f-4c2e-aa35-8cfb663c10ac.png)
![image](https://user-images.githubusercontent.com/59952389/157823389-eae9f559-fff9-4ff5-b9af-aee6673bc320.png)


#### Technoligies Used
- React
- react-router-dom
- reactstrap
- bootstrap/dist/css/bootstrap.css
- CSS
- Axios

#### Models
##### Picture Model
```js
{
  title: String,
  description: String,
  imageUrl: String,
  purchased: { type: String, default: 'no' },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  isSelected: { type: Boolean, default: false },
  numberInBook: {type: Number, default: 0}
}
```

##### Book Model
```js
{
  picture: [{ type: Schema.Types.ObjectId, ref: "Picture" }],
  price: Number,
  theme: String
}
```

##### User Model
```js
{
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  postCode: { type: Number, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true }
}
```

#### Routes

##### Picture routes

| HTTP verb | URL                        | Request body | Action                                                                              |
| --------- | -------------------------- | ------------ | ------------------------------------------------------------------------------------|
| POST      | `/api/upload`              | JSON         | Receive image, sends it to Cloudinary via the fileUploader and returns the image URL|
| POST      | `/api/pictures`            | JSON         | Creates a new picture with userID                                                   |
| GET       | `/api/pictures`            | (empty)      | Retrieves pictures by userID                                                        |
| GET       | `/api/pictures/:pictureId` | (empty)      | Retrieves a specific picture by id                                                  |
| PUT       | `/api/pictures/:pictureId` | JSON         | Updates a specific picture by id                                                    |
| DELETE    | `/api/pictures/:pictureId` | (empty)      | Deletes a specific picture by id                                                    |

##### Book routes

| HTTP verb | URL                        | Request body | Action                        |
| --------- | -------------------------- | ------------ | ----------------------------- |
| POST      | `/api/book`                | JSON         | Create a new book             |
| GET       | `/api/book`                | (empty)      | Retrieves all books           |
| DELETE    | `/api/book/:bookId`        | (empty)      | Deletes a specific book by id |

##### User routes

| HTTP verb | URL                  | Request body | Action                     |
| --------- | -------------------- | ------------ | -------------------------- |
| GET       | `/api/user/:userId`  | (empty)      | Get user by id             |

##### Auth routes
| HTTP verb | URL                        | Request body | Action                                         |
| --------- | -------------------------- | ------------ | ---------------------------------------------- |
| POST      | `/auth/signup`             | JSON         | Creates a new user in the database             |
| POST      | `/auth/login`              | JSON         | Verifies email and password and returns a JWT  |
| GET       | `/auth/verify`             | (empty)      | Used to verify JWT stored on the client        |

<hr>

#### Project Link
Below link is the final app and link to the server part:
- https://photo-book2.netlify.app/pictures
- https://github.com/Vibeke-dev/photo-book-server.git

#### Future Work
- 

#### Team member
This project is done by me - Vibeke G Jørgensen


