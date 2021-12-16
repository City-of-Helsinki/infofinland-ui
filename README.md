# Infofinland Nextjs repository

## Intro

Infofinland Nextjs-frontend for headless drupal site.

See also [https://github.com/City-of-Helsinki/drupal-infofinland](https://github.com/City-of-Helsinki/drupal-infofinland) for instructions on running corresponding Drupal site locally.

## Development

Install Yarn if not already installed

```bash
npm install -g yarn
```

Clone [the InfoFinland UI](https://github.com/City-of-Helsinki/infofinland-ui) repo

```bash
git clone git@github.com:City-of-Helsinki/infofinland-ui.git
cd info-finland-ui
git checkout develop
git checkout -b feature/newstuff
```

Install dependencies

```bash
yarn
```

Copy one of `.env.example.local`,`.env.example.dev` or `.env.example.production` to .env.local. This is a `.gitignore`d local checkout's env file. Modify it as you need, depending on which drupal instance you want to connect to.

Required environment variables are

```env
NEXT_PUBLIC_DRUPAL_BASE_URL='https://url-to-site.com
NEXT_IMAGE_DOMAIN=image.domain.com
DRUPAL_SITE_ID=THE SITE ID HASH FROM DRUPAL INSTANCE
DRUPAL_FRONT_PAGE=/
DRUPAL_PREVIEW_SECRET=PREVIEW SECRET FROM DRUPAL INSTANCE
DRUPAL_CLIENT_ID=PREVIEW CLIENT ID HASH FROM DRUPAL INSTANCE
DRUPAL_CLIENT_SECRET=CLIENT_SECRET FROM DRUPAL INSTANCE

# Use this if your dev connection does not have a signed certificate
NODE_TLS_REJECT_UNAUTHORIZED=0

#Always make sure this is set to 0
NEXT_TELEMETRY_DISABLED=0
```

### Start development server

```bash
yarn dev
```

Go to `localhost:3000` in your browser.

Make changes to your feature branch, run linter.
This project uses ESlint NextJS plugin rules and ESLint Tailwind plugin rules.

```bash
yarn next lint
```

Format your code before committing. You can set your IDE to run prettier automaticallt but if you dont, run it manually before you commit. For now, there are no precommit tasks.

```bash
yarn format
```

Run all tests (again, but now if you didn't). Check all snapshots, make sure you include new tests for new code.

```bash
yarn test
```

Use watch-mode for test runner

```bash
yarn test --watch
```

Commit to you feature branch, push to repo, make a merge request.

### Required tools

Preferred editor is VSCode but any editor or IDE is quite fine.
Just remember to use _Editorconfig._

#### Recommended setup:

VSCode with the following extensions:

- Editorconfig (see .editorconfig)
- Docker
- ENV (file type support for .env files)
- ESLint
- Prettier (See .prettierrc)
- Prettier ESlint
- TailwindCSS Intellisense, Tailwind Docs
- Azure toolkit, Azure CLI Tools

## Production deployment

TODO: Check env variables in docker container

### Run production server locally.

Ensure you have set next-drupal environment variables.
You may create a local `.env.producion` file using the `.env.example ` files

Make a build and start Nextjs server. See `localhost:3000`

```bash
yarn build && yarn start
```

### Run production server on local docker.

Build Dockerfile, start container. See `localhost:8080`

#### _In VSCode_

- Check environment variables (TODO instructions here)
- Install Docker Extension if not installed
- Build image
  - Right-click on Dockerfile, select Build Image. (no build-args)
  - or run from command line

```bash
docker build --build-arg [NEXT_DRUPAL_SITE_ID|and other variables]='env values to docker container'  -t infofinlandui .
```

- Check that image is built without errors.
- Select the new image from Docker-tab, Run Interactive, See localhost:8080.

## Styling

This project uses [TailwindCSS](https://tailwindcss.com/) for styling. In this project we _AVOID_ using any CSS-in-JS or other dynamic styling techniques.

Use Tailwind classes as much as possible. Custom classes use BEM marking with ifu-prefix to differentiate custom classes from Tailwind classes.

All component class collections can be converted to custom class using Tailwind classes with @apply. Prefer this, especially when dealing with spacing and other relational units.

EXAMPLE:

```css
.ifu-block__element--modifier {
  @apply text-body-small text-blue-white shadow hover:text-blue-light;
}
```

### Tailwind Config viewer

The project includes a [Tailwind config viewer](https://www.npmjs.com/package/tailwind-config-viewer).for inspecting and developing desing assets and tokens.

```bash
yarn twconfig
```

### Images

In the UI, use React SVG components as much as possible.

## Localization

Static UI texts are localized with [next-i18next](https://github.com/isaachinman/next-i18next).

See `public/locales/[locale]/common.json`. Page-level localization files are not required at this point but can be added as needed.
