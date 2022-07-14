<h1 align=center>Grocery</h1>
<p align=center>(under development)</p>

The Grocery is an E-commerce grocery project.

This project was developed with the knowledge acquired during the Eduzz FullStack Bootcamp #3. It was also a way to study about ReactJS, NodeJS and some other tools like Redux, Context API, Styled-components, Material-UI, TypeORM and JWT.

<details>
 <summary>
 <h2>:movie_camera: Videos</h2>
 </summary>
 <h3>:computer: Desktop</h3>
<img width="100%" src="https://user-images.githubusercontent.com/45208073/179073997-19cabf2a-872e-4c50-9c1b-aa196b6010eb.gif" />
 <h3>:iphone: Tablet</h3>
<img width="100%" src="https://user-images.githubusercontent.com/45208073/179074168-27638430-b2a3-4b86-87a9-b1ce6cff7864.gif" />
</details>

## :clipboard: Features
 - User registration;
 - User login;
 - Recovery password;
 - Authentication with JWT;
 - Paginated list of fruits and vegetables;
 - Fruit and vegetable search.
 
## :rocket: Running the app
#### 1) Environment variables
- In the /api directory create a **.env** file according to the example available in **.env.example**;
- In the /front directory, create a file **.env.development** according to the example available in **.env.development.example**.

#### 2) Running the application
 - In the /api directory run the command: `docker-compose -p grocery-api up -d`;
 - In the /front directory run the command: `docker-compose -p grocery-web up -d`;
 
#### 3) Running the migrations and seeding the database
 - Access the container by running the command: `docker exec -it grocery-api sh`;
 - Run the following command to run the migrations: `npm run migrate:up`;
 - Run the following command to seed the database: `npm run seed:run`.
  
 ## :zap: Technologies
  <div style="display: inline_block"><br>
   <a href="https://www.typescriptlang.org/">
     <img align="center" alt="TypeScript" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg">
   </a>
   <a href="https://reactjs.org/">
    <img align="center" alt="ReactJS" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg">
   </a>
   <a href="https://redux.js.org/">
    <img align="center" alt="Redux" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg">
   </a>
   <a href="https://styled-components.com/">
    <img align="center" alt="Styled Components" height="30" width="40" src="https://cdn.worldvectorlogo.com/logos/styled-components-1.svg">
   </a>
   <a href="https://mui.com/pt/material-ui/getting-started/overview/">
    <img align="center" alt="Material-UI" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg">
   </a>
   <a href="https://jwt.io/">
    <img align="center" alt="JWT" height="20" width="60" src="https://seeklogo.com/images/J/jwt-logo-11B708E375-seeklogo.com.png">
   </a>
   <a href="https://nodejs.org/en/">
    <img align="center" alt="NodeJS" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg">
   </a>
   <a href="https://typeorm.io/">
    <img align="center" alt="TypeORM" height="30" width="40" src="https://avatars.githubusercontent.com/u/20165699?s=200&v=4">
   </a>
   <a href="https://www.postgresql.org/">
    <img align="center" alt="PostgreSQL" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain-wordmark.svg">
   </a>
  </div>
