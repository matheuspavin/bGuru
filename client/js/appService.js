angular.module("app").factory("appAPI", function ($http) {

	var getOrders = function () {
		return $http.get("http://localhost:3500/orders");
    };
    
    var deleteOrder = function (order) {
		return $http.delete("http://localhost:3500/orders/"+order.orderId);
    };
    
    var addOrder = function (order) {
        return $http.post("http://localhost:3500/orders", order);
    };

    var getCompanies = function () {
		return $http.get("http://localhost:3500/companies");
    };

	return {
        getOrders: getOrders,
        deleteOrder: deleteOrder,
        addOrder: addOrder,
        getCompanies: getCompanies
    };

});