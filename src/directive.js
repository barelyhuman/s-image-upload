import template from '../templates/template.image-upload.html';

angular.module('sImageUpload', []).directive('imageUpload', function () {
    return {
        retrict: 'E',
        template,
        scope: {
            images: "=",
            onUpload: "&"
        },
        link: function (scope, elem, attr) {
            scope.uploadedImages = 0;
            scope.elementId = _.uniqueId("input-");
            scope.allImages = _.clone(scope.images);
            scope.uploading = false;
            const container = elem[0].querySelector('.simage-upload-container');
            const uploader = container.querySelector('.uploader');
            const input = uploader.querySelector('input');


            scope.showUploadButton=function(){
                if(scope.images.length===scope.allImages.length){
                    return false;
                }
                return true;
            }




            input.onchange = function (e) {

                const files = e.target.files;
                var temp = _.clone(scope.allImages);
                scope.allImages = _.map(files, function (file) {
                    file.url = URL.createObjectURL(file);
                    return file
                })

                scope.allImages = _.clone(_.concat(scope.allImages, temp));

                scope.$apply();
            }

            scope.uploadClick = function () {
                scope.uploading = true;
                scope.images = [];
                let i=scope.allImages.length;
                _.forEach(scope.allImages, function (image) {
                    scope.onUpload({ image: image })
                    .success(function(res){
                        i-=1;
                        if(typeof res === 'string'){
                            var url = res;
                            res = {};
                            res.url = url;
                        }
                        scope.images.push(res);
                        scope.allImages = _.map(scope.allImages,function(uploadedImage){
                            if(uploadedImage.name==image.name){
                                uploadedImage=res;
                            } 
                            return uploadedImage;
                        });
                        if(i<=0){
                            scope.uploading=false;
                        }
                    })
                    .error(function(err){
                        console.log(err);
                    })
                
                });

            }

        }
    }
})