import Link from 'next/link'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

export const Footer= ()=> {
  return (
    <>
      <footer className="bg-gray-800">
        <div className="py-6 px-4 bg-gray-700 ">
          <div className='cursor-pointer flex justify-center '>
            <div className='m-3'>
              <Link href='https://www.linkedin.com/in/jorge-ochipinti-3232971a6/'>
                <LinkedInIcon />
              </Link>
            </div>
            <div className='m-3'>
              <Link href='https://github.com/jorgeochipinti97/lottery'>
                <GitHubIcon />
              </Link>
            </div>
            <div className='m-3'>
              <Link href='https://www.instagram.com/jorgeochipinti_/'>
                <InstagramIcon />
              </Link>
            </div>
          </div>
          <span className="text-sm text-gray-300 sm:text-center">© 2022 <span>Lazaro</span>. All Rights Reserved.</span>
        </div>
      </footer>
    </>
  )
}