"use client";

import { useEffect, useRef, useState } from "react";
import { parseCSV } from "@/utils/csv";
import { getDifferentRandomIndex } from "@/utils/random";

type Tense = {
    id: string;
    tense: string;
};

type Verb = {
    id: string;
    verb: string;
};

type Subject = {
    id: string;
    subject: string;
};

export const useGrammarData = () => {
    const [tenses, setTenses] = useState<Tense[]>([]);
    const [verbs, setVerbs] = useState<Verb[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);


    const [randomTense, setRandomTense] = useState("");
    const [randomVerb, setRandomVerb] = useState("");
    const [randomSubject, setRandomSubject] = useState("");

    const lastTenseIndexRef = useRef<number | null>(null);
    const lastVerbIndexRef = useRef<number | null>(null);
    const lastSubjectIndexRef = useRef<number | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const tensesText = await (await fetch("/data/tenses.csv")).text();
            const verbsText = await (await fetch("/data/verbs.csv")).text();
            const subjectsText = await (await fetch("/data/subjects.csv")).text();

            const tensesData = parseCSV<Tense>(
                tensesText,
                ([id, tense]) => ({
                    id,
                    tense,
                })
            );

            const verbsData = parseCSV<Verb>(
                verbsText,
                ([id, verb]) => ({
                    id,
                    verb,
                })
            );

            const subjectsData = parseCSV<Subject>(
                subjectsText,
                ([id, subject]) => ({
                    id,
                    subject,
                })
            );

            setTenses(tensesData);
            setVerbs(verbsData);
            setSubjects(subjectsData);

            generate(tensesData, verbsData, subjectsData);
        };

        loadData();
    }, []);

    const generate = (
        tensesData = tenses,
        verbsData = verbs,
        subjectsData = subjects
    ) => {
        if (!tensesData.length || !verbsData.length || !subjectsData.length) return;

        const tenseIndex = getDifferentRandomIndex(
            tensesData.length,
            lastTenseIndexRef.current
        );

        const verbIndex = getDifferentRandomIndex(
            verbsData.length,
            lastVerbIndexRef.current
        );

        const subjectIndex = getDifferentRandomIndex(
            subjectsData.length,
            lastSubjectIndexRef.current
        );

        lastTenseIndexRef.current = tenseIndex;
        lastVerbIndexRef.current = verbIndex;
        lastSubjectIndexRef.current = subjectIndex;

        setRandomTense(tensesData[tenseIndex].tense);
        setRandomVerb(verbsData[verbIndex].verb);
        setRandomSubject(subjectsData[subjectIndex].subject);
    };

    return {
        randomTense,
        randomVerb,
        randomSubject,
        generate,
    };
};
