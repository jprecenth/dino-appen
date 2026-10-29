import type { ImageSourcePropType } from "react-native";
import apatosaurus from '../images/apatosaurus.png';
import barosaurus from '../images/barosaurus.png';
import dilophosaurus from '../images/dilophosaurus.png';
import elasmosaurus from '../images/elasmosaurus.png';
import gallimimus from '../images/gallimimus.png';
import nodosaurus from '../images/nodosaurus.png';
import parasaurolophus from '../images/parasaurolophus.png';
import pterodactyl from '../images/pterodactyl.png';
import stegosaurus from '../images/stegosaurus.png';
import tyrannosaurus from '../images/tyrannosaurus.png';

export type Dino = {
    name: string,
    favourtie: boolean,
    imgsrc: ImageSourcePropType
}

export const dinoList: Dino[] = [
    {
        name: "Apatosaurus",
        favourtie: false,
        imgsrc: apatosaurus
    },
    {
        name: "Barosaurus",
        favourtie: false,
        imgsrc: barosaurus
    },
    {
        name: "Dilophosaurus",
        favourtie: false,
        imgsrc: dilophosaurus
    },
    {
        name: "Elasmosaurus",
        favourtie: false,
        imgsrc: elasmosaurus
    },
    {
        name: "Gallimimus",
        favourtie: false,
        imgsrc: gallimimus
    },
    {
        name: "Nodosaurus",
        favourtie: false,
        imgsrc: nodosaurus
    },
    {
        name: "Parasaurolophus",
        favourtie: false,
        imgsrc: parasaurolophus
    },
    {
        name: "Stegosaurus",
        favourtie: false,
        imgsrc: stegosaurus
    },
    {
        name: "Tyrannosaurus",
        favourtie: false,
        imgsrc: tyrannosaurus
    },
    {
        name: "Pterodactyl",
        favourtie: false,
        imgsrc: pterodactyl
    },
] 