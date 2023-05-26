# Choose the Node.js version you are using
FROM node:14

# Set the working directory in the container
WORKDIR /weightVisual/frontend

# Copy package.json and package-lock.json (if available) to the workdir
COPY package*.json ./

# Install the dependencies in the container
RUN npm install

# Copy the rest of your app's source code to the workdir
COPY . .


# The command to run your app using Vite's development server
CMD [ "npm", "run", "dev" ]