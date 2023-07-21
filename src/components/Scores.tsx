interface ScoresProps {
    score: number;
    bestScore: number;
}

export function Scores({ score, bestScore }: ScoresProps) {
    return (
        <div className="flex justify-center gap-8 my-8 text-xl">
            <p>
                <b>Score:</b> {score}
            </p>
            <p>
                <b>High score:</b> {bestScore}
            </p>
        </div>
    );
}
