"use client";

type Props = {
    onClick: () => void;
};

export default function GenerateButton({ onClick }: Props) {
    return (
        <button
            onClick={() => {onClick()}}
            className="px-8 py-3 text-lg font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition shadow-md"
        >
            🎲 Generate
        </button>
    );
}

