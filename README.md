# ASeniorIsAsking

It's past midnight. You're hungry. You're grumpy. You want nothing but food. But... you're lazy too. What would you not do for a Tawa Bonda or a Shawarma? If only you knew which fachcha is already out there at DLF... Inspired from the 3am chats on the UG2k19 WhatsApp Groups, we present to you the only app you'll ever need to fulfill your heart's desire of having that one last meal before your regular 3-hour sleep.

<img src="./readme_media/screenshot.gif"/>

## Contributors
[![](https://github.com/ishaanshah.png?size=150)](https://github.com/ishaanshah)
&nbsp;
[![](https://github.com/rahul-goel.png?size=150)](https://github.com/rahul-goel)
&nbsp;
[![](https://github.com/Rutvij-1.png?size=150)](https://github.com/Rutvij-1)
&nbsp;
[![](https://github.com/sriramdvt.png?size=150)](https://github.com/sriramdvt)


## Setting up the development environment
### Frontend
The frontend is bootstrapped using `Create React App`. To start the frontend
development server you need to install `yarn`.

See the different installation instructions for your distribution below.

Debian / Debian-based systems -

```bash
sudo apt-get install yarn
```

Arch / Arch-based systems -

```bash
sudo pacman -S yarn
```

The next step is to start the development server, to do that run the following
steps

```bash
cd frontend
yarn
yarn start
```

If all goes well, the server should be running at `localhost:3000`.

### Backend
The backend server is shipped in Docker containers. This helps create
your development environment and later deploy the application. Therefore, to
work on the project, you need to install Docker and use containers for building
the project. Containers save you from installing all of this on your own
workstation.

See the different installation instructions for your distribution below.

Debian / Debian-based systems -

```bash
sudo apt-get update && sudo apt-get install docker docker-compose
sudo systemctl enable docker.service
sudo systemctl start docker.service
```

Arch / Arch-based systems -
```bash
sudo pacman -S docker docker-compose
sudo systemctl enable docker.service
sudo systemctl start docker.service
```

The next step is to build the docker containers, to do that run the following
steps

```bash
cd ./backend
sudo docker-compose build
```

Now that the containers are built, it time to start the server

```bash
sudo docker-compose up
```

If all goes well, you should have a server running at `localhost:5000`,
Happy Coding :rocket:
