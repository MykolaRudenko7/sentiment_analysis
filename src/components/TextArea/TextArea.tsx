'use client'

import { ChangeEvent, useState, useId, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApiService from 'services/apiService'
import { emotionConfig } from 'helpers/config'
import styles from 'components/TextArea/TextArea.module.scss'

export default function TextArea() {
    const [inputText, setInputText] = useState('')
    const [outputText, setOutputText] = useState<{ label: string; scope: number }[]>([])
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [emotionColor, setEmotionColor] = useState('')
    const [showClearButton, setShowClearButton] = useState(false)
    const textareaId = useId()

    const runPredictions = useCallback(async (text: string) => {
        try {
            if (text) {
                const res = await ApiService.fetchSmile(text)
                setOutputText(res)
                setErrorMessage(null)
            }
        } catch (error) {
            setErrorMessage('An error occurred while fetching smile.')
        }
    }, [])

    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>): void => {
            const { value } = e.target
            setInputText(value)
            setShowClearButton(value.length > 0)

            setTimeout(() => {
                runPredictions(value)
            }, 1000)
        },
        [runPredictions]
    )

    const clearInput = () => {
        setInputText('')
        setShowClearButton(false)
        setOutputText([])
        setErrorMessage(null)
    }

    useEffect(() => {
        if (outputText.length > 0) {
            const latestEmotion = outputText[outputText.length - 1].label
            setEmotionColor(emotionConfig[latestEmotion]?.colorHex || '')
        }
    }, [outputText])

    return (
        <motion.div layout transition={{ duration: 0.5 }} className={styles.wrapper}>
            <h1 className={styles.title}>Express your mood ✨</h1>
            <form className={styles.form}>
                <textarea
                    className={styles.textarea}
                    name="textarea"
                    id={textareaId}
                    onChange={handleInputChange}
                    required
                    maxLength={100}
                    rows={5}
                    value={inputText}
                />
                <label className={styles.label} htmlFor={textareaId}>
                    write what you feel..
                </label>{' '}
                {showClearButton && (
                    <button type="button" onClick={clearInput} className={styles.clearButton}>
                        Clear
                    </button>
                )}
            </form>
            <AnimatePresence>
                {outputText.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key="modal"
                        layout
                        transition={{ duration: 0.5 }}
                        className={styles.output}
                        style={{ backgroundColor: emotionColor }}
                    >
                        {outputText?.map(({ label }) => (
                            <p className={styles.outputText} key={label}>
                                {label} {emotionConfig[label].emoji}
                            </p>
                        ))}
                        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
