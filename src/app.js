require('./directive');

const app = angular.module('app',[
    'sImageUpload'
]);


app.controller('controller.app',function($scope){
    $scope.images=[]

    $scope.uploadImage = function(image){
        console.log(image);
    }
})


