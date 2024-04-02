## Configuracao

Iniciando o npm

```
npm init -y
```

Instalando o compilador e as definições de tipos para o NodeJS para Typescript

```
npm i typescript @types/node -D
```

Iniciando o arquivo de configuracao do Typescript

```
npx tsc --init
```

Instalando a CLI para executar código TypeScript

```
npm i tsx -D
```

Instalando o prisma

```
npm i prisma -D
```

Configurando o Prisma

```
npx prisma init --datasource-provider SQLite
```

Após a criacão dos modelos no arquivo schema.prisma é feito a migrate

```
npx prisma migrate dev
```

O banco de dados pode ser visualizado por meio do Prisma Studio

```
npx prisma studio
```

a
