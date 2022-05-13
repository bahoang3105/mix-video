# Mix-Video

Mix-Video is a utility that helps users to mix videos, livestreams, photos,... and re-publish as webrtc stream

## Installing

Install node modules for these folders

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

> NodeJS 14
> MySQL
> OvenMediaEngine
> SRS

> To install OvenMediaEngine, you can see the instruction in their website [https://airensoft.gitbook.io/ovenmediaengine/](https://airensoft.gitbook.io/ovenmediaengine/)

> See SRS config in [SRSconfig](mixVideo.conf)

### Installing

Install node modules for these folders:
> canvas_react_tutorial, backend
```
cd canvas_react_tutorial && npm i && cd ../backend && npm i
```
**Create a database and enter its information into the database.js file in the backend/config.**

Start backend:
```
npm run dev
```
Start frontend:
```
npm run electron
```
Install electron app:
```
npm run dist
```
You will see a message asking you to enter the secret key. You need a secret key in the database to use this widget.

Create a secret key (Port backend: 3001): 
```
curl --location --request POST 'http://localhost:3001/app/create'
```

## Authors
HoangNB (<bahoang3105@gmail.com>)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
 
