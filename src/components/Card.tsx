import { MouseEvent } from 'react';

interface CardProps {
    fileName: string;
    scoreClick: (e: MouseEvent) => void;
}

export function Card({ fileName, scoreClick }: CardProps) {
    const image = new URL(`../assets/${fileName}.png`, import.meta.url).href;

    return (
        <button className="border-2 border-black max-w-fit" value={fileName} onClick={scoreClick}>
            <img src={image} alt=""></img>
        </button>
    );
}
