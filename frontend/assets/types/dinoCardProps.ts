import { Dino } from "@/assets/types/dinodata";

export type DinoCardProps = {
    dino: Dino,
    isFavourite: boolean,
    favouriteToggle: (value: Dino) => void;
}