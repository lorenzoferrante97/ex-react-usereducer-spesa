// start code

import { useGlobalContext } from './context/GlobalContext';
import List from './components/List';

function App() {
  const { products, addedproducts } = useGlobalContext();

  console.log('addedproducts: ', addedproducts);

  return (
    <>
      <div>
        <h1>Lista Prodotti</h1>
        <List products={products} />
      </div>
    </>
  );
}

export default App;
