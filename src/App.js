import './App.css';
import Routing from './Routing';
import './assets/css/Style.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
function App() {
  return (
    <SkeletonTheme baseColor="#C0D9FF" highlightColor="#fff">
      <Routing />
    </SkeletonTheme>
  );
}

export default App;
