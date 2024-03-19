import styles from 'app/page.module.scss'
import TextArea from 'components/TextArea/TextArea'

export default async function Home() {
    return (
        <main className={styles.main}>
            <TextArea />
        </main>
    )
}
