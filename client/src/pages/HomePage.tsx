import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StockCard from '../components/StockCard';
import { GET_STOCKS } from '../graphql';
import { useQuery } from '@apollo/client';
import financialDataSVG from '../assets/svgs/financial_data.svg';
import programmingSVG from '../assets/svgs/programming.svg';

const HomePage = () => {
    const { data } = useQuery(GET_STOCKS, { variables: { limit: 3, random: true } });

    useEffect(() => {
        document.title = 'Home | Stocks.io';
    }, []);

    return (
        <div className='dark:bg-darkBg flex flex-col min-h-screen items-center justify-center overflow-hidden'>
            <div className='flex justify-center min-h-screen items-center overflow-hidden p-10'>
                <section className='text-gray-600 body-font'>
                    <div className='container mx-auto flex md:px-16 py-24 lg:flex-row flex-col items-center'>
                        <div className='lg:flex-grow lg:w-1/2 pr-0 lg:pr-24 flex flex-col lg:items-start lg:text-left mb-16 lg:mb-0 items-center text-center'>
                            <h1 className='title-font sm:text-5xl text-3xl mb-4 font-medium text-gray-900 dark:text-white'>Stocks.io</h1>
                            <p className='title-font sm:text-2xl text-xl mb-4 text-gray-700 dark:text-gray-300 whitespace-nowrap'>
                                A dummy stock trading platform
                            </p>
                            <p className='mb-8 sm:text-sm lg:text-lg leading-relaxed dark:text-gray-300'>
                                Built as a portfolio project. Not meant to be a real application. <br />
                                Stock price fluctuations are randomly generated but real data is fetched peridoically.
                                <br />
                                <br />
                                <span className='font-bold'>No real money is involved.</span>
                            </p>
                            <div className='flex justify-center flex-nowrap'>
                                <Link
                                    to='/market'
                                    className='max-h-16 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded whitespace-nowrap'>
                                    Browse Market
                                </Link>
                                <Link
                                    to='/auth'
                                    className='ml-4 max-h-16 text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded whitespace-nowrap'>
                                    Get Started
                                </Link>
                            </div>
                        </div>
                        <div className='xl:max-w-2xl xl:w-full lg:w-2/3 sm:w-4/6 w-full'>
                            <img className='object-cover object-center rounded' alt='hero' src={financialDataSVG} />
                        </div>
                    </div>
                </section>
            </div>
            <section className='text-gray-600 body-font w-full flex flex-col justify-center'>
                <h1 className='title-font text-center sm:text-2xl text-xl font-medium text-gray-900 dark:text-white'>Today's Featured Picks</h1>
                <div className='dark:bg-darkBg flex md:justify-center my-7 px-2 pb-4 overflow-x-scroll sm:overflow-hidden w-screen'>
                    {data?.searchStocks.map((stock: any) => {
                        return <StockCard key={stock.ticker} stock={stock} />;

                        //return <div key={stock.ticker}>{JSON.stringify(stock)}</div>;
                    })}
                </div>
            </section>
            <section className='text-gray-600 body-font p-10'>
                <div className='container mx-auto flex md:px-16 pb-24 lg:flex-row flex-col items-center'>
                    <div className='lg:flex-grow lg:w-1/2 pr-0 lg:pr-24 flex flex-col lg:items-start lg:text-left mb-16 lg:mb-0 items-center text-center'>
                        <h1 className='title-font sm:text-3xl text-3xl mb-4 font-medium text-gray-900 dark:text-white'>What is Stocks.io?</h1>

                        <p className='mb-8 text-md lg:text-lg leading-relaxed dark:text-gray-300'>
                            Stocks.io is a full-stack portfolio project. The technologies used were the MERN stack, along with TypeScript, TailwindCSS, SASS,
                            Redux, Socket.io, JWT, and Apollo GraphQL.
                        </p>
                        <div className='flex justify-center flex-nowrap'>
                            <a
                                href='https://github.com/roynulrohan/Stocks.io'
                                aria-label='GitHub'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='mr-4 flex items-center max-h-16 text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded whitespace-nowrap'>
                                <svg className='text-gray-800  h-6 w-6' viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z'></path>
                                </svg>
                                <span className='ml-2'>Project Repository</span>
                            </a>
                        </div>
                    </div>
                    <div className='xl:max-w-xl xl:w-full lg:w-2/3 sm:w-4/6 w-full p-12'>
                        <img className='object-cover object-center rounded' alt='hero' src={programmingSVG} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
