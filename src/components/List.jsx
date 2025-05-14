import { useGlobalContext } from '../context/GlobalContext';

export default function List({ products }) {
  const { addToCart } = useGlobalContext();

  return (
    <>
      <ul>
        {products.map((prod, i) => {
          const { name, price } = prod;

          return (
            <li key={i} className="list-items">
              <p>
                Nome: <span>{name}</span>
              </p>
              <p>
                Prezzo: <span>{price.toFixed(2)}€</span>
              </p>
              <div>
                <button onClick={() => addToCart(prod)} className="btn btn-primary">
                  Aggiungi al Carrello
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
