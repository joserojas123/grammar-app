"use client";

import { useGrammarData } from "@/hooks/useGrammarData";
import GenerateButton from "@/components/GenerateButton";

export default function Home() {
    const { randomSubject, randomVerb, randomTense, generate } = useGrammarData();

    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50 text-gray-800">
            <h1 className="text-4xl font-bold">Grammar App</h1>

            <div className="bg-white shadow-lg rounded-2xl p-8 text-center space-y-4">
                <p className="text-2xl">
                    🧍Subject: <span className="font-semibold">{randomSubject}</span>
                </p>
                <p className="text-2xl">
                    🔤Verb: <span className="font-semibold">{randomVerb}</span>
                </p>
                <p className="text-2xl">
                    ⏳Tense: <span className="font-semibold">{randomTense}</span>
                </p>
            </div>

            <GenerateButton onClick={generate} />
        </main>
    );
}
