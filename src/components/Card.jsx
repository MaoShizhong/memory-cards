export function Card({ fileName, scoreClick }) {
    const image = new URL(`../assets/${fileName}.png`, import.meta.url).href;

    return (
        <button className="border-2 border-black max-w-fit" value={fileName} onClick={scoreClick}>
            <img src={image} alt=""></img>
        </button>
    );
}
