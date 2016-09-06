/**
 * Created by Zed on 2016/9/6.
 */

'use strict'

angular.module('ngMagicalInput',[])


.directive('ngMagicalInput',function () {

    function compile() {
        return {
            post: function(scope, element){

                scope.input = element.find('input');

                scope.magic = {
                    ngModel : scope.ngModel
                }

                scope.$watch(function () {
                    return scope.magic.ngModel
                },function (newVal) {
                    scope.ngModel = newVal;
                })

                scope.readyOnly = true;

                scope.toggle = function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    scope.readyOnly = !scope.readyOnly;
                }
            }
        };
    }

    return {
        restrict:'AE',
        replace: true,
        templateUrl:'views/ng-input.html',
        scope:{
             type:        '@'
            , name:        '@'
            , iconOk:        '@'
            , iconEdit:        '@'
            , color:       '@'
            , class:       '@'
            , parentFrom: '@'
            , ngClass:     '='
            , ngPattern:   '@'
            , ngChange:    '&ngChange'
            , ngRequired:  '='
            , ngMinlength: '='
            , ngMaxlength: '='
            , ngTrim:      '='
            , ngModel:     '='
        },
        compile:compile
       
    }
})
