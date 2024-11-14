<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Manual Testing

### 1. **Créer un Todo (POST /todos)**

#### URL :
```
POST http://127.0.0.1:3000/todos
```

#### Corps de la requête (JSON) :

```json
{
  "name": "Learn NestJS",
  "description": "Study the NestJS framework and learn how to build scalable APIs",
  "status": "PENDING"
}
```

#### Réponse attendue (Exemple) :
```json
{
  "id": 1,
  "name": "Learn NestJS",
  "description": "Study the NestJS framework and learn how to build scalable APIs",
  "createdAt": "2024-11-14T00:00:00.000Z",
  "updatedAt": "2024-11-14T00:00:00.000Z",
  "deletedAt": null,
  "status": "PENDING"
}
```

---

### 2. **Récupérer tous les Todos (GET /todos)**

#### URL :
```
GET http://127.0.0.1:3000/todos
```

#### Paramètres de requête (optionnels) :
- **page** : numéro de la page (par défaut `1`)
- **limit** : nombre de résultats par page (par défaut `10`)

Exemple de requête :
```
GET http://127.0.0.1:3000/todos?page=1&limit=10
```

#### Réponse attendue (Exemple) :
```json
{
  "data": [
    {
      "id": 1,
      "name": "Learn NestJS",
      "description": "Study the NestJS framework",
      "createdAt": "2024-11-14T00:00:00.000Z",
      "updatedAt": "2024-11-14T00:00:00.000Z",
      "deletedAt": null,
      "status": "PENDING"
    }
    // ... (plus de todos si disponibles)
  ],
  "total": 50
}
```

---

### 3. **Récupérer un Todo par son ID (GET /todos/:id)**

#### URL :
```
GET http://127.0.0.1:3000/todos/1
```

#### Réponse attendue (Exemple) :
```json
{
  "id": 1,
  "name": "Learn NestJS",
  "description": "Study the NestJS framework",
  "createdAt": "2024-11-14T00:00:00.000Z",
  "updatedAt": "2024-11-14T00:00:00.000Z",
  "deletedAt": null,
  "status": "PENDING"
}
```

Si le Todo n'existe pas :
#### Réponse attendue (Exemple) :
```json
{
  "message": "Todo not found"
}
```

---

### 4. **Mettre à jour un Todo (PUT /todos/:id)**

#### URL :
```
PUT http://127.0.0.1:3000/todos/1
```

#### Corps de la requête (JSON) :
```json
{
  "name": "Learn NestJS (Updated)",
  "description": "Study the NestJS framework and its features",
  "status": "COMPLETED"
}
```

#### Réponse attendue (Exemple) :
```json
{
  "id": 1,
  "name": "Learn NestJS (Updated)",
  "description": "Study the NestJS framework and its features",
  "createdAt": "2024-11-14T00:00:00.000Z",
  "updatedAt": "2024-11-14T01:00:00.000Z",
  "deletedAt": null,
  "status": "COMPLETED"
}
```

---

### 5. **Supprimer un Todo de façon soft (DELETE /todos/:id)**

#### URL :
```
DELETE http://127.0.0.1:3000/todos/1
```

#### Réponse attendue (Exemple) :
```json
{
  "message": "Todo marked as deleted"
}
```

---

### 6. **Restaurer un Todo supprimé (PATCH /todos/:id/restore)**

#### URL :
```
PATCH http://127.0.0.1:3000/todos/1/restore
```

#### Réponse attendue (Exemple) :
```json
{
  "id": 1,
  "name": "Learn NestJS",
  "description": "Study the NestJS framework",
  "createdAt": "2024-11-14T00:00:00.000Z",
  "updatedAt": "2024-11-14T01:00:00.000Z",
  "deletedAt": null,
  "status": "PENDING"
}
```

---

### 7. **Récupérer les Todos filtrés par `name`, `description` et `status` (GET /todos/filter)**

#### URL :
```
GET http://127.0.0.1:3000/todos/filter?name=NestJS&status=PENDING
```

#### Paramètres de requête (optionnels) :
- **name** : chaîne à rechercher dans le champ `name`
- **description** : chaîne à rechercher dans le champ `description`
- **status** : statut à filtrer (`PENDING`, `COMPLETED`, etc.)

Exemple de requête :
```
GET http://127.0.0.1:3000/todos/filter?name=NestJS&status=PENDING
```

#### Réponse attendue (Exemple) :
```json
{
  "data": [
    {
      "id": 1,
      "name": "Learn NestJS",
      "description": "Study the NestJS framework",
      "createdAt": "2024-11-14T00:00:00.000Z",
      "updatedAt": "2024-11-14T01:00:00.000Z",
      "deletedAt": null,
      "status": "PENDING"
    }
  ],
  "total": 1
}
```

---

### 8. **Obtenir le nombre de Todos par statut (GET /todos/count-by-status)**

#### URL :
```
GET http://127.0.0.1:3000/todos/count-by-status
```

#### Réponse attendue (Exemple) :
```json
{
  "PENDING": 10,
  "COMPLETED": 5,
  "DELETED": 3
}
```

---

### Résumé des points clés :

- **POST** `/todos` : Créer un nouveau Todo.
- **GET** `/todos` : Récupérer tous les Todos avec pagination.
- **GET** `/todos/:id` : Récupérer un Todo par son ID.
- **PUT** `/todos/:id` : Mettre à jour un Todo existant.
- **DELETE** `/todos/:id` : Supprimer un Todo de façon soft.
- **PATCH** `/todos/:id/restore` : Restaurer un Todo supprimé.
- **GET** `/todos/filter` : Récupérer des Todos filtrés par `name`, `description` et `status`.
- **GET** `/todos/status-count` : Obtenir le nombre de Todos pour chaque statut.

### Remarques :

- **Pagination** : Utilisez les paramètres `page` et `limit` pour contrôler la pagination des résultats dans les requêtes `GET /todos`.
- **Paramètres optionnels** : Certains endpoints acceptent des paramètres optionnels, comme `name`, `description` et `status` pour la recherche et le filtrage des `Todos`.

Vous pouvez maintenant utiliser ces requêtes Postman pour tester toutes les fonctionnalités de votre API Todo dans NestJS."# tp1nest" 
