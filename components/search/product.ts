import {IProduct, Product} from "../../models";

export function renderProduct(product: IProduct): string {
  const deliveryBadge: string = product.DeliveryStatus === '0' ? 'badge-danger' : 'badge-success';
  const deliveryStatus: string = product.DeliveryStatus === '0' ? 'nicht' : '';

  return `
      <div class="card m-2 product" style="width: 375px; height: 170px; overflow: hidden;">
          <div class="row no-gutters">
              <div class="col-md-8">
                  <div class="card-body">
                      <h5 class="card-title">${product.ItemNumber}</h5>
                      <p class="card-text"><small class="text-muted">${product.SupplierName || 'Unbekannter Lieferant'}</small></p>
                  </div>
              </div>
              <div class="col-md-4 align-self-center text-center" style="position: relative;">
                  <span class="badge ${deliveryBadge}" style="position: absolute; right: 15px; bottom: 15px">Ist ${deliveryStatus} geliefert</span>
              </div>
          </div>
          <div class="card-footer">
              <div class="row">
                  <div class="col">
                      <strong>Preis:</strong> </br> ${product.Price}.-
                  </div>
                  <div class="col">
                      <strong>Rabattpreis:</strong> </br> ${product.Price - (product.Price * (product.Discount / 100))}.-
                  </div>
              </div>
          </div>
      </div>
  `;
}
