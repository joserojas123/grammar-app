"use client";

import { useEffect, useState } from "react";

type Tense = {
    id: string;
    tense: string;
};

type Subject = {
    id: string;
    subject: string;
};

export default function Home() {
    const [tenses, setTenses] = useState<Tense[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);

    const [randomTense, setRandomTense] = useState<string>("");
    const [randomSubject, setRandomSubject] = useState<string>("");

    const [lastTenseIndex, setLastTenseIndex] = useState<number | null>(null);
    const [lastSubjectIndex, setLastSubjectIndex] = useState<number | null>(null);

    useEffect(() => {
        const loadData = async () => {
            // Load tenses
            const tenseText = await (await fetch("/data/tenses.csv")).text();
            const tensesData: Tense[] = tenseText
                .split("\n")
                .slice(1)
                .map(r => r.trim())
                .filter(Boolean)
                .map(row => {
                    const [id, tense] = row.split(",");
                    return { id, tense };
                });

            // Load subjects
            const subjectText = await (await fetch("/data/subjects.csv")).text();
            const subjectsData: Subject[] = subjectText
                .split("\n")
                .slice(1)
                .map(r => r.trim())
                .filter(Boolean)
                .map(row => {
                    const [id, subject] = row.split(",");
                    return { id, subject };
                });

            setTenses(tensesData);
            setSubjects(subjectsData);

            generateRandom(tensesData, subjectsData);
        };

        loadData();
    }, []);

    const getDifferentRandomIndex = (
        length: number,
        lastIndex: number | null
    ) => {
        if (length <= 1) return 0;

        let index;
        do {
            index = Math.floor(Math.random() * length);
        } while (index === lastIndex);

        return index;
    };

    const generateRandom = (
        tensesData = tenses,
        subjectsData = subjects
    ) => {
        if (!tensesData.length || !subjectsData.length) return;

        const tenseIndex = getDifferentRandomIndex(
            tensesData.length,
            lastTenseIndex
        );

        const subjectIndex = getDifferentRandomIndex(
            subjectsData.length,
            lastSubjectIndex
        );

        setLastTenseIndex(tenseIndex);
        setLastSubjectIndex(subjectIndex);

        setRandomTense(tensesData[tenseIndex].tense);
        setRandomSubject(subjectsData[subjectIndex].subject);
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50 text-gray-800">
            <h1 className="text-4xl font-bold">Grammar App</h1>

            <div className="bg-white shadow-lg rounded-2xl p-8 text-center space-y-4">
                <p className="text-2xl">
                    🧍 <span className="font-semibold">{randomSubject}</span>
                </p>

                <p className="text-2xl">
                    ⏳ <span className="font-semibold">{randomTense}</span>
                </p>
            </div>

            <button
                onClick={() => generateRandom()}
                className="
          mt-4
          px-8 py-3
          text-lg font-semibold
          rounded-xl
          bg-blue-600 text-white
          hover:bg-blue-700
          active:scale-95
          transition
          shadow-md
        "
            >
                🎲 Generate
            </button>
        </main>
    );
}