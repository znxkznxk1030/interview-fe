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
