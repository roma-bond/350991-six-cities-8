import Main from '../main/main';

type AppProps = {
  offersAmount: number,
}

function App({offersAmount}: AppProps): JSX.Element {
  return <Main offersAmount={offersAmount} />;
}

export default App;
