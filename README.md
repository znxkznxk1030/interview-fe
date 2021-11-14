# HTML 관련 면접질문

## 브라우저 렌더링

### 브라우저 <-> 서버

1. 브라우저 검색 인터페이스에 url입력 ( <https://www.naver.com> )

2. DNS ( Domain Name Server )에서 host 서버의 ip 연결

3. https의 경우 서버와 클라이언트간 ssl 인증 을 위한 ssl handshake 진행

4. host 서버 디렉토리에서 index.html 파일 과 리소스 등을 전송

### 렌더링 - html, css

1. 위 과정에서 받은 html파일을 파싱 하여 DOM ( Document Obeject Model ) 트리 구성

2. link 태그에서 css 파일을 수신시 css 파일을 파싱하여 CSSOM ( Casacading Style Sheet ) 트리 구성 | html 파싱 중지

3. DOM 트리와 CSSOM 트리를 합쳐서 Renter Tree 형성

![webkit render](https://taligarsiel.com/Projects/webkitflow.png)

### 렌더링 - javascipt

- default: DOM 트리 파싱 중지. 해당 javascript 로드 및 실행

- defer: DOM 파싱 중지하지 않고 다운로드하고 마지막 (DOMContentLoaded 이벤트 이전에) 실행

- async: DOM 파싱 중지하지 않고 다운로드하고 DOM 파싱 중지하고 실행.

![javascipt 옵션](https://kimlog.me/static/7b56046cd820d53017f5fa7124ba2255/44a54/script_load.png)

### 렌더링 최적화

- 렌더가 완성된 화면에서 이벤트로 화면이 변경되는 경우를 2가지로 분류 할 수 있다.
- 같은 결과를 취한다면 Reflow보다 Repaint를 사용하는 것이 더 빠르다.
- Repaint일 경우에도 그라데이션과 같은 작업은 오버해드가 있을수 있으므로 많은 계산이 들어간다면 이미지로 대체하는 것도 방법이다.

#### Reflow

- Render Tree 에서 Layout을 만드는 것

![Reflow](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-full.jpg)

- 뷰포트 변화
- 폰트의 변화
- 스타일 추가 또는 제거
- 내용 변화
- :hover와 같은 CSS Pseudo Class
- 클래스 Attribute의 동적 변화
- JS를 통한 DOM 동적 변화
- 엘리먼트에 대한 offsetWidth / offsetHeight (화면에서 보여지는 좌표) 계산시
- 스타일 Attribute 동적변화

#### Repaint

- Painting 과정만 다시 하는것

![Repaint](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-no-layout.jpg)

- opacity, background-color, visibility, outline

## CORS ( Cross Origin Resource Sharing )

- 다른 출처에서 자원을 공유 하는 행위
- 별도의 해결방법을 갖지 않는이상 브라우저는 에러를 출력한다.

### SOP ( Same Origin Policy ) | 브라우저는 기본적으로 동일 출처 정책을 쓴다

- 한 origin 에서 로드된 문서 또는 스크립트가 다른 Origin의 리소스와 상호작용 할수 있는 방법을 제한하는 중요한 보안 메커니즘

### Origin 정의

다음 세가지 요소로 정의된다.

- protocol
- host
- post

#### 예시 1

- <http://www.naver.com>
- <https://www.naver.com>

> 다른 출처이다 ( protocol )

#### 예시 2

- <http://www.github.com:8080>
- <http://www.github.com:8081>

> 다른 출처이다 ( port )

#### 예시 3

- <http://www.github.com/prev?q=1>
- <http://www.github.com/next?q=123#>

> 같은 출처이다

### CORS 하는 방법

#### 서버에서 처리

- 가장 최선의 방법으로 서버에서 헤더에 허가해주는 출처를 명시해주는 것이다
- 이 헤더를 본 브라우더는 더 이상 CORS 에러를 출력하지 않는다.

#### Access-Control-Allow-Origin

- 헤더에 작성된 출처만 브라우저가 리소스를 접근할 수 있도록 허용

```text
Access-Control-Allow-Origin: * // 모든 출처 허용
Access-Control-Allow-Origin: http://arthur.tistory.com:8080
```

#### Access-Control-Allow-Methods

- 그 외에 허용된 출처외에도 허용된 Method로만 요청할수 있도록 설정할 수 있다.

```text
Access-Control-Allow-Methods: GET, PUT
```

#### Access-Control-Allow-Headers

- 허용된 헤더값만 받을 수 있도록 설정

#### Access-Control-Expose-Headers

- 해당 헤더는 꼭 넣도록 설정

### 특혜

- 기본적인 CORS는 주요 요청전에 서버에서 Access-Control을 확인 하기 위해 Preflight request를 먼저 요청한다.
- 하지만 simple request의 조건에 합당한 요청에 대해서는 한번의 요청으로 가져올 수 있다.

#### Simple request

- Method: GET, HEAD, POST 중 1
- Headers: Accept, Accept-Language, Content-Language, Content-Type, DPR, Downlink, Save-Data, Viewport-Width, Width 중에서만 사용
- Content-Type: application/x-www-form-urlencoded, multipart/form-data, text/plain 중 1

> 하지만 대부분의 Content-Type은 application/json 사용하기에 까다로운 조건이다.

### 우회

- 보안상 권장되는 사항은 아니나, 가능한 방법
- 개발 용도 이외의 사용은 안하는 것이 좋다.

#### proxy

- webpack을 사용하는 경우, webpack-dev-server 에 proxy로 요청 대상의 url을 지정하면 우회 가능하다.

```javascript
devServer: {
    proxy: {
      '/api': {
        target: 'https://api.evan.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    }
  }
```

#### JSONP (JSON with Padding)

- 크롬 업데이트로 해당 방법은 금지되어 있다.

```html
<html>
  <script>
    function jsonpFn (data) {
      console.log(data) // beomy
    }
  </script>
  <script
    type="application/javascript"
    src="http://localhost:3001/cors?callback=jsonpFn"
  >
  </script>
</html>
```

```javascript
// node.js
router.get('/cors', (req, res, next) => {
  res.send(`${req.query.callback}('beomy')`)
})
```

## SSL handshake 동작 원리

### 목표

1. 서버와 클라이언트간 주고 받을 데이터의 암호화 알고리즘 결정

2. 서버와 클라이언트 양측 다 암호화를 위한 동일한 대칭키 ( 비밀키 )를 공유

> 대칭키란 암호/복호시 같은 키를 사용하는 것을 말한다.

### 1. 암호화 알고리즘 결정 - 1 : client -> server

- 클라이언트가 사용 가능한 암호 목록 ( cipher suite )
- ssl protocol version

### 2. 암호화 알고리즘 결정 - 2 : server -> client

- 클라이언트가 사용 가능한 암호 목록 중 하나 선택
- ssl protocol version 확인

### 3. 동일한 대칭키 ( 비밀키 ) 공유 - 1 : server -> client

- ssl 인증서 | 서버의 공개키 포함 ( Server Key Exchange )

### 4. 동일한 대칭키 ( 비밀키 ) 공유 - 2 : client

- ssl 인증서 검증
- 인증서를 발급한 CA에서 공개키를 구함 ( 브라우저나 모바일 기기엔 주요 CA리스트와 공개키를 가지고 있다. )
- 공개키로 ssl 인증서 복호화
- 복호화 성공시 검증 성공 ( 서버의 공개키 획득 | Server Key Exchange)

### 5. 동일한 대칭키 ( 비밀키 ) 공유 - 3 : client -> server

- 대칭키 ( 비밀키 ) 생성
- 대칭키 ( 비밀키 )를 서버의 공개키로 암호화 ( Client Key Exchange )

### 6. 동일한 대칭키 ( 비밀키 ) 공유 - 4 : server

- client로 부터 받은 대칭키를 서버의 비밀키로 복호화 ( Client Key Exchange )

### Finish : server -> client

- 이제 양측은 클라이언트에서 생성한 대칭키 ( 비밀키 ) 공유 완료
- 통신할 준비가 완료되었다는 Change Ciper Spec 를 client에게 보낸다.

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
