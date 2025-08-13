import '../styles/tile.css';

type TileProps = {
    onClick: () => any; 
    children?: React.ReactNode;
}

export function Tile({ onClick, children }: TileProps) {
    return (
        <button class="tile" onClick={onClick}>
            {children}
        </button>
    );
}