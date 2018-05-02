angular.module("app").controller("appController", ['$uibModal','$scope', '$http', 'appAPI', function ($uibModal, $scope, $http, appAPI) {
    $scope.orders = "";
    $scope.companies = "";
    $scope.showOrders = true;
    $scope.showCompanies = false;
   

    var loadOrders = function (){
        appAPI.getOrders().then(function(data, status) {
            $scope.orders = data.data;
        });			
    };

    var loadCompanies = function (){
        appAPI.getCompanies().then(function(data, status) {
            $scope.companies = data.data;
        });			
    };


    var initTable = function () {
        var addListeners = function() {
            addPaginationListeners();
            addSearchListeners();
            addSortListeners();
            addRowListeners();
            addColumnListeners();
            addSelectionListeners();
          };
         
          var addPaginationListeners = function() {
            $scope.$on('veasyTable:onStartPagination', function (event, data) {
            });
            $scope.$on('veasyTable:onEndPagination', function (event, data) {
            });
          };
      
          var addSearchListeners = function() {
            $scope.$on('veasyTable:onStartSearch', function (event, data) {
            });
            $scope.$on('veasyTable:onEndSearch', function (event, data) {
            });
          };
      
          var addSortListeners = function() {
            $scope.$on('veasyTable:onStartSort', function (event, data) {
            });
            $scope.$on('veasyTable:onEndSort', function (event, data) {
            });
          };
      
          var addRowListeners = function() {
            $scope.$on('veasyTable:onClickRow', function (event, data) {
            });
          };
      
          var addColumnListeners = function() {
            $scope.$on('veasyTable:onApplyColumnFilter', function (event, data) {
            });
          };
      
          var addSelectionListeners = function() {
            $scope.$on('veasyTable:selectedItems', function (event, data) {
            });
          };

          addListeners();
    };

    initTable();
    loadOrders();
    loadCompanies();

    $scope.deleteOrder = function (order) {
        appAPI.deleteOrder(order);
        loadOrders();
    };

    $scope.newOrder = function () {
        $scope.updateOrder();
    }

    $scope.updateOrder = function (order) {
       var modalInstance = $uibModal.open({
				templateUrl: "./template/updateOrderModal.html",
				controller: function ($scope, $log, $uibModalInstance, appAPI, order) {
                    $scope.order = order;

                    $scope.new = !order ? true : false;

                    $scope.close = function () {
                        $uibModalInstance.close();
                    };

                    $scope.update = function (newOrder) {
                        if($scope.new) {
                            appAPI.addOrder(newOrder).then( function () {
                                $uibModalInstance.close();
                            });
                        } else {
                            $uibModalInstance.close();
                        }
                    };

                },
				size: "md",
				resolve: {
					'order': function () {
						return order;
					}
				}
        });

        modalInstance.result.then(function () {
            loadOrders();
        });
    };

    $scope.configTableOrders = configTableOrders($scope);
    $scope.configTableCompanies = configTableCompanies($scope);

}]); 

var configTableOrders = function(scope) { return {
        columns: [
          { size: 5, header: 'Id', value: 'orderId', hideOn: 'xs'},
          { size: 10, header: 'Company Name', value: 'companyName' },
          { size: 10, header: 'Ordered Item', value: 'orderedItem', hideOn: 'xs' },
          { size: 10, header: 'Customer Address', value: 'customerAddress', hideOn: 'sm xs' },
          { size: 5, header: 'Price', value: 'price', hideOn: 'sm xs' },
          { size: 5, header: 'Currency', value: 'currency', hideOn: 'sm xs' }
        ],
        contextMenu: {
            enable: true,
            icon: 'fa fa-ellipsis-v',
            options: [
              { icon: 'fa fa-pencil-alt', label: 'Edit', action: function(row) {scope.updateCompany(row)} },
              { icon: 'fa fa-trash', label: 'Delete', action: function (row) {scope.deleteCompany(row)}}
            ]
          },
          toggleColumns: {
            enable: true,
            position: 'begin',
            icons: {
              opened: 'fa fa-chevron-down',
              closed: 'fa fa-chevron-right'
            }
          },
          clickRow: {
            enable: false
          },
          checkbox: {
            enable: false
          },
          sort: {
            enable: true
          },
          pagination: {
            enable: true,
            currentPage: 0,
            itemsPerPage: 10
          },
          filter: {
            enable: true,
            conditional: true,
            delay: 300
          },
          columnFilter: {
            enable: false,
            modalOptions: {
              size: 'md',
              autoOpen: true,
              keyboard: true,
              backdrop: true
            }
          },
          labels: {
            filter: {
              by: 'Filter by...',
              all: 'all',
              and: 'AND',
              or: 'OR'
            },
            pagination: {
              itemsPerPage: 'Itens per page',
              totalItems: 'Total itens'
            }
          }
    };
};

var configTableCompanies = function(scope) { 
    return {
        columns: [
        { size: 5, header: 'Id', value: 'companyId', hideOn: 'xs'},
        { size: 10, header: 'Company Name', value: 'companyName' },
        { size: 10, header: 'Company Address', value: 'companyAddress', hideOn: 'xs' },
        { size: 10, header: 'Company Register', value: 'companyRegister', hideOn: 'sm xs' },
        { size: 5, header: 'Company Country', value: 'companyCountry', hideOn: 'sm xs' }
        ],
        contextMenu: {
            enable: true,
            icon: 'fa fa-ellipsis-v',
            options: [
            { icon: 'fa fa-pencil-alt', label: 'Edit', action: function(row) {scope.updateOrder(row)} },
            { icon: 'fa fa-trash', label: 'Delete', action: function (row) {scope.deleteOrder(row)}}
            ]
        },
        toggleColumns: {
            enable: true,
            position: 'begin',
            icons: {
            opened: 'fa fa-chevron-down',
            closed: 'fa fa-chevron-right'
            }
        },
        clickRow: {
            enable: false
        },
        checkbox: {
            enable: false
        },
        sort: {
            enable: true
        },
        pagination: {
            enable: true,
            currentPage: 0,
            itemsPerPage: 10
        },
        filter: {
            enable: true,
            conditional: true,
            delay: 300
        },
        columnFilter: {
            enable: false,
            modalOptions: {
            size: 'md',
            autoOpen: true,
            keyboard: true,
            backdrop: true
            }
        },
        labels: {
            filter: {
            by: 'Filter by...',
            all: 'all',
            and: 'AND',
            or: 'OR'
            },
            pagination: {
            itemsPerPage: 'Itens per page',
            totalItems: 'Total itens'
            }
        }
    };
};
