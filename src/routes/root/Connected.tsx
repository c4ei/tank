import React from 'react';
import Button from '@/ui/Button';
import {generatePath, useNavigate} from 'react-router-dom';
import {useNetwork} from '@/store/store';
import TankModel from '@/ui/TankModel';
import {Canvas} from '@react-three/fiber';

export default function Connected() {
	const navigate = useNavigate();
	const {code, peers, maxNbPlayers} = useNetwork();

	const handleCopy = () => {
		if (code) {
			const url = window.location.origin + generatePath('/join/:code', {code});
			void navigator.clipboard.writeText(url);
		}
	};

	return (
		<div className='space-y-4 p-6 sm:p-8 md:space-y-4'>
			<h2 className='m-0 flex justify-center'>
				<button
					onClick={handleCopy}
					className='group flex items-center text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'
				>
					{code}
					<span className='mx-1 text-gray-500 transition-transform duration-100 group-hover:text-gray-700 group-active:scale-90 dark:text-gray-400 dark:group-hover:text-gray-300'>
						<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'><path fill='currentColor' d='M14 22H4a1.934 1.934 0 0 1-2-2V10a1.934 1.934 0 0 1 2-2h4V4a1.934 1.934 0 0 1 2-2h10a1.934 1.934 0 0 1 2 2v10a1.935 1.935 0 0 1-2 2h-4v4a1.935 1.935 0 0 1-2 2ZM4 10v10h10v-4h-4a1.935 1.935 0 0 1-2-2v-4H4Zm6-6v10h10V4H10Z'></path></svg>
					</span>
				</button>
			</h2>
			<p className='text-md flex items-center justify-center space-x-1 font-bold text-gray-900 dark:text-white'>
				<span className='flex items-center text-xl'>
					<svg className='h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='currentColor' d='M130.613 43.002v66.926c-22.925 19.7-38.03 48.177-40.533 80.252h234.51c-2.666-34.175-19.637-64.265-45.133-84.006H149.303V43.002h-18.69zM472.62 58.738l-41.53 11.127l16.504 61.588l41.525-11.127l-16.5-61.588zm-54.042 36.627l-98.787 26.47a136.585 136.585 0 0 1 13.647 25.15l92.342-24.745l-7.202-26.875zM121.53 206.342l-78.364 37.045l.002 50.3l18.207-7.556H442.11l19.316 6.413c0-51.397-119.076-83.53-183.166-86.2H121.53zm-38.17 97.88v.038c-35.936.645-65.065 30.15-65.065 66.232c0 36.484 29.777 66.26 66.262 66.26c1.286 0 2.563-.046 3.832-.12h106.473c1.27.074 2.545.12 3.832.12s2.563-.046 3.832-.12h107.34c1.27.074 2.545.12 3.832.12c1.286 0 2.562-.046 3.83-.12H423.7c1.268.074 2.544.12 3.83.12c36.486 0 66.263-29.776 66.263-66.26c0-36.485-29.777-66.262-66.262-66.262c-.276 0-.55.02-.827.022v-.03H83.36zm47.2 18.686h22.13a66.882 66.882 0 0 0-11.063 14.014a66.74 66.74 0 0 0-11.066-14.014zm114.14 0h22.995a66.814 66.814 0 0 0-11.498 14.766a66.814 66.814 0 0 0-11.498-14.766zm115.003 0h21.824a66.929 66.929 0 0 0-10.912 13.748a66.861 66.861 0 0 0-10.912-13.748zm-275.146.012a47.43 47.43 0 0 1 47.572 47.572a47.41 47.41 0 0 1-44.333 47.45H83.36v.09a47.414 47.414 0 0 1-46.378-47.54a47.434 47.434 0 0 1 47.575-47.572zm114.138 0a47.43 47.43 0 0 1 47.573 47.572a47.409 47.409 0 0 1-44.332 47.45h-6.48a47.41 47.41 0 0 1-44.335-47.45a47.434 47.434 0 0 1 47.575-47.572zm115.004 0a47.428 47.428 0 0 1 47.57 47.533v.078a47.41 47.41 0 0 1-44.33 47.413h-6.48a47.411 47.411 0 0 1-44.335-47.45a47.434 47.434 0 0 1 47.574-47.573zm113.83 0a47.431 47.431 0 0 1 47.575 47.572a47.432 47.432 0 0 1-47.574 47.572c-.277 0-.55-.016-.827-.02v-.1h-2.412a47.41 47.41 0 0 1-44.33-47.413v-.078a47.43 47.43 0 0 1 47.57-47.532zm-171.333 80.39a66.812 66.812 0 0 0 11.362 14.633h-22.724a66.737 66.737 0 0 0 11.36-14.632zm-114.572.75a66.858 66.858 0 0 0 10.93 13.883h-21.858a66.802 66.802 0 0 0 10.928-13.882zm228.99.266a66.819 66.819 0 0 0 10.776 13.617h-21.55a66.787 66.787 0 0 0 10.775-13.617z'/></svg>
					{peers.length}
				</span>
				<span className='text-gray-500 dark:text-gray-400'>/</span>
				<span className='text-xl'>
					{maxNbPlayers}
				</span>
			</p>
			<div className='grid grid-cols-3 gap-3'>
				{peers.map(peer => (
					<div
						className='flex flex-col items-center space-y-2 rounded-lg bg-gray-100 py-4 dark:bg-gray-700'
						key={peer.uuid}
					>
						<h2 className='w-full truncate px-4 text-center text-lg font-bold text-gray-900 dark:text-white'>
							{peer.metadata.name}
						</h2>
						<div>
							<Canvas camera={{fov: 35, zoom: 1.5}}>
								<TankModel type={peer.metadata.tank}/>
							</Canvas>
						</div>
					</div>
				))}
			</div>
			<Button
				onClick={() => {
					navigate('/game');
				}}
				fullWidth
				size='large'
			>
				Play
			</Button>
		</div>
	);
}
