import { NHttp } from "https://deno.land/x/nhttp@1.1.9/mod.ts";

const app = new NHttp();

app.post("/save", ({ body }) => {
  return body;
});

const books = new Map<string, any>();
books.set("1", {
  id: "1",
  title: "O espadachin de Carvão",
  author: "Afonso Solano",
});

  app.get("/", () => {
    return "Seja bem vindo(a), essa requisição veio de um servidor \nPara ver mais requsições tente acessar /book!";
  })
  app.get("/book", () => {
    return Array.from(books.values());
  })
  app.get("/book/:id", (context) => {
    if (books.has(context.params?.id)) {
      return books.get(context.params.id);
    }
  })
  app.post('/book', (context) => {
    books.set(context.body.id, context.body)
    return context.response.status(201)
  });
  app.delete('/book/:id', (context) => {
    if (books.has(context.params?.id)) {
      books.delete(context.params.id);
      return context.response.status(202)
    }
  })
  app.put('/book/:id', (context) => {
    if (books.has(context.params?.id)) {
      books.set(context.params.id, context.body)
      return context.response.status(202)
    }
  })

app.listen(8000);