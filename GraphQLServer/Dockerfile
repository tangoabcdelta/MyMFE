# Stage 1: Install dependencies
FROM node:18-alpine

WORKDIR /

# Copy package.json and yarn.lock
# Copy all of the application code to the container
COPY . .

# Install dependencies with the --frozen-lockfile flag
RUN yarn install --frozen-lockfile



# Build the application (replace this with your actual build command if necessary)
RUN yarn build


# Start the application
# Change this with as per the app's needs
CMD ["npm", "start"]

# Expose any required ports
EXPOSE 9005









