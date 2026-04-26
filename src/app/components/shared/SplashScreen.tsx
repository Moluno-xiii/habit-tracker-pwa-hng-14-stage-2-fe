const SplashScreen: React.FC = () => {
  return (
    <div
      data-testid="splash-screen"
      className="flex flex-1 flex-col items-center justify-center text-5xl"
    >
      <p className="font-mono text-4xl">Habit Tracker</p>
    </div>
  );
};

export default SplashScreen;
