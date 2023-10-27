import {IProduct} from "../models";
import DbFetcher from "../services/fetcher";
import {ProductInstance} from "../services/db";
import {renderProduct} from "../components/search/product";
import express from "express";
import path from "path";

const router = express.Router();


router.use(express.json());
router.use(express.urlencoded({extended: true})); // to parse x-www-form-urlencoded

router.post('/search', async function (req, res) {
  let searchTerm = req.body.searchTerm;
  let sortOption = req.body.sortOption;
  console.log(`request body: ${JSON.stringify(req.body, null, 2)}`);
  const products: IProduct[] = (await DbFetcher.getProducts(ProductInstance, {
    ItemNumber: {$regex: new RegExp(searchTerm, 'i')}
  }))
  const sortProducts = (): IProduct[] => {
    if (sortOption === "1") {
      return products.sort((a, b) => a.Price - b.Price);
    } else if (sortOption === "-1") {
      return products.sort((a, b) => b.Price - a.Price);
    } else {
      return products;
    }
  }
  console.log(sortOption)
  let results = sortProducts().map(product => renderProduct(product)).join('');
  if (results === '') {
    results = 'Nichts gefunden'
  }

  res.render('index.hbs', {results});
});

router.get('/addItem', async function (req, res) {
  const itemNumber = req.query.productNumber;
  console.log(itemNumber)
  // Axios request https://my.exxas.net/cloud/9AAF40D5CBE371FEBABF6B4245C314BB/api//dokumente/${referer}/positions/addArticle
});

router.post('/', function (req, res) {
  // TODO add User Interface (handlebars, like Huawei Fusion Plugin)
  console.log(`request body: ${JSON.stringify(req.body, null, 2)}`);
  console.log(`request headers: ${JSON.stringify(req.headers, null, 2)}`)
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(`request origin: ${fullUrl}`)
  res.render(path.join('index.hbs'), {
    title: 'Thing'
  });
});

export default router;