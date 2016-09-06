# ngMagicalInput
 
A input component of angular

## Usage
```
$ bower install ngMagicalInput --save
```
or
```
<script src="dist/scripts/ngMagicalInput.min.js"></script>
```
## Demo
```js
angular.module('demoApp',['ngMagicalInput'])
.controller('Demo',function($scope){
            $scope.test = {
                text :'G20峰会'
            }
        })
```
```html
// The directive supported ngForm's all attrs
<ng-magical-input ng-model="test.text" name="text"
                              ng-change="change()"
                              class="controls"
                              type="text"
                              ng-trim="true"
                              ng-maxlength="10"
                              icon-ok="fa fa-plus"
                              icon-edit="fa fa-ok"
                              required>
                              </ng-magical-input>
```

