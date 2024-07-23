import './Tile.css';

export default function Tile({letter, state}) {

    return (
        <div className={`Tile ${state}`}>
            {letter}
        </div>
    );

};
