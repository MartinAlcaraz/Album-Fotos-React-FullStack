import gitHubImg from '../icons/GitHub.svg'
import linkedInImg from '../icons/LinkedIn.svg'

const Footer = () => {
    return (
        <footer className='flex flex-row justify-around bg-primary h-20 items-center m-2 border-primary sticky top-[100vh]'>
            <p className='font-semibold'>Desarrollado por A. Martin Alcaraz &copy; </p>
            <a href='https://github.com/MartinAlcaraz'><img className='h-8' src={gitHubImg} alt='GitHub' title='GitHub' /></a>
            <a href='https://www.linkedin.com/in/angel-martin-alcaraz/'><img className='h-8' src={linkedInImg} alt='LinkedIn' title='LinkedIn' /></a>
        </footer>
    )
}

export default Footer;