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
