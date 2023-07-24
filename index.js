/**
The task is to implement the Shop protocol (you can do that in this file directly).
- No database or any other storage is required, just store data in memory
- No any smart search, use String method contains (case sensitive/insensitive - does not matter)
–   Performance optimizations are optional
*/
var ShopImpl = (function () {
  function ShopImpl() {}

  //ShopImpl.prototype.products = [];
  const products = [];

  /**
    Adds a new product object to the Shop.
    - Parameter product: product to add to the Shop
    - Returns: false if the product with same id already exists in the Shop, true – otherwise.
   */
  ShopImpl.prototype.addNewProduct = function (product) {
    // TODO: your implementation goes here
    for (let i = 0; i < products.length; i += 1) {
      if (products[i].id === product.id) return false;
    }
    
    products.push(product);
    
    return true;
  };

  /**
    Deletes the product with the specified id from the Shop.
    - Returns: true if the product with same id existed in the Shop, false – otherwise.
   */
  ShopImpl.prototype.deleteProduct = function (id) {
    // TODO: your implementation goes here
    for (let i = 0; i < products.length; i += 1) {
      if (products[i].id === id) {
        products.splice(i, 1);
        
        return true;
      }
    }
    
    return false;
  };

  /**
    - Returns: 10 product names containing the specified string. If there are several products with the same name, producer's name is appended to product's name.
   */
  ShopImpl.prototype.listProductsByName = function (searchString) {
    // TODO: your implementation goes here
    const getFoundProductNames = (foundProducts) => {
      const foundProductNames = [];
      
      const sotredFoundProducts = foundProducts.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;

        return 0;
      });
      
      for (let i = 0; i < sotredFoundProducts.length; i += 1) {
        if (sotredFoundProducts[i].name === sotredFoundProducts[i + 1]?.name ||
            sotredFoundProducts[i].name === sotredFoundProducts[i - 1]?.name) 
        {
          foundProductNames.push(`${sotredFoundProducts[i].producer} - ${sotredFoundProducts[i].name}`);
        } else {
          foundProductNames.push(sotredFoundProducts[i].name);
        }
      }

      return foundProductNames;
    }
    
    const foundProducts = [];
    
    for (let i = 0; i < products.length; i += 1) {
      if (foundProducts.length === 10) return getFoundProductNames(foundProducts);
      
      const currentProduct = products[i];
      
      if (currentProduct.name.includes(searchString)) {
        foundProducts.push(currentProduct);
      }
    }

    return getFoundProductNames(foundProducts);
  };

  /**
    - Returns: 10 product names whose producer contains the specified string, ordered by producers.
   */
  ShopImpl.prototype.listProductsByProducer = function (searchString) {
    // TODO: your implementation goes here
    const sortFoundProductsByProducer = (foundProducts) => {
      const foundProductNames = [];
      
      const sortedFoundProducts = foundProducts.sort((a, b) => {
        if (a.producer > b.producer) return 1;
        if (a.producer < b.producer) return -1;

        return 0;
      });
      
      for (let i = 0; i < sortedFoundProducts.length; i += 1) {
        foundProductNames.push(sortedFoundProducts[i].name);
      }
      
      return foundProductNames;
    }
    
    const foundProducts = [];
    
    for (let i = 0; i < products.length; i += 1) {
      if (foundProducts.length === 10) return sortFoundProductsByProducer(foundProducts);
      
      if (products[i].producer.includes(searchString)) {
        foundProducts.push(products[i]);
      }
    }
    
    return sortFoundProductsByProducer(foundProducts);
  };

  return ShopImpl;
}());

function test(shop) {
    assert(!shop.deleteProduct("1"));
    assert(shop.addNewProduct({ id: "1", name: "1", producer: "Lex" }));
    assert(!shop.addNewProduct({ id: "1", name: "any name because we check id only", producer: "any producer" }));
    assert(shop.deleteProduct("1"));
    assert(shop.addNewProduct({ id: "3", name: "Some Product3", producer: "Some Producer2" }));
    assert(shop.addNewProduct({ id: "4", name: "Some Product1", producer: "Some Producer3" }));
    assert(shop.addNewProduct({ id: "2", name: "Some Product2", producer: "Some Producer2" }));
    assert(shop.addNewProduct({ id: "1", name: "Some Product1", producer: "Some Producer1" }));
    assert(shop.addNewProduct({ id: "5", name: "Other Product5", producer: "Other Producer4" }));
    assert(shop.addNewProduct({ id: "6", name: "Other Product6", producer: "Other Producer4" }));
    assert(shop.addNewProduct({ id: "7", name: "Other Product7", producer: "Other Producer4" }));
    assert(shop.addNewProduct({ id: "8", name: "Other Product8", producer: "Other Producer4" }));
    assert(shop.addNewProduct({ id: "9", name: "Other Product9", producer: "Other Producer4" }));
    assert(shop.addNewProduct({ id: "10", name: "Other Product10", producer: "Other Producer4" }));
    assert(shop.addNewProduct({ id: "11", name: "Other Product11", producer: "Other Producer4" }));
    var byNames = shop.listProductsByName("Product");
    assert(byNames.length == 10);
    byNames = shop.listProductsByName("Some Product");
    assert(byNames.length == 4);
    assert(byNames.indexOf("Some Producer3 - Some Product1") >= 0);
    assert(byNames.indexOf("Some Product2") >= 0);
    assert(byNames.indexOf("Some Product3") >= 0);
    assert(byNames.indexOf("Some Product1") < 0);
    assert(byNames.indexOf("Some Producer1 - Some Product1") >= 0);
    var byProducer = shop.listProductsByProducer("Producer");
    assert(byProducer.length == 10);
    byProducer = shop.listProductsByProducer("Some Producer");
    assert(byProducer.length == 4);
    assert(byProducer[0] == "Some Product1");
    assert(byProducer[1] == "Some Product2" || byProducer[1] == "Some Product3");
    assert(byProducer[2] == "Some Product2" || byProducer[2] == "Some Product3");
    assert(byProducer[3] == "Some Product1");
}

function assert(condition) {
  if (!condition) {
    throw new Error("Assertion failed");
  }
}

test(new ShopImpl());
