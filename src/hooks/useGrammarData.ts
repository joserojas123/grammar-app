"use client";

import { useEffect, useRef, useState } from "react";
import { parseCSV } from "@/utils/csv";
import { getDifferentRandomIndex } from "@/utils/random";

type Tense = {
    id: string;
    tense: string;
};

type Subject = {
    id: string;
    subject: string;
};

export const useGrammarData = () => {
    const [tenses, setTenses] = useState<Tense[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);

    const [randomTense, setRandomTense] = useState("");
    const [randomSubject, setRandomSubject] = useState("");

    const lastTenseIndexRef = useRef<number | null>(null);
    const lastSubjectIndexRef = useRef<number | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const tensesText = await (await fetch("/data/verb_tenses.csv")).text();
            const subjectsText = await (await fetch("/data/subjects.csv")).text();

            const tensesData = parseCSV<Tense>(tensesText, ([id, tense]) => ({
                id,
                tense,
            }));

            const subjectsData = parseCSV<Subject>(
                subjectsText,
                ([id, subject]) => ({
                    id,
                    subject,
                })
            );

            setTenses(tensesData);
            setSubjects(subjectsData);

            generate(tensesData, subjectsData);
        };

        loadData();
    }, []);

    const generate = (
        tensesData = tenses,
        subjectsData = subjects
    ) => {
        if (!tensesData.length || !subjectsData.length) return;

        const tenseIndex = getDifferentRandomIndex(
            tensesData.length,
            lastTenseIndexRef.current
        );

        const subjectIndex = getDifferentRandomIndex(
            subjectsData.length,
            lastSubjectIndexRef.current
        );

        lastTenseIndexRef.current = tenseIndex;
        lastSubjectIndexRef.current = subjectIndex;

        setRandomTense(tensesData[tenseIndex].tense);
        setRandomSubject(subjectsData[subjectIndex].subject);
    };

    return {
        randomTense,
        randomSubject,
        generate,
    };
};
