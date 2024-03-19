import { HfInference, TextClassificationOutput } from '@huggingface/inference'

let hf: HfInference

export default class ApiHelpers {
    static async runInference(input: string) {
        if (!hf) {
            hf = new HfInference(process.env.HF_TOKEN)
        }
        const modelName = 'SamLowe/roberta-base-go_emotions'
        const inferenceRes = await hf.textClassification({
            model: modelName,
            inputs: input,
        })
        return inferenceRes
    }

    static async filterResponses(emotions: TextClassificationOutput) {
        const filtered = []
        const emotion0 = emotions.shift()
        filtered.push(emotion0)
        let score = emotion0?.score
        while (emotions.length > 0) {
            const emotionI = emotions.shift()
            if (emotionI?.score! > score! * 0.5) {
                filtered.push(emotionI)
                score = emotionI?.score
            } else {
                break
            }
        }
        return filtered
    }
}
