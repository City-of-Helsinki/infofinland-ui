# Infofinland Nextjs repository


## Intro
Infofinland Nextjs frontend for headless drupal site. 

See also  [https://github.com/City-of-Helsinki/drupal-infofinland](https://github.com/City-of-Helsinki/drupal-infofinland)



## Development 

Install Yarn if not already installed
```bash
npn i -g yarn
```
Clone this repo
```bash
git clone git@github.com:City-of-Helsinki/infofinland-ui.git
cd info-finland-ui
git checkout development
```
Install dependencies
```bash
yarn
```

3. Start development server
```bash
yarn dev
```

4. Make changes, run linter.
This project uses ESlint NextJS plugin rules and ESLint Tailwind plugin rules.
```bash
yarn next lint
```

5. Format your code before committing. You can set your IDE to run prettier automaticallt but if you dont, run it manually before you commit. For now, there are no precommit tasks.

```bash
yarn format
```

6. Commit to you feature branch, push to repo, make a merge request.

_TODO: Add tests to this list._


### Required tools

Preferred Editor is VSCode but any editor or IDE is quite fine.
Just remember to use *Editorconfig.* 

#### Recommended setup:
  VSCode with the following extensions:
  * Editorconfig (see .editorconfig) 
  * Docker
  * ENV (file type support for .env files)
  * ESLint
  * Prettier (See .prettierrc)
  * Prettier ESlint
  * TailwindCSS Intellisense, Tailwind Docs
  * Azure toolkit, Azure CLI Tools
  


  


## Production deployment
### Run production server locally. 
Make a build and start Nextjs server. See localhost:3000

```bash
yarn build && yarn start 
```

### Run production server on local docker.

Build Dockerfile, start container. See localhost:3000

#### *In VSCode*

* Install Docker Extension if not installed
* Right-click on Dockerfile, select Build Image.
* Check that image is built without errors.
* Select the new image from Docker-tab, Run Interactive, See localhost:3000.





## Styling

This project uses TailwindCSS for styling. In this project we _AVOID_ using any CSS-in-JS or other dynamic styling techniques. 

Use Tailwind classes as much as possible. Custom classes use BEM marking with ifu-prefix to differentiate custom classes from Tailwind classes.

All component class collections can be converted to custom class using Tailwind classes with @apply. Prefer this, especially when dealing with spacing and other relational units. 

EXAMPLE:

```css
.ifu-block__element--modifier {
  @apply text-body-small text-blue-white shadow hover:text-blue-light;
}
```


## Images
Use React SVG components as much as possible.

## Localization

Static UI texts are localized in using  [https://www.npmjs.com/package/next-translate](https://www.npmjs.com/package/next-translate).
See /locales/[locale]/common.json. This project uses only common.json.
Page-level localization files are not required.


