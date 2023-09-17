import './style.scss'
import { Provider } from 'react-redux';
import { store} from './redux/store';
import Main from './components/Main/Main';
import CreateTripModal from './components/CreateTripModal/CreateTripModal';


const App = () => {

  return (
    <Provider store={store}>
      <Main/>
      <CreateTripModal/>
    </Provider>
  );
};

export default App