
# BigCity Real-Estate

This is a real estate Buying, renting and selling application made using MERN stack. You can find the Deployed project by clicking here - https://bigcity-realestate.onrender.com/


## Acknowledgements

 - [Render](https://render.com/)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)

## Features

- Google Authentication
- Custom Property Search
- Mailing to Property Owner
- Post as many listings as you like. 

## API Reference

#### User Authentication

```http
/api/v1/auth
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/signup` | `POST` | **Required**. username, email, password |
| `/signin` | `POST` | **Required** email, password|
| `/google` | `POST` | Firebase Integrated OAuth|
|`sign-out` | `GET` | Signout of your account | 

#### User

```http
/api/v1/user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `/update/${id}`      | `PATCH` | **Required**. Id of user to fetch |
| `/delete/${id}`| `DELETE` | **Required** Id of user to delete|
|`/listings/${id}`| `GET` | Fetch listings created by that user|
|`/${id}` | `GET` | Get User Information


### Listing
```http
/api/v1/listing
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `/create` | `POST` | Create new Listings|
| `/update/${id}`      | `PATCH` | **Required**. Id of Listing to update |
| `/delete/${id}`| `DELETE` | **Required** Id of user to delete|
|`/get/${id}`| `GET` | Fetch a single Listing|
|`/get` | `GET` | Get listings based on user query parameters


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**Backend Side**

`MONGO_URI` - *Your MongoDB connection url*

`JWT_SECRET` - *Your jwt secret for authorization*

`JWT_LIFETIME` - *Expiry of jwt token*

**Client Side**

`VITE_FIREBASE_API_KEY` - *Your Firebase key for google authentication*



## Appendix

Here are the images of the Website 
![image](https://github.com/beastkp/realEstate/assets/91586330/b3ffdb3f-8fa5-4053-893d-8f1c90f809d3)
![image](https://github.com/beastkp/realEstate/assets/91586330/d37ed255-ad1b-4c34-b988-429f0c5ce464)
![image](https://github.com/beastkp/realEstate/assets/91586330/4d843263-7a8b-4d4d-990f-ff275369ee37)
![image](https://github.com/beastkp/realEstate/assets/91586330/d1e5a767-d0a1-473c-a5c7-cb631b85df37)
![image](https://github.com/beastkp/realEstate/assets/91586330/57ce1744-a45e-4ccc-9f04-48833ced1021)



## Authors

- [@Krish Panchal](https://github.com/beastkp)









