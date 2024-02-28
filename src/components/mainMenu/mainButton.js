import styles from './styles.module.css';

function MainButton({text}) {
  return (
    <div className='max-w-min mx-auto'>
        <button
        className={`${styles.mainButton} text-3xl font-bold`}
        >
        {text}
        </button>
    </div>
  )
}

export default MainButton
