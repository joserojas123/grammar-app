"use client";

import { useState } from "react";
import { useGrammarData } from "@/hooks/useGrammarData";
import GenerateButton from "@/components/GenerateButton";

export default function Home() {
    const { randomSubject, randomVerb, randomTense, generate } = useGrammarData();
    const [animKey, setAnimKey] = useState(0);

    const handleGenerate = () => {
        generate();
        setAnimKey((k) => k + 1);
    };

    return (
        <main className="grammar-main">
            <div className="grammar-bg" aria-hidden />

            <header className="grammar-header">
                <span className="grammar-eyebrow">[ grammar ]</span>
                <h1 className="grammar-title">Exercise Generator</h1>
            </header>

            <div className="grammar-card" key={animKey}>
                <GrammarRow label="Subject" value={randomSubject} delay={0} />
                <div className="grammar-divider" />
                <GrammarRow label="Verb" value={randomVerb} delay={0.08} />
                <div className="grammar-divider" />
                <GrammarRow label="Tense" value={randomTense} delay={0.16} />
            </div>

            <GenerateButton onClick={handleGenerate} />
        </main>
    );
}

function GrammarRow({ label, value, delay }: { label: string; value: string; delay: number }) {
    return (
        <div className="grammar-row" style={{ animationDelay: `${delay}s` }}>
            <span className="grammar-row-label">{label}</span>
            <span className="grammar-row-value">{value || "—"}</span>
        </div>
    );
}
