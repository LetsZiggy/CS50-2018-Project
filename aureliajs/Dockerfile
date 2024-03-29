# Build stage
FROM node:lts as build-stage

ENV DEBIAN_FRONTEND=noninteractive

# Update apt-get
RUN apt-get update && apt-get install -y \
		apt-utils \
		fonts-liberation \
		libappindicator3-1 \
		libatk-bridge2.0-0 \
		libatspi2.0-0 \
		libgtk-3-0 \
		libnspr4 \
		libnss3 \
		libx11-xcb1 \
		libxtst6 \
		lsb-release \
		xdg-utils \
		libgtk2.0-0 \
		libnotify-dev \
		libgconf-2-4 \
		libxss1 \
		libgbm1 \
		libasound2 \
		xvfb \
	&& rm -rf /var/lib/apt/lists/*

# Install Chrome
RUN curl --silent --show-error --location --fail --retry 3 --output /tmp/google-chrome-stable_current_amd64.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
	&& (dpkg -i /tmp/google-chrome-stable_current_amd64.deb || apt-get -fy install) \
	&& rm -rf /tmp/google-chrome-stable_current_amd64.deb \
	&& sed -i 's|HERE/chrome"|HERE/chrome" --disable-setuid-sandbox --no-sandbox|g' "/opt/google/chrome/google-chrome" \
	&& google-chrome --version

RUN npm install -g aurelia-cli@^1.2.0

WORKDIR /app

# Install dependencies
COPY ./*.json ./
RUN npm install

# Copy aurelia config
COPY aurelia_project ./aurelia_project

# Copy files in the root folder
COPY *.* ./

# Copy source files
COPY src ./src
COPY test ./test
COPY e2e ./e2e

# Run unit tests
RUN npm test

# Run e2e tests
RUN npm run e2e

# Build
FROM build-stage as publish-stage
RUN npm run build

# Production stage
FROM nginx:alpine as production-stage
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html

COPY --from=publish-stage /app/scripts/ ./scripts/
COPY --from=publish-stage /app/index.html/ .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
