import { Provider } from "react-redux";
import PageNavigator from "./PageNavigator";
import PageHeader from "./common/PageHeader";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PageHeader />
        <PageNavigator />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
