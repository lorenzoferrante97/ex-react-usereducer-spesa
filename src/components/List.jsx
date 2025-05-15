import { useGlobalContext } from '../context/GlobalContext';
import { useEffect } from 'react';

export default function List({ products, type }) {
  const { updateProductQuantity, removeFromCart, addedproducts, getCartTotal, cartTotal, handleInput, isQuantityWrong, quantityInput } = useGlobalContext();

  useEffect(() => getCartTotal(addedproducts));

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
                {type == 'products' && (
                  <div>
                    <label htmlFor="quantity">Qt.</label>
                    <input defaultValue={1} onChange={(e) => handleInput(e)} type="number" name="quantity" id="quantity" min={1} />
                  </div>
                )}
                {type == 'cart' && (
                  <p>
                    Quantità: <span>{prod.quantity}</span>
                  </p>
                )}
                {type == 'products' && (
                  <div className="btn-box">
                    <button onClick={() => updateProductQuantity(prod, quantityInput)} className="btn btn-primary">
                      Aggiungi al Carrello
                    </button>
                    <button onClick={() => removeFromCart(prod)} className="btn btn-sec">
                      Rimuovi dal Carrello
                    </button>
                  </div>
                )}
              </li>
            );
          })
        ) : (
          <li>Non sono presenti prodotti nella lista.</li>
        )}
        {type == 'products' && isQuantityWrong && <p className="error-message">La quantità deve essere maggiore o uguale a 1</p>}
        {type == 'cart' && (
          <li className="total">
            Totale: <span>{cartTotal}</span>
          </li>
        )}
      </ul>
    </>
  );
}
