import styles from './styles.module.css';

function MainButton({text, bgColor}) {
  return (
    <div className='max-w-min mx-auto'>
        <button
        className={`${styles.mainButton} text-3xl font-bold ${bgColor}`}
        >
        {text}
        </button>
    </div>
  )
}

export default MainButton
