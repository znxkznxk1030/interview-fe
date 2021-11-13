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

## SSL Handshake 동작 원리

