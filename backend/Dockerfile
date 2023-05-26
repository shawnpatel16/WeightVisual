# Choose the official Node.js 14 image as the base image
FROM node:14


# Set the working directory in the Docker container
WORKDIR /weightVisual/backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the npm packages defined in package.json
RUN npm install

RUN npm install -g nodemon
# Generate Prisma client


# Copy the rest of your application's source code to the working directory
COPY . .

RUN npx prisma generate
# Expose the port your application runs on
EXPOSE 3000

# Define the command to run your application
CMD [ "npm","run","dev" ]
