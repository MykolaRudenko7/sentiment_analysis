import ApiHelpers from 'helpers/apiHelpers'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { inputText } = body

        const inferenceResponse = await ApiHelpers.runInference(inputText)
        const filteredResponse = await ApiHelpers.filterResponses([...inferenceResponse])

        return new Response(
            JSON.stringify({
                inferenceResponse,
                filteredResponse,
            }),
            { status: 200 }
        )
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
        })
    }
}
