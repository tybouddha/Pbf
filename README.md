# Project Baby Frontend

![Project Baby Logo](/assets/images/logo128.png)

## Git command
- créer un branch: ` git branch [nom_de_branch]`
- voir touts les branch: `git branch`
- pull branch direct `git pull origin [nom_de_branch]`


## Installation
le depart de ce projet est `npx create-expo-app@latest --template`

1. Navigation
```bash
yarn add @react-navigation/native@6
expo install react-native-screens react-native-safe-area-context
```
Stack navigation:
`yarn add @react-navigation/native-stack@6`
Tab navigation:
`yarn add @react-navigation/bottom-tabs@6`

2. FontAwesome
`yarn add @fortawesome/react-native-fontawesome @fortawesome/fontawesome-svg-core react-native-svg`
`yarn add @fortawesome/free-solid-svg-icons`


### Expliuque Header Props

### Police
- Type: Caveat 

1. Telecharger police [Google Font Family Caveat](https://fonts.google.com/share?selection.family=Caveat:wght@400..700)
2. (peut-etre pas necessaire)`npx react-native-asset`
3. App.js - ajouter une useState et useEffect pour charger le police.

```jsx
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({

        'Caveat': require('./assets/fonts/Caveat-VariableFont_wght.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    console.log('--- font NOT loaded')
  } else {
    console.log('--- font loaded')
  }

  return (
      <NavigationContainer>
      </NavigationContainer>
  );
}
```
4. Pour l'utiliser:
```jsx
const styles = StyleSheet.create({
    btnText:{
        fontFamily: 'Caveat',
        fontSize: 30
    }
    });
```

## Project Baby Details

### Figma 
- UI Kit et Mock Up
[Lien a Figma](https://www.figma.com/design/gbN5TEyfZvltUOCT5Kmihd/BabyProject?node-id=0-1&node-type=canvas&t=AizRPK6XI3cnRWuV-0)
- Figma design pour le calendrier [Lien a Figma Calendrier](https://www.figma.com/design/qyV1UIHCcqqYG6G6DMaQgT/Calendar-mobile-app-(Community)?node-id=1-27&node-type=frame&t=LWKAGbGyMjrQkLXy-0)

### Drive Google 
- Où on peux sauvegarder toutes nos images, pdf, etc.: [Lien a Google Drive](https://drive.google.com/drive/folders/1MR9_ggF5i64Gjs0xQGo1dvmDbFgdyhTI?usp=drive_link)

### Trello
liste de contrôle pour toutes les boulots
- [Lien a Trello](https://trello.com/b/vzGjy7JP/project-baby)

### Base de données
- [Miro: Diagramme BDD ProjectBaby](https://miro.com/app/board/uXjVLNosuSo=/)  < -- supprimer?
- [Miro: Diagramme BDD ProjectBaby 2](https://miro.com/app/live-embed/uXjVLN155II=/?moveToViewport=-1430,-88,2178,1144&embedId=129046321067) < -- nouveau Clovis suggestion

### Wire Frame
- [Whimsical: Nav Baby](https://whimsical.com/project-baby-nav-baby-FUA77T2hidyPbSAFfNNLy9)
- [Whimsical: Chemin Co](https://whimsical.com/project-baby-nav-baby-FUA77T2hidyPbSAFfNNLy9)

### Excalidraw
- TT's diagramme: [Lien a Excalidraw](https://excalidraw.com/#json=MFZCuN98J6bwZjBH5rmuj,tphzUOuySuBaEHKHwuKyNQ)

### GitHub
- [Frontend](https://github.com/tybouddha/Project_Baby_Frontend.git)
- [Backend](https://github.com/tybouddha/Project_Baby_Backend.git)


## Expo Defaut
This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

### Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

### Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

### Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
