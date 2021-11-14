# Javascript 관련 면접질문

## 원시타입 6가지

> string, number ,boolean ,symbol ,null ,undefined

### 원시타입은 immutable

```javascript
var str = "123"
var sliceStr = str.slice(0,2)

console.log(str)  //123
console.log(sliceStr) //12
```

## 참조타입

- 원시타입이 아닌 Object 기반의 모든 타입

> Object, Function, Array

## 불변 객체

- 원복객체를 손상시키지 않고, 복사한 객체를 넘겨주는 방법

```javascript
var obj = { name: 'arthur' }
var cpyObj = Object.assign({}, obj)
cpyObj.name = 'youngsoo'

console.log(obj.name)     // arthur
console.log(cpyObj.name)  // youngsoo
```

### Shallow Copy

- 단, 안에 참조형이 있는경우 값는 변한다.

``` javascript
var obj = { list: [1,2,3] }
var cpyObj = Object.assign({}, obj)

cpyObj.list.push(4)

console.log(obj.list)     // 1,2,3,4
console.log(cpyObj.list)  // 1,2,3,4

```

### Deep Copy

#### Json Method | Easy one

```javascript
var obj = { list: [1,2,3] }
var cpyObj = JSON.parse(JSON.stringify(obj))

cpyObj.list.push(4)

console.log(obj.list)     // 1,2,3
console.log(cpyObj.list)  // 1,2,3,4
```

- 1 Depth 까지는 잘 복사되지만, 그 이상의 Depth에서는 유실
- 함수(functions), Date 객체, 정규표현식, Infinity 등등의 데이터는 복사되지 않고 유실

#### 재귀함수 | Not Bad

```javascript
function cloneObject(obj) {
  var clone = {};
  for (var key in obj) {
    if (typeof obj[key] == "object" && obj[key] != null) {
      clone[key] = cloneObject(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  }

  return clone;
}


var obj = { list: [1,2,3] }
var cpyObj = cloneObject(obj)

cpyObj.list.push(4)

console.log(obj.list)     // 1,2,3
console.log(cpyObj.list)  // 1,2,3,4

```

#### Lodash | Best Practice

```javascript
var obj = { list: [1,2,3] }
var cpyObj = _.cloneDeep(obj)

cpyObj.list.push(4)

console.log(obj.list)     // 1,2,3
console.log(cpyObj.list)  // 1,2,3,4
```

### 호이스팅

- 선언된 변수의 선언부를 함수 스코프 최상단으로 위치
- 실제 코드가 변경되는 건 아니며 메모리에는 변화는 없다.

#### 함수선언문과 함수표현식

```javascript
foo();
foo1();

function foo() { // 함수선언문
  console.log("hello");
}

var foo1 = function() { // 함수표현식
  console.log("hi");
}
```

> Parser 는 아래와 같이 받아들인다

```javascript
var foo1;

function foo() { // 함수선언문
        console.log("hello");
}

foo();
foo1();

foo1 = function() {
  console.log("hi");
}
```

> 결과

```bash
hello
VM60:2 Uncaught TypeError: foo1 is not a function
    at <anonymous>:2:1
(anonymous) @ VM60:2
```

#### 호이스팅 우선순위

1. 변수 선언
2. 함수선언문
3. 변수값 할당

```javascript
var foo1 = "1"

function foo1() {}
function foo2() {}

var foo2 = "2"

console.log(typeof foo1)
console.log(typeof foo2)
```

> 호이스팅 결과

```javascript
var foo1;
var foo2;

function foo1() {}
function foo2() {}

foo1 = "1"
foo2 = "2"

```

> 변수값과 함수선언이 동시에 되었을때 변수값 할당이 된다.

### ES6 변수 정의

#### var

- 함수 스코프 내에서 호이스팅이 된다.
