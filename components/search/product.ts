import {IProduct, Product} from "../../models";

export function renderProduct(product: IProduct): string {
  return `
    <div class="card mb-3 product">
        <div class="card-body">
            <h5 class="card-title product-title">${product.ItemNumber}</h5>
            <div class="prices">
                <p class="card-text">
                    <span class="original-price">Preis: ${product.Price}</span>
                    <br>
                    <span>Preis - Rabatt: $${product.Price - (product.Price * (product.Discount / 100))}</span>
                </p>
            </div>
        </div>
    </div>
  `;
}
