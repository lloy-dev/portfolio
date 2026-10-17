<h1 align="center">Portfolio</h1>

<h3 align="center">A dynamic portfolio website to showcase projects, skills and experience.</h3>

<p align="center">
  <a href="https://github.com/lloy-dev/portfolio/releases/latest"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/lloy-dev/portfolio?style=for-the-badge&label=Release"></a>
  <a href="https://www.figma.com/design/RQCYf7U8FfqjJGFWUtd2IS/Portfolio?node-id=9656-2380&t=q6iQTBMSb4Hzh8wf-4"><img alt="Figma" src="https://img.shields.io/badge/Figma-333333?style=for-the-badge&logo=figma"></a>
  <a href="https://github.com/lloy-dev/portfolio-core"><img alt="Portfolio Core" src="https://img.shields.io/badge/Core-v1.0.0-blue?style=for-the-badge"></a>
  <img alt="Portfolio Dashboard" src="https://img.shields.io/badge/Dashboard-wip-blue?style=for-the-badge">
</p>

<p align="center">
  <img alt="React Version" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Flloy-dev%2Fportfolio%2Fraw%2Frefs%2Fheads%2Fmain%2Fpackage.json&query=%24.dependencies.react&style=flat-square&logo=react&label=React">
  <img alt="Storybook Version" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Flloy-dev%2Fportfolio%2Fraw%2Frefs%2Fheads%2Fmain%2Fpackage.json&query=%24.devDependencies.storybook&style=flat-square&logo=storybook&label=Storybook">
  <img alt="Firebase Version" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Flloy-dev%2Fportfolio%2Fraw%2Frefs%2Fheads%2Fmain%2Fpackage.json&query=%24.dependencies.firebase&style=flat-square&logo=firebase&label=Firebase">
  <img alt="MUI Version" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Flloy-dev%2Fportfolio%2Fraw%2Frefs%2Fheads%2Fmain%2Fpackage.json&query=%24.dependencies.%40mui%2Fmaterial&style=flat-square&logo=mui&label=MUI">

</p>

<table align="center">
  <tr>
    <td align="center">
      <img src="./docs/images/figma_design_preview.png" width="100%"/><br>
      <sub><em>Figure 1: Figma Design Preview</em></sub>
    </td>
  </tr>
</table>

## Version Notes

- `v2.x.x` uses a slightly different database structure but still uses Firebase Firestore.
- `v1.x.x` uses Firebase Firestore to display data.
- `v0.x.x` uses `data.tsx` file to display data.

## Setup

1. Setup a Firebase Project. Please see the [Wiki](https://github.com/lloy-dev/portfolio/wiki).
2. Clone the repository.
3. Create an `.env` file based from [.env.example](.env.example).
4. Run `npm install` to install dependencies.
5. Run `npm run dev` to start the dev server.
6. Run `npm run storybook` to start storybook.
7. Material themes can be modified in [themes.tsx](src/configs/themes.tsx) and primary/secondary colors can be modified in the `.env` file (optional).
8. More [index.html](./index.html) customization can now be modified through `.env` file.

## Running Dockerized

1. Comment out the `.env` in [.dockerignore](.dockerignore).
2. Run the following:
   ```sh
   docker compose watch portfolio-dev
   ```

## Manual Deployment With Firebase Hosting

1. Setup a [Firebase Project](console.firebase.google.com).
2. Setup hosting in that project.
3. Add another site if you want to deploy storybook as well (optional).
4. Install Firebase CLI if you haven't yet.
   ```sh
   npm install -g firebase-tools
   ```
5. Login through Firebase CLI if you haven't yet.
   ```sh
   firebase login
   ```
6. Create a `.firebaserc` based from [.firebaserc.example](.firebaserc.example).
7. Update the names in `.firebaserc` to match your Project IDs created in Firebase.
   - `nickname-portfolio` should be replaced with the default id as you created the project.
   - `nickname-portfolio-storybook` should be replaced with the additional site you created within the project.
8. Run `npm run build` to build the React App (Portfolio).
9. Run `npm run build-storybook` to build the Storybook.
10. Run `npm run deploy-dev-portfolio` to deploy the React App to a dev channel for testing (optional).
11. Run `npm run deploy-dev-storybook` to deploy the Storybook to a dev channel for testing (optional).
12. `npm run deploy-all` will deploy both React App and Storybook to their respective site.

## Automated Deployments With Firebase Hosting

1. Setup a [Firebase Project](https://console.firebase.google.com) if you haven't yet.
2. Setup hosting in that project.
3. Add another site if you want to deploy storybook as well (optional).
4. Create a `.firebaserc` based from [.firebaserc.example](.firebaserc.example).
5. Update the names in `.firebaserc` to match your Project IDs created in Firebase.
   - `nickname-portfolio` should be replaced with the default id as you created the project.
   - `nickname-portfolio-storybook` should be replaced with the additional site you created within the project.
6. Create a copy of the following and put it inside [.github/workflows](./.github/workflows):
   - [firebase-hosting-merge.example.yml](./docs/examples/firebase-hosting-merge.example.yml) - Deploy on Merge
   - [firebase-hosting-pull-request.example.yml](./docs/examples/firebase-hosting-pull-request.example.yml) - Deploy a preview on pull request creation
7. Update necessary values in the file and also add necessary secrets in the **Repository Settings** > **Secrets and variables** > **Actions**.
8. Changes will be automatically deployed as configured.
