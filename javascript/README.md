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

## 호이스팅

- 선언된 변수의 선언부를 함수 스코프 최상단으로 위치
- 실제 코드가 변경되는 건 아니며 메모리에는 변화는 없다.

### 함수선언문과 함수표현식

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

### 호이스팅 우선순위

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

## ES6 변수 정의

### var

- 함수 스코프 | 호이스팅이 O
- 중복정의 가능
- 재할당 가능

### let

- 블록 스코프
- 중복정의 불가능
- 재할당 가능

### const

- 블록 스코프
- 중복정의 불가능
- 재할당 불가능

### TDZ ( Temporal Dead Zone)

- let과 const도 호이스팅이 일어나긴 하지만 초기화가 이뤄지기전에 변수를 사용하려고 하면 참조에러가 발생

```javascript
let a = 1;

if (true) {
  console.log(a) // error
  let a = 2;
}
```

## 클로져

- 렉시컬 스코프를 기억하여 접근이 가능한 상태

```javascript
function outer() {
  const name = "arthur"

  return function inner() {
    console.log(name)
  }
}

outer()();
```

## 실행 컨텍스트

- Lexical Environment
  - Environment Record
  - Reference to the outer environment
  - This binding

- Variable Environment

![EC order](https://poiemaweb.com/img/ec_1.png)
> 출처: poiemaweb

## 이벤트

### Call Stack에

- 함수 실행이 요청되면 Call Stack에 쌓이게 된다.

### Event Queue

- 비동기 처리 함수의 콜백함수, 비동기식 이벤트 핸들러
- Call Stack이 비었을때 순차적으로 Call Stack으로 이동되서 실행

### Event Loop

- Call Stack 내에서 현재 실행중인 task가 있는지 확인
- Event Queue에 task가 있는지 확인
- Call Stack이 비어져 있다면 Event Queue내의 task를 Call Stack으로 이동시킨다

```javascript
function func1() {
  console.log('func1');
  func2();
}

function func2() {
  setTimeout(function () {
    console.log('func2');
  }, 0);

  func3();
}

function func3() {
  console.log('func3');
}

func1();

// func3 > func1 > func2
```

![event loop](https://poiemaweb.com/img/event-loop.gif)

Reference Site

- <https://m.blog.naver.com/z1004man/222051088407>
- <https://uwostudy.tistory.com/55>
- <https://poiemaweb.com/js-execution-context>
