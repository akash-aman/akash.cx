import { BuyMeCoffee, GitHub, Gmail, LinkedIn, Twitter, Youtube } from '@/assets/icons/social'
import Link from 'next/link'

const Footer = ({ nav = "about" }: { nav?: "about" | "home" }) => {
	return (
		<footer className='w-full grid justify-items-center border-t mt-6 pb-15 md:pb-0 border-(--dark-theme-300)'>
			<nav aria-label="Footer Navigation" className="flex flex-wrap justify-center items-center gap-6 mt-8">
				{
					nav === "about" && <Link href="/about" className="flex items-center gap-2 px-4 py-2 rounded-lg border text-gray-200 text-sm font-medium hover:border-gray-500 transition-all">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
							<circle cx="12" cy="7" r="4" />
						</svg>
						About Me
					</Link>
				}
				{nav === "home" && <span className='hover:border-gray-500 items-center border flex rounded-lg '>

					<Link href="/courses" className="flex items-center gap-2 px-4 py-2 rounded-lg  text-gray-200 text-sm font-medium  transition-all">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
							<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
						</svg>
						Courses
					</Link>

					<div role="separator" aria-hidden="true" className="h-6 w-px inline bg-gray-700"></div>

					<Link href="/blogs" className="flex items-center gap-2 px-4 py-2 rounded-lg  text-gray-200 text-sm font-medium transition-all">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
							<polyline points="14 2 14 8 20 8"></polyline>
							<line x1="16" y1="13" x2="8" y2="13"></line>
							<line x1="16" y1="17" x2="8" y2="17"></line>
							<polyline points="10 9 9 9 8 9"></polyline>
						</svg>
						Blogs
					</Link>

				</span>
				}

				<div role="separator" aria-hidden="true" className="h-6 w-px bg-gray-700 hidden sm:block"></div>

				<ul className="flex items-center gap-5 list-none">
					<li>
						<Link href="mailto:sir.akashaman@gmail.com" aria-label="Email">
							<Gmail className="w-5 h-5 md:w-6 md:h-6" />
						</Link>
					</li>
					<li>
						<Link href="https://github.com/akash-aman/" target="_blank" aria-label="GitHub">
							<GitHub className="w-5 h-5 md:w-6 md:h-6" />
						</Link>
					</li>
					<li>
						<Link href="https://www.linkedin.com/in/aman-akash/" target="_blank" aria-label="LinkedIn">
							<LinkedIn className="w-5 h-5 md:w-6 md:h-6" />
						</Link>
					</li>
					<li>
						<Link href="https://twitter.com/sirakashaman" target="_blank" aria-label="Twitter">
							<Twitter className="w-5 h-5 md:w-6 md:h-6" />
						</Link>
					</li>
					<li>
						<Link href="https://www.youtube.com/@xcode-io" target="_blank" aria-label="YouTube">
							<Youtube className="w-5 h-5 md:w-6 md:h-6" />
						</Link>
					</li>
					<li>
						<Link href="https://buymeacoffee.com/akashaman" target="_blank" aria-label="Buy Me A Coffee">
							<BuyMeCoffee className="w-5 h-5 md:w-6 md:h-6" />
						</Link>
					</li>
				</ul>
			</nav>
			<div className="mt-8">
				<p className="text-sm">
					<small className='para-sm'>© 2026 Akash Aman | All rights reserved</small>
				</p>
			</div>

		</footer>
	)
}

export default Footer