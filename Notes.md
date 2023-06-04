# Primary Purpose
- Learning how to build a website from scratch all the way to deploying.
- Using new technologies: Prisma/PostgreSQL, Docker, Cloud platforms (DigitalOcean), Testing libaries

## Mistakes I Made
- Hasty planning. Chose MongoDB (NoSQL database) even though much of my data would have benefited from using a relational database. Ended up moving from 
  MongoDB to PostgreSQL about halfway through
- Not making tests side-by-side as I created the project. Test suite was not complete
- Project organization (folders) was nonexistent. 

## Learned
### Same-origin policy
- Restrictions concerning how one origin interacts with another
- Requires a proxy for frontend to backend
- Frontend makes request to backend, but proxy makes it seem as if it is requesting to its own server, while at the same time forwarding the request to the backend. Basically, to the frontend, it seems like the requests are being made to the same origin

### JWT/Cookies
- When I was storing the JWT in local storage, the data wasn't persisting upon reloading because I wasn't automatically including the JWT from local storage in the requests, so the server didn't know if the user was authenticated
- I ended up solving this by storing the JWT in cookies.
- Cookies are a form of data storage that lives in the browser and can be made to persist through page reloads and browser restarts

### React Context
- Created workout context so that we didn't have to pass props down manually at every level
- Basically creating global variables that I can use anywhere
- In this case, I created context where my state and functions for handling workouts was stored so my components can have access to them
- Use when I have global data that many components share or when I would have to pass data through many layers of the component tree

### React Callbacks
- Prevent unnecessary re-creation of function instances

### React useEffect
- Perform side effects in response to component rendering or state/prop changes
- Every time I reload a page or perform an action where I might need a component to rerender, I am likely going to have a dependency for my useEffect hook

### Route protection
- Make sure that we send a request to the authentication route upon login and every time the component is rendered
- Cookies are automatically sent with every request to the same domain and you verify the authentication status every time the related component is rendered
- withcredentials property is used when making cross-origin requests to ensure that cookies are included with the request
- Because of the proxy, requests are considered same-origin so we don't need the with credentials property for every request


### Docker
- The purpose of Docker is to get rid of the "it works on my computer" problem. Basically, we create a container which has all the necessary configurations, dependencies, and tools necessary for the project to be built and run.
- VMs require their own complete OS, while Dockers use the host kernel. This makes it more efficient
- Although I made the docker compose and docker files, I didn't use them when setting up my production environment, which was a mistake. When I was trying to build my project on the production environment, the build process wasn't working the same as on my local machine. Instead of that setup, I would have needed to install docker, then run the dockerized appliaction directly (simplifies deployment)

### Dockerfile
1. Choose the runtime
2. Set the working directory in the container
3. Copy the package.json and package-lock.json
4. Install the dependencies in the container
5. Copy the rest of the app's source code to the working directory
6. Run the deployment command
(on the backend, I also had to generate the prisma client)

### Docker-Compose
- Use to define and manage multi-container Docker applications, like the frontend, backend, and database in my case
- Dockerfiles are used to build a single Docker image, while Docker Compose files are used to define how multiple Docker containers interact with each other
1. Services: the application services (containers)
2. db: database service: it exposes its 5432 port to the my 5433 port
3. backend and frontend: backend and frontend containers built using the ./backend and ./frontend containers respectively. The volumes are for persisting data and dependencies across container restarts. Volumes basically allow for shared filesystems for the service
4. Proxy: reverse proxy service using the nginx Docker image and a custom config file
- The reason why I had to do 5433:5432 is because the postgresql image exposes port 5432, so in order to avoid conflicts with any local PostgreSQL installations, I had to map this to a different port on my host machine


### Nginx.conf for docker
- NGINX is a web server that can be used as a reverse proxy, load balancer, and an HTTP cache
- For production environments, we want a unified entry point for the application. There are multiple reasons for this: 
    1. **Domain and port contraints**: same-origin policy, meaning we want both the frontend and the backend on the same domains/ports
    2. **Security**: Since we want the app to be accessible through HTTPS on a single domain, we only want to have to get the SSL/TLS certificates for a single domain rather than multiple
    3. **Efficiency**Having a single point of entry allows for more efficient load balancing, logging, and caching. Furthermore, clients only need to establish a connection to a single server
    4. **Routing and Redirection**: A reverse proxy can make routing to different services easier
    5. **Scaling**: Reverse proxy can distribute the load
    6. **Simplicity for the user**: Easier to access the entire application through a single domain rather tahn remembering different domains or ports for the different parts of the application
- For my case, I needed the reverse proxy because of the same origin policy. 
1. **upstream**: the block where the http traffic goes. Defines a pool of servers, which in my case is just the frontend. 
2. **server**: defines a virtual server which can handle requests. Set the default to list to port 80 meaning that this server block should be the one used if no other server block matches the request
3. **location /api**: matches the request paths that start with /api. It proxies the requests to the backend at port 3000. Basically, if someone tries to send a request to http://website.com/api/endpoint, then nginx sends that request to http://backend:3000/api/endpoint
4. **location /**: proxies the request to my frontend service


## Hosting
1. Setting up Droplet Server on DigitalOcean. I had initially planned to go with Heroku, but after learning that they were no longer providing the free options, and that I would also have to pay for the postgre addon, and also the security issues, I decided on DigitalOcean.
2. Connecting to the Server and Basic Setup
    - Updated the packages using sudo apt update and sudo apt upgrade
    - created a non-root user and granted it sudo privileges
3. Installing Necessary Software
    - Installed node.js, postgresql, nginx
4. Configuring a Domain Name   
    - Purchased domain name from Google and pointed it at the server's IP address by creating A record in the domain's DNS settings
    - The A record tells DNS resolvers that your domain should resolve to the IP address of your server
5. Configuring SSL for HTTPS
    - Used Certbot to get a free SSL/TLS certificate
    - Configured NGINX to use the certificate for the domain
6. Setting up the Database
    - Set up the PostgreSQL database
    - Created a new .env file on the backend
7. Loading the Project 
    - I had a lot of trouble here as whenever I tried to build my project using npm install, there was not enough memory, so the process was killed.
    Eventually, I built the project on my local machine and then pulled that onto my production server and that fixed the issue.
    - Setup the pm2.config.js file which started the frontend and backend.