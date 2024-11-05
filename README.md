# Case Exabel

## Setup

```sh
git clone git@github.com:Bjodol/case-exabel.git
```

```sh
cd case-exabel
```

```sh
nvm use # Install nvm if needed https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating
```

```sh
npm i # Install dependencies
```

```sh
touch .env.local # Create a enviroment file.
```

```.env
#.env.local
VITE_EODHD_API_TOKEN={{YOUR_API_TOKEN}}
```

```sh
npm run dev # Application should now start
```
