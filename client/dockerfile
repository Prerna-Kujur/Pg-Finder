#use official node image as the base image
FROM node:14

# set working directory
WORKDIR /app

#copy package.json and package-lock.json to working directory
COPY package*.json ./

#install all dependencies
RUN npm install

#Bundle app source
COPY . .

#expose the client port 3000
EXPOSE 3000

#command to run the application 
CMD ["npm", "start"]
