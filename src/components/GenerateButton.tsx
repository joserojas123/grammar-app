"use client";

type Props = {
    onClick: () => void;
};

export default function GenerateButton({ onClick }: Props) {
    return (
        <button className="grammar-btn" onClick={onClick}>
            <span className="grammar-btn-label">Generate</span>
        </button>
    );
}
