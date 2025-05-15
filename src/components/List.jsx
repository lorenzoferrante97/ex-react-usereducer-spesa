import { useGlobalContext } from '../context/GlobalContext';

export default function List({ products, type }) {
  const { addToCart } = useGlobalContext();

  return (
    <>
      <ul>
        {products.length != 0 ? (
          products.map((prod, i) => {
            const { name, price } = prod;

            return (
              <li key={i} className="list-items">
                <p>
                  Nome: <span>{name}</span>
                </p>
                <p>
                  Prezzo: <span>{price.toFixed(2)}€</span>
                </p>
                {type == 'cart' && (
                  <p>
                    Quantità: <span>{prod.quantity}</span>
                  </p>
                )}
                {type == 'products' && (
                  <div>
                    <button onClick={() => addToCart(prod)} className="btn btn-primary">
                      Aggiungi al Carrello
                    </button>
                  </div>
                )}
              </li>
            );
          })
        ) : (
          <p>Non sono presenti prodotti nella lista.</p>
        )}
      </ul>
    </>
  );
}
