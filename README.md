<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Manual Testing

### POST

```
{
  "name": "Doe",
  "firstname": "John",
  "age": 30,
  "Cin": "ABC123456",
  "Job": "Software Developer",
  "path": "/path/to/cv.pdf",
  "userId": 1, 
  "skills": [1, 2, 3]
}
```

### PUT
```
{
  "name": "Doe",
  "firstname": "John",
  "age": 30,
  "Cin": "ABC123456",
  "Job": "Software Developer",
  "path": "/path/to/cv.pdf",
  "user": 5,
  "skills": [1]
}
```

### DELETE
```
http://127.0.0.1:3000/cv/10
```


