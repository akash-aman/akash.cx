import { BuyMeCoffee, GitHub, Gmail, LinkedIn, Twitter, Youtube } from '@/assets/icons/social'
import Link from 'next/link'

const Footer = () => {
	return (
		<div className='w-full grid justify-items-center border-t mt-6 border-(--dark-theme-300)'>
			<div className="flex flex-wrap justify-center items-center gap-6 mt-8">
				<Link href="/about" className="flex items-center gap-2 px-4 py-2 rounded-lg border text-gray-200 text-sm font-medium hover:border-gray-500 transition-all">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
						<circle cx="12" cy="7" r="4" />
					</svg>
					About Me
				</Link>

				<div className="h-6 w-px bg-gray-700 hidden sm:block"></div>

				<div className="flex items-center gap-5">
					<Link href="mailto:sir.akashaman@gmail.com" className="text-gray-400 hover:text-white transition-colors">
						<Gmail className="w-5 h-5 md:w-6 md:h-6" />
					</Link>
					<Link href="https://github.com/akash-aman/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
						<GitHub className="w-5 h-5 md:w-6 md:h-6" />
					</Link>
					<Link href="https://www.linkedin.com/in/aman-akash/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
						<LinkedIn className="w-5 h-5 md:w-6 md:h-6" />
					</Link>
					<Link href="https://twitter.com/sirakashaman" target="_blank" className="text-gray-400 hover:text-white transition-colors">
						<Twitter className="w-5 h-5 md:w-6 md:h-6" />
					</Link>
					<Link href="https://www.youtube.com/@xcode-io" target="_blank" className="text-gray-400 hover:text-white transition-colors">
						<Youtube className="w-5 h-5 md:w-6 md:h-6" />
					</Link>
					<Link href="https://buymeacoffee.com/akashaman" target="_blank" className="text-gray-400 hover:text-white transition-colors">
						<BuyMeCoffee className="w-5 h-5 md:w-6 md:h-6" />
					</Link>
				</div>
			</div>
			<div className="mt-8">
				<p className="text-gray-400 text-sm">© 2026 Akash Aman | All rights reserved</p>
			</div>

		</div>
	)
}

export default Footer