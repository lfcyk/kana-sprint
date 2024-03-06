import Footer from '@/components/footer'
import NavBar from '@/components/navbar/navbar'
import Image from 'next/image'
import styles from './styles.module.css';
import { FaGithubSquare, FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import Link from 'next/link';



function About() {
	return (
		<div className='bg-white flex flex-col h-screen '>
			<NavBar/>
			<div className='flex flex-col  grow justify-center'>
                <div className={`${styles.card} flex flex-row border-2 border-black w-2/3 mx-auto`}>
                    <Image
                        className='p-10'
                        src="/willa.jpg"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        style={{
                            objectFit: "cover",
                            borderRadius: "250px", 
                        }}
                
                    />
                    <div className='flex flex-col items-center grow justify-center'>
                        <div className=' text-3xl m-5'>*Shameless Plug*</div>
                        <p className=' text-md m-5 indent-4'>Hi there! I'm <span className='text-cyan-600 font-bold'>Willa</span>, a Software Engineer currently learning and building stuff in NextJS and Flutter. I couldn't decide whether to focus on web or mobile development, so I decided to learn both. <span className='text-orange-600 font-bold'>～Kana</span> <span className='text-green-600 font-bold'>Sprint～</span> is the first full stack app that I actually finished (I get bored way too easily it's actually concerning lol). I hope <span className='text-orange-600 font-bold'>～Kana</span> <span className='text-green-600 font-bold'>Sprint～</span> helps you memorize Hiragana and Katakana characters, making your Japanese learning journey a bit easier. Enjoy!</p>
                        <div className='flex flex-col items-center gap-3'>
                            <div>find me at:</div>
                            <div className='flex flex-row gap-3 text-3xl'>
                                <Link href="https://github.com/lfcyk" className={`bg-orange-400 ${styles.gh} text-white`}>
                                    <FaGithubSquare/>
                                </Link>
                                <Link href="https://www.linkedin.com/in/willa-waliyadin-07b709118/" className={`bg-green-400 ${styles.linkedin} text-white shadow-green-400`}>
                                    <FaLinkedin/>
                                </Link>
                                <Link href="https://instagram.com/lfcyk" className={`bg-cyan-400 ${styles.ig} text-white`}>
                                    <FaInstagramSquare/>
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
			</div>
			<Footer/>
		</div>
	)
}

export default About
