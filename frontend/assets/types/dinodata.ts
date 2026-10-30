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
    dinoID: string,
    name: string,
    favourtie: boolean,
    imgsrc: ImageSourcePropType
}

export const dinoList: Dino[] = [
    {
        dinoID: "apatosaurus",
        name: "Apatosaurus",
        favourtie: false,
        imgsrc: apatosaurus
    },
    {
        dinoID: "barosaurus",
        name: "Barosaurus",
        favourtie: false,
        imgsrc: barosaurus
    },
    {
        dinoID: "dilophosaurus",
        name: "Dilophosaurus",
        favourtie: false,
        imgsrc: dilophosaurus
    },
    {
        dinoID: "elasmosaurus",
        name: "Elasmosaurus",
        favourtie: false,
        imgsrc: elasmosaurus
    },
    {
        dinoID: "gallimimus",
        name: "Gallimimus",
        favourtie: false,
        imgsrc: gallimimus
    },
    {
        dinoID: "nodosaurus",
        name: "Nodosaurus",
        favourtie: false,
        imgsrc: nodosaurus
    },
    {
        dinoID: "parasaurolophus",
        name: "Parasaurolophus",
        favourtie: false,
        imgsrc: parasaurolophus
    },
    {
        dinoID: "stegosaurus",
        name: "Stegosaurus",
        favourtie: false,
        imgsrc: stegosaurus
    },
    {
        dinoID: "tyrannosaurus",
        name: "Tyrannosaurus",
        favourtie: false,
        imgsrc: tyrannosaurus
    },
    {
        dinoID: "pterodactyl",
        name: "Pterodactyl",
        favourtie: false,
        imgsrc: pterodactyl
    },
] 