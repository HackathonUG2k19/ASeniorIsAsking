# ASeniorIsAsking

It is 3 am. You just finished working on a project of yours and the night cravings hit *hard*. What would you *not* do for a Tawa Bonda or a Shawarma? The only thing you wouldn't do is walk all the way to DLF of course. Your message "koi DLF me hai kya" on a WhatsApp group will just get lost in the typical 3 a.m. spam. If only there were a way for you to talk to fachhas already at DLF...

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
