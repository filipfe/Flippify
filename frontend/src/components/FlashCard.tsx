import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useState, useEffect, useContext } from 'react'
import { useTailwind } from "tailwind-rn/dist";
import { AnswerContext } from "../context/AnswerProvider";

export interface AnswerType {
    id: number,
    content: string,
    correct: boolean,
}

export interface FlashCardProps {
    question: string,
    type: 'radio' | 'input',
    answers: AnswerType[]
}

export default function FlashCard(props: FlashCardProps) {
    const tw = useTailwind()
    const [status, setStatus] = useState<'correct' | 'wrong' | undefined>(undefined)
    const { answer } = useContext(AnswerContext)

    useEffect(() => {
        if(!answer) return
        let correct = props.answers.find(ans => ans.correct)
        if(correct?.content === answer) setStatus('correct')
        else setStatus('wrong')
    }, [answer])

    return (
        <SafeAreaView style={tw('flex-1 items-center justify-center')}>
            <Text style={tw('font-bold text-3xl text-center')}>{props.question}</Text>
            {props.answers && props.answers.map(answer => <Answer {...answer} key={answer.id} />)}
            {status && <Text style={status === 'correct' ? tw('text-green-400') : tw('text-red-400')}>{status}</Text>}
        </SafeAreaView>
    )
}


const Answer = (props: AnswerType) => {
    const { setAnswer } = useContext(AnswerContext)
    return <TouchableOpacity onPress={() => setAnswer(props.content)}><Text>{props.content}</Text></TouchableOpacity>
}