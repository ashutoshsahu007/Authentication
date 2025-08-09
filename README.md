1.we can send a fake "Yes" to the server to request protected data

2.Server-side sessions store user data (like ID, role, preferences) on the server after login.

The browser only keeps a session ID in a cookie, which is sent with each request.

The server uses this ID to retrieve session data, keeping sensitive information off the client.

3.Server-side sessions require the server to store and manage session data, which can strain memory and complicate scaling in distributed systems.

Multiple servers need a shared session store, adding complexity.

They also break the stateless nature of APIs, making them less suitable for modern microservices or cross-domain applications.

4.Authentication tokens are digital credentials (like JWTs) issued after successful login, containing encoded user information.

They are sent with each request, usually in the Authorization header, so the server can verify identity without storing session data.

Tokens enable stateless authentication, ideal for APIs, mobile apps, and cross-domain systems.

5.Authentication tokens (like JWTs) are often better than server-side sessions because they make the server stateless — no need to store session data or sync across servers, which improves scalability.

They work easily across domains and devices (web, mobile, APIs), and are ideal for distributed or microservice architectures.
