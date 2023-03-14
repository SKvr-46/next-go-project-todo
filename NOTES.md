## Initialize Go app
go mod init github/com/tomdoestech/go-react-todo

## Install Fiber v2
go get -u github.com/gofiber/fiber/v2

## Create client app with vite
yarn create vite client -- --templete react-ts
or
npx create-vite client --template react-ts


## Install dependencies
cd client
and 
yarn add @mantine/hooks @mantine/core swr @primer/octicons-react
or
npm install @mantine/hooks @mantine/core swr @primer/octicons-react
