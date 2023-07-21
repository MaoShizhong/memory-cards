import { forwardRef } from 'react';

interface GameEndProps {
    result: string;
    score: number;
    startNewGame: () => void;
}

export const GameEnd = forwardRef<HTMLDialogElement, GameEndProps>(function GameEnd(
    { result, score, startNewGame },
    modalRef
) {
    return (
        <dialog className="w-1/5 rounded-3xl" ref={modalRef}>
            <h1 className="my-4">You {result}!</h1>
            <p>Score: {score}</p>
            <button className="p-3 my-4 text-gray-700" onClick={startNewGame}>
                <b>
                    <u>Click here to try again!</u>
                </b>
            </button>
        </dialog>
    );
});
