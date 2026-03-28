import { useEffect } from 'react';
import { useFormat } from '../hooks/useFormat';
import Hero from '../components/Home/Hero';
import FormatSwitcher from '../components/Home/FormatSwitcher';
import FeaturedStats from '../components/Home/FeaturedStats';
import TopPlayers from '../components/Home/TopPlayers';

const HomePage = () => {
  const { setFormat } = useFormat();

  // Reset format to test when on home page
  useEffect(() => {
    setFormat('test');
  }, [setFormat]);

  return (
    <>
      <Hero />
      <FormatSwitcher />
      <FeaturedStats />
      <TopPlayers />
    </>
  );
};

export default HomePage;
