import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Network from '@game/network/Network';
import IdInput from '@/ui/IdInput';
import clsx from 'clsx';
import {AnimatePresence, motion} from 'framer-motion';
import Logo from '@/ui/logo';
import Confetti from 'react-confetti';

function useToggleTimeout(initial: boolean, timeout: number) {
	const [value, setValue] = useState(initial);
	const timeoutRef = React.useRef<number>();
	const toggle = React.useCallback(() => {
		setValue(true);
		clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setValue(false);
		}, timeout);
	}, [timeout]);
	return [value, toggle] as const;
}

export default function Root() {
	const [gameId, setGameId] = useState('');
	const [connected, toggleConnected] = useToggleTimeout(false, 2000);
	const navigate = useNavigate();

	const createGame = () => {
		const id = Network.generateRoomId({length: 6, prefix: 'TOONKS'});
		Network.getInstance().createRoom(id)
			.then(id => {
				toggleConnected();
				console.log('createGame', id);
			})
			.catch(error => {
				console.error('Error creating room', error);
			});
	};

	const connectToGame = () => {
		if (!gameId) {
			return;
		}

		const id = Network.generateRoomId({length: 6, prefix: 'TOONKS', value: gameId});
		console.log('try to connect to game', id);
		Network.getInstance().joinRoom(id)
			.then(() => {
				toggleConnected();
				console.log('connectToGame', id);
			})
			.catch(error => {
				console.log('Error joining room', error);
			});
	};

	const tabs = [
		{
			label: 'Host Game',
			content: (
				<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
					<h2 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center'>
						Ready to host a game?
					</h2>
					<button
						className='w-full bottom-0 mt-auto text-white bg-toonks-orange hover:bg-toonks-orangeLight focus:ring-4 focus:ring-toonks-orangeLight font-bold uppercase rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 hover:scale-105 transition duration-100 ease-in-out'
						onClick={createGame}
					>
							Create
					</button>
				</div>
			),
		},
		{
			label: 'Join Game',
			content: (
				<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
					<h2 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center'>
						Enter Game ID
					</h2>
					<IdInput onChange={setGameId} className='mb-5' />
					<button
						className='w-full bottom-0 mt-auto text-white bg-toonks-orange hover:bg-toonks-orangeLight focus:ring-4 focus:ring-toonks-orangeLight font-bold uppercase rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 hover:scale-105 transition duration-100 ease-in-out'
						onClick={connectToGame}
					>
							Join
					</button>
				</div>
			),
		},
	];
	const [selectedTab, setSelectedTab] = useState(tabs[0]);

	return (
		<>
			<Confetti numberOfPieces={connected ? 200 : 0}/>
			<section className='bg-gray-50 dark:bg-gray-900 h-screen'>
				<div className='flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
					<div className='my-6'>
						<Logo />
					</div>
					<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
						<nav className='p-2'>
							<ul className='flex flex-row border-b-4 border-gray-200 dark:border-gray-700'>
								{tabs.map(item => {
									const isSelected = selectedTab.label === item.label;
									return (
										<li
											key={item.label}
											className={clsx(isSelected && 'bg-gray-700', 'relative flex flex-col items-center justify-center flex-1 text-xl font-bold text-gray-900 md:text-2xl dark:text-white cursor-pointer py-4 rounded-t hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200')}
											onClick={() => {
												setSelectedTab(item);
											}}
										>
											{`${item.label}`}
											{isSelected && (
												<motion.div
													className='absolute h-1 bg-toonks-orange -bottom-1 left-0 right-0 rounded-full'
													layoutId='underline'/>
											)}
										</li>
									);
								})}
							</ul>
						</nav>
						<main>
							<AnimatePresence mode='wait'>
								<motion.div
									key={selectedTab.label ?? 'default'}
									initial={{opacity: 0, y: 10}}
									animate={{opacity: 1, y: 0}}
									exit={{opacity: 0, y: 10}}
									transition={{duration: 0.2}}
								>
									{selectedTab ? selectedTab.content : '😋'}
								</motion.div>
							</AnimatePresence>
						</main>
					</div>
				</div>
			</section>
		</>
	);
}
