FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

# Build the application
RUN npm run build

EXPOSE 4173

ENV VITE_ALLOWED_HOSTS=${VITE_ALLOWED_HOSTS}

CMD ["npm", "run", "preview"]


