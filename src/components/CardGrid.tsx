import { useEffect, useState, useRef, MouseEvent } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Card } from './Card';
import { Scores } from './Scores';
import { GameEnd } from './GameEnd';

interface CardDetails {
    fileName: string;
    id: string;
}

interface GameState {
    cardComponents: CardDetails[];
    cardsClicked: string[];
}

type PlayState = 'play' | 'win' | 'lose';

const ALL_CARDS: CardDetails[] = [
    { fileName: 'cutoff_heart', id: uuidV4() },
    { fileName: 'green_pink_nose', id: uuidV4() },
    { fileName: 'LRL_chevrons_crooked_in', id: uuidV4() },
    { fileName: 'LRL_chevrons_crooked_up', id: uuidV4() },
    { fileName: 'LRL_chevrons', id: uuidV4() },
    { fileName: 'RLR_chevrons', id: uuidV4() },
    { fileName: 'red_diamond_flakes', id: uuidV4() },
    { fileName: 'red_diamond_flakes_top_corners', id: uuidV4() },
    { fileName: 'red_diamond_flakes_bottom_corners', id: uuidV4() },
    { fileName: 'red_three_star_flakes', id: uuidV4() },
    { fileName: 'sad_cloud', id: uuidV4() },
    { fileName: 'very_sad_cloud', id: uuidV4() },
    { fileName: 'three_coloured_blobs', id: uuidV4() },
    { fileName: 'three_point_star', id: uuidV4() },
    { fileName: 'two_stars', id: uuidV4() },
    { fileName: 'triangles', id: uuidV4() },
    { fileName: 'small_hept_big_oct', id: uuidV4() },
    { fileName: 'small_oct_big_hept', id: uuidV4() },
];

const NEW_GAME_STATE: GameState = {
    cardComponents: getShuffledCards(ALL_CARDS),
    cardsClicked: [],
};

export function CardGrid() {
    const [playState, setPlayState] = useState<PlayState>('play');
    const [cards, setCards] = useState(NEW_GAME_STATE);
    const [bestScore, setBestScore] = useState(0);

    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect((): void => {
        if (cards.cardsClicked.length === cards.cardComponents.length) {
            setPlayState('win');
        }
    }, [cards]);

    useEffect((): void => {
        if (playState !== 'play') {
            modalRef.current?.showModal();
        }
    }, [playState]);

    return (
        <div>
            {playState === 'play' ? null : (
                <GameEnd
                    ref={modalRef}
                    result={playState}
                    score={cards.cardsClicked.length}
                    startNewGame={startNewGame}
                />
            )}
            <Scores score={cards.cardsClicked.length} bestScore={bestScore} />
            <div className="grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-6 place-items-center lg:mx-8">
                {cards.cardComponents.map((card) => (
                    <Card key={card.id} fileName={card.fileName} scoreClick={scoreClick} />
                ))}
            </div>
        </div>
    );

    function scoreClick(e: MouseEvent): void {
        const cardBtn = e.currentTarget as HTMLButtonElement;

        if (cards.cardsClicked.includes(cardBtn.value)) {
            setPlayState('lose');
        } else {
            setCards({
                cardComponents: getShuffledCards([...cards.cardComponents]),
                cardsClicked: [...cards.cardsClicked, cardBtn.value],
            });
        }
    }

    function startNewGame(): void {
        modalRef.current?.close();
        setPlayState('play');
        setBestScore(Math.max(bestScore, cards.cardsClicked.length));
        setCards(NEW_GAME_STATE);
    }
}

/* 
    Fisher-Yates shuffle - less permutation bias than other shuffle algos
*/
function getShuffledCards(arr: CardDetails[]): CardDetails[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = ~~(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
