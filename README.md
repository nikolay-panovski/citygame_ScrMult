# Memory puzzle with screens

This repo should be used as part of the [Nova Gorica city game](https://github.com/kevinveld2001/citygame) together with the respective [Toto](https://create.toto.io/start) repo.
Since the resulting frontend app is based on Electron (packaging on Electron Forge), it should be able to be packaged (made - see below) for Windows, Mac and Linux.

### Setting up in Toto

- Go to your Toto repository.
- Go to `objects` tab and add a new object. Name it something meaningful. For clarity, include `hub` in the name. This object will be the one sending messages to the app instances.
- Add several new objects, one per screen you want to use for a copy of this puzzle. These objects will be the "clients" listening to the "hub".
- Note down all object IDs. Those can be found here within the Toto CMS (after adding a new TotoObject):

  ![GUIDE_ScrMult_TotoObjectId](https://github.com/nikolay-panovski/citygame_ScrMult/assets/78737019/0797786b-bbe9-4f3e-ad74-0ec79e99db6f)

### Making an app instance

- Clone the code of this GitHub repository.
- If a different screen size is necessary, in `main.js` change the width and height within the `new BrowserWindow()`.
- In `preload.js`, change the `totoObjectId` to an ID of a unique client TotoObject for the current screen/app instance.
- In `renderer.js`, change the image URL to your desired image (which should exist within `imgs` folder).
- `npm install` the dependencies and devDependencies, then `npm run make`. **Find the app executable to run in** `/out/<APPNAME-OSNAME>`. You can put this on the target machine.
- **IMPORTANT!** Create a `.env` file in the `/out/<APPNAME-OSNAME>` folder from the last step with the required Toto credentials. See `.env.example`.

  Without this file, the app will not connect to Toto and will close immediately.

- Optionally, configure the app to run on OS startup.

Repeat as many times as the number of screens you want to use in the puzzle, changing the `totoObjectId`s and images respectively.


# Known issues

- [ ] Image may not be tiled correctly depending on the screen/app size (`index.html` -> `style - body` -> `background-size: cover`).
