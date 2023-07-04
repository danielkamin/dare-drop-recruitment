# Dare Drop recruitment process application

This is an application created for the purpose of recruitment process...

### Notes:

For this assignemt I decided to use Next.js with usage of create-t3-app starter because of following reasons things such as tailwindcss, trpc, prisma, eslint, environment variables typing are very well configured and I have a very good opinion of them.

I decided to use Trpc with Next.js instead of creating 2 seperate applications because when writing TypeScript code on back-end and front-end of an apllication gives me very good DX and speeds up process of development because still this is and MVP application.

Websocket only has development server setup so I encourage to use command
`pnpm run dev` for starting an application and `pnpm run dev:wss` for starting WebSocket server
for testing that application.
One thing that could be optimized is refething data on WebSocket events because I implemented for the list of streamers to be refetched but ideally it should only refetch data of one single record or update state of that data on the client side (browser).

.env file shouldn't be added into source control but for the sake of simplicity and ease of application testing it was added

System info:

```
Node: 16.14.2 - ~/.nvm/versions/node/v16.14.2/bin/node
pnpm: 7.1.7 - ~/.nvm/versions/node/v16.14.2/bin/pnpm
```
### Project setup:

```
pnpm install
pnpm prisma db push
```
### Start the application
To start the application you need two terminal instances to run next dev server and websocket dev server.
In one terminal you need to run:
```
pnpm run dev:wss
``` 
and in the other:
```
pnpm run dev
```
