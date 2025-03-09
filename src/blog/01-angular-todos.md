---
title: "Learning Angular - First Project"
author: "Sidney Silva"
description: "Una breve explicación de mi primer proyecto de Angular."
pubDate: "03/09/2025"
tags: ["Angular", "Web"]
url: "posts/01-angular-todos"
---

# ¿Angular, qué es eso?

Ahora que me veo en la necesidad de buscar un trabajo relacionado con el desarrollo Web, he empezado a aprender Angular.

Mi primer _aproach_ que he tenido con Angular fué en 1º de Grado Superior. Uno de los profesores nos quería introducir en el mundo de los frameworks Web y dimos unas 2 - 3 clases. En ese momento, me parecía una cosa muy avanzada y que, comparado a lo que estabamos haciendo en ese momento (no habíamos hecho aún ningún tipo de página), era algo que no ibamos a tocar en un tiempo.

Pero bueno, el tiempo pasó, y durante los 3 años siguientes he ido creando diferentes páginas con Vue, Astro, Laravel, etc. Pero ninguna con Angular.

# Aprendiendo Angular

Mi primera vez con Angular después de esa clase que tuve hace tiempo no fué muy buena.

Empezé a ver un curso de un video que pasaron por un grupo de Whatsapp y no me gustó mucho. No me refiero al video, el video estaba bastante bien, lo que no me gustó en ese entonces fué Angular en si. La sintáxis era bastante extraña y la manera de crear componentes, estructuras las carpetas, el cómo se hacían las cosas no me gustaba nada.

Y molestado por Angular, decidí no seguir... Hasta que me encontré otro curso.

# Nuevo curso

Unos cuantos meses después me topé nuevamente con un curso de YouTube de un canal llamado: Gentleman Programming. Nunca antes había visitado dicho canal pero decidí darle una oportunidad.

El curso es bastante largo, la duración es de aproximadamente 12h, pero no me importó y empezé a verlo en x2 de velocidad.

La verdad es que es uno de los mejores cursos que he visto en Internet. No he visto muchos pero la manera en la que explica las cosas y cómo muestra ejemplos, es muy buena. La gran mayoría del curso se me hizo muy pesado, ya que explicaba cosas muy específicas que sabía que existían pero que nunca había llegado a profundizar.

Lo que vi en el curso fué:

- ¿Qué es Angular y porqué se usa?
- Algunas novedades de las últimas versiones.
- Patrones de diseño y buenas prácticas.
- Formularios
- Testing (me falta por verlo)

He aprendido muchos cosas, no solo de Angular sino que también más sobre la programación orientada a objetos y como he dicho antea, patrones de diseño y buenas prácticas.

Aunque no me empezé realmente a familiarizar con los contenidos del curso hasta que hice un proyecto para manejar tareas ([link](https://vercel.com/sidney-silvas-projects/angular-todos/5UV8o8G8CHszo4sSAVL5ogdi2KPM)). Todo me hizo "click" en el momento que iba aplicando mis conocimientos.

Por eso ahora, voy a explicar un poco el cómo funciona el proyecto.

# Proyecto Angular Todos

La idea del proyecto es simple, gestionar tareas y tenerlas todas en un mismo sitio. El usuarios puede crear nuevas tareas, marcarlas como completadas o no y también las puede eliminar.

## Gestión de las tareas con Servicios

Lo primero que tenía que hacer es tener un lugar donde guardar todas las tareas para toda la aplicación. Aquí es donde uso los **Servicios**. Los servicios permiten separar la lógica de los componentes para tenerlo todo en un mismo lugar y proporcionar la información necesaria a los componentes que lo necesitan. Cuando lo hacemos, decimos que inyectamos el servicio a un componente.

En mi caso, he creado un componente para las tareas (_todos_ en este caso porqué lo quería hacer en Inglés) llamado `todos.service.ts`. El contenido final del servicio es el siguiente:

```ts
import { Injectable, signal } from "@angular/core";
import type { Todo } from "../models";

@Injectable({
  providedIn: "root",
})
export class TodosService {
  constructor() {}

  state = signal({
    todos: new Array<Todo>(),
  });

  ai_todoId: number = 0;

  getTodos(): Todo[] {
    return Array.from(this.state().todos.values());
  }

  newTodo(todo: Todo): void {
    const oldTodos: Todo[] = this.state().todos;
    oldTodos.push(todo);
    this.state.set({ todos: [...oldTodos] });
    this.ai_todoId = this.ai_todoId + 1;
  }

  updateTodoStatus(id: number): void {
    const oldTodos: Todo[] = this.state().todos;

    oldTodos.forEach((todo) => {
      if (id == todo.id) {
        todo.isDone = !todo.isDone;
      }
    });

    this.state.set({ todos: [...oldTodos] });
  }

  removeTodo(id: number) {
    const oldTodos: Todo[] = this.state().todos;
    const todosUpdated = oldTodos.filter((todo) => todo.id != id);
    this.state.set({ todos: [...todosUpdated] });
  }
}
```

## Servicio inyectable

```ts
@Injectable({
  providedIn: 'root',
})
```

Como he dicho antes, los servicios son inyectables. Si un componente necesita la información guardada en un servicio, inyectamos el servicio al componente.

Para eso, arriba de la clase tenemos que declarar un decorador `@Injectable()`. Dentro, tenemos que declarar desde donde estará disponible. En mi caso, quiero que esté disponible para toda la aplicación por lo que en `providedIn`, le asignamos el valor `root`. Existen también otros valores, pero en mi caso usaré este.

## Guardando y gestionando las tareas con Signals

Ahora, para que la gestión de las tareas sea algo muy sencillo y cómodo, he usado las Signals. Cuando se modifica el valor de una Signa, este notifica a otras instancias que esta ha cambiado, por lo que el valor siempre estará actualizado en todas partes de la aplicación.

He usado una `Array` que dentro almacenará `Todos` (he declarado una `interface` para hacer el tipado):

```ts
state = signal({
  todos: new Array<Todo>(),
});
```

Después, he declarado las funciones para gestionar los _todos_: obtener todos ellos, insertar uno nuevo, actualizar su estado y eliminar un _todo_.

## Obtener los _`todos`_.

```ts
getTodos(): Todo[] {
  return Array.from(this.state().todos.values());
}
```

Una función muy simple, retornamos cada uno de los valores de la signal de _todos_ y lo convertimos en una array.

## Crear un nuevo _todo_.

```ts
newTodo(todo: Todo): void {
  const oldTodos: Todo[] = this.state().todos;
  oldTodos.push(todo);
  this.state.set({ todos: [...oldTodos] });
  this.ai_todoId = this.ai_todoId + 1;
}
```

En esta función aceptamos un objecto de tipo `Todo`.

Lo primero que hacemos es crear una array con los `todos` almacenados antes de insertar el nuevo. Después, añadimos el nuevo todo a ese mismo `array` y finalmente, actualizamos el estado de la signal usando la función `set()`. Para que se notifique el cambio, tenemos que crear una nueva instancia, por lo que usamos el spread operator `...[oldTodos]`.

Como la `key` de los _todos_ es un `id`, estoy usando un id con _auto increment_ para que sea simple. Por eso sumo un +1 a `this.ai_todoId`.

## Actualizar el estado de un _`todo`_.

```ts
updateTodoStatus(id: number): void {
  const oldTodos: Todo[] = this.state().todos;

  oldTodos.forEach((todo) => {
    if (id == todo.id) {
      todo.isDone = !todo.isDone;
    }
  });

  this.state.set({ todos: [...oldTodos] });
}
```

En esta función, tomamos como parámetro un `id`.

Igual que en la función para insertar, creamos un array con los _todos_ antes de actualizar el que queremos. Después recorremos el array y cambiamos el estado del `todo` que coincide con el `id` proporcionado y nuevamente, actualizamos el estado de la Signal con la función `set()`.

## Eliminar un _`todo`_

```ts
removeTodo(id: number) {
  const oldTodos: Todo[] = this.state().todos;
  const todosUpdated = oldTodos.filter((todo) => todo.id != id)
  this.state.set({todos: [...todosUpdated]})
}
```

Nuevamente creamos un array para almacenar los `todos` antes de eliminar y de esa misma `array`, usamos la función `filter` para excluir el `todo` con el mismo `id` que se pasa por parámetro a la función.

Actualizamos el estado de la signal con la función `set()`.

Ahora que ya tenemos listo nuestro servicio, empezamos a inyectarlo en nuestros componentes.

# Uso de un servicio en un componente

No voy a enseñar todo lo de la aplicación ya que el post se haría demasiado largo, pero mostraré a continuación como inyecto un servicio a un componente y muestro la lista de `todos`:

Componente: `show-todos-component.ts`:

```ts
import { Component, computed, inject, type Signal } from "@angular/core";
import { TodosService } from "../../services/todos.service";
import type { Todo } from "../../models";
import { TodoComponent } from "../todo/todo.component";

@Component({
  selector: "app-show-todos",
  imports: [TodoComponent],
  templateUrl: "./show-todos.component.html",
  styleUrl: "./show-todos.component.css",
})
export class ShowTodosComponent {
  todosService = inject(TodosService);

  todos: Signal<Todo[] | undefined> = computed(() => {
    return this.todosService.getTodos();
  });
}
```

Para inyectar el servicio que hemos creado al componente, simplemente importamos el servicio, creamos un objeto `todosService` y usamos `inject()` para hacerlo:

```ts
todosService = inject(TodosService);
```

Ahora, podremos acceder a nuestras signals. En mi caso, para mostrar los todos, he usado una `computed signal`, que es una signal que proviene de otra, por lo que cuando la signal que está dentro del servicio de `todos` se actualizá, la que he creado en este componente también lo hace:

```ts
todos: Signal<Todo[] | undefined> = computed(() => {
  return this.todosService.getTodos();
});
```

Finalmente, para mostrarlo en el componente (`show-todos.component.html`):

```html
@let listOfTodos = todos();

<div class="flex flex-col gap-2">
  @for (todo of listOfTodos; track todo.id) {
  <app-todo [todo]="todo"></app-todo>
  } @empty {
  <div class="text-neutral-400 text-sm flex flex-col gap-1 text-center py-2 cursor-default select-none">
    <p>Parece que aún no hay tareas disponibles...</p>
    <p class="text-xs text-neutral-500">Crea una tarea con el botón de <span class="underline underline-offset-4 text-neutral-300">Insertar un todo</span>.</p>
  </div>
  }
</div>
```

Declaro una variable con la directiva `@let` que almacena los `todos`:

```html
@let listOfTodos = todos();
```

Y recorro el array mostrando otro componente para mostrar cada uno de los `todos` (`<app-todo />`) usando el `id` como `key` (dentro del `@for`, `track todo.id`)

```html
<div class="flex flex-col gap-2">
  @for (todo of listOfTodos; track todo.id) {
  <app-todo [todo]="todo"></app-todo>
  } @empty {
  <div class="text-neutral-400 text-sm flex flex-col gap-1 text-center py-2 cursor-default select-none">
    <p>Parece que aún no hay tareas disponibles...</p>
    <p class="text-xs text-neutral-500">Crea una tarea con el botón de <span class="underline underline-offset-4 text-neutral-300">Insertar un todo</span>.</p>
  </div>
  }
</div>
```

---

# Despedida

Y ya está, este es el funcionamiento básico de mi aplicación. Es algo muy sencillo pero estoy muy contento por haberle dado una oportunidad a Angular y entender el porqué de las cosas de este framework.

Más proyectos pronto.

Saludos. o/


