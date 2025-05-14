export default function List({ products }) {
  return (
    <>
      <ul>
        {products.map((prod, i) => {
          const { name, price } = prod;

          return (
            <li className="list-items">
              <p>
                Nome: <span>{name}</span>
              </p>
              <p>
                Prezzo: <span>{price.toFixed(2)}€</span>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
