(function () {
'use strict';

/**
* @author: Alasdair Hazen
* Module 2
*
*/


var toBuyList = [
	{ name: "beer", quantity: 2},
	{ name: "bread", quantity: 2},
	{ name: "cheese", quantity: 4 },
	{ name: "bangers", quantity: 6 },
	{ name: "mash", quantity: 2 }
];

var boughtList = [];


angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyCtrl = this;
  toBuyCtrl.items = ShoppingListCheckOffService.getItemsToBuy();
  toBuyCtrl.bought = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtCtrl = this;
  boughtCtrl.items = ShoppingListCheckOffService.getBougthItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items to buy
  var itemsToBuy = toBuyList;
  // List of shopping items bought
  var boughtItems = boughtList;

  //Move item to bougth list
  service.buyItem = function (itemIndex) {
	var item =  itemsToBuy[itemIndex];
	service.addBoughtItem(item);
    removeFromItemsToBuy(itemIndex);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getBougthItems = function () {
    return boughtItems;
  };

  service.addBoughtItem = function (item) {
    boughtItems.push(item);
  };

  //private functions
  function removeFromItemsToBuy(itemIndex) {
	  itemsToBuy.splice(itemIndex, 1);
  };
}

})();
